import mongoose from "mongoose";
import httpStatus from "http-status";
import AIChat from "../models/AIChat.js";
import User from "../models/User.js";
import {
  generateAIChatReply,
  generateAnswerSummaryService,
  generateQuestionContent,
} from "../services/aiService.js";

import { buildTokenLimitedContext } from "../utils/aiTokenCounter.js";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";

const MAX_MESSAGE_LENGTH = 10000;
const MAX_CONTEXT_TOKENS = 200000;
const MAX_SESSION_TOKENS = 100000;
const MAX_MESSAGES_PER_SESSION = 201;

const MAX_ANSWERS = 13;
const MAX_CONTENT_LENGTH = 3000;
const SUMMARY_EXPIRY_HOURS = 6;

export const getAllChatSessions = async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId)
    .select("aiChatSessions profile")
    .populate({
      path: "aiChatSessions",
      select: "_id title createdAt updatedAt",
    })
    .lean();

  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(httpStatus.OK).json({
    success: true,
    data: {
      sessions: user.aiChatSessions,
    },
  });
};

export const getSingleChat = async (req, res) => {
  const { threadId } = req.params;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(threadId)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Invalid thread ID",
    });
  }

  const chat = await AIChat.findOne({
    _id: threadId,
    user: userId,
  });

  if (!chat) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Chat not found or unauthorized",
    });
  }

  return res.status(httpStatus.OK).json({
    success: true,
    data: { chat },
  });
};

export const aiChatController = async (req, res) => {
  const { threadId, message, mode } = req.body;
  const userId = req.user.id;

  if (!message || message.trim() === "") {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Message cannot be empty!",
    });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: `Message too long. Max allowed length is ${MAX_MESSAGE_LENGTH} characters.`,
    });
  }

  let chat;

  if (threadId) {
    if (!mongoose.Types.ObjectId.isValid(threadId)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "Invalid thread ID",
      });
    }

    chat = await AIChat.findOne({
      _id: threadId,
      user: userId,
    });

    if (!chat) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Chat not found or unauthorized",
      });
    }
  } else {
    chat = await AIChat.create({
      user: userId,
      title: null,
      sessionType: mode || "general_chat",
      messages: [],
    });

    await User.findByIdAndUpdate(userId, {
      $push: { aiChatSessions: chat._id },
    });
  }

  if (chat.messages.length >= MAX_MESSAGES_PER_SESSION) {
    return res.status(httpStatus.FORBIDDEN).json({
      success: false,
      message: "Session message limit reached. Please start a new chat.",
    });
  }

  const newUserMessage = {
    role: "user",
    content: message.trim(),
    timestamp: new Date(),
  };

  const contextMessages = buildTokenLimitedContext(
    chat.messages,
    newUserMessage,
    MAX_CONTEXT_TOKENS,
  );

  const aiResult = await generateAIChatReply({
    threadId: chat._id.toString(),
    messages: contextMessages,
    mode,
  });

  if (!aiResult.success) {
    let status = 500;

    if (aiResult.errorType === "TIMEOUT") {
      status = 504;
    } else if (aiResult.errorType === "CONNECTION_REFUSED") {
      status = 503;
    }

    return res.status(status).json({
      success: false,
      message: aiResult.message || "AI service failed",
      errorType: aiResult.errorType,
    });
  }

  const { reply, followUpQuestions, metadata, sessionTitle } = aiResult.data;

  if ((!chat.title || chat?.messages == 0) && sessionTitle) {
    chat.title = sessionTitle;
  }

  const assistantMessage = {
    role: "assistant",
    content: reply,
    timestamp: new Date(),
    metadata: {
      modelUsed: metadata?.model_used || "",
      totalTokens: metadata?.total_tokens || 0,
      responseTime: metadata?.response_time || 0,
    },
  };

  chat.messages.push(newUserMessage, assistantMessage);

  chat.totalTokensUsed += metadata?.total_tokens || 0;

  await chat.save();

  return res.status(httpStatus.OK).json({
    success: true,
    data: {
      threadId: chat._id,
      sessionTitle,
      reply,
      followUpQuestions,
      metadata,
      totalTokensUsed: chat.totalTokensUsed,
    },
  });
};

export const generatePostController = async (req, res) => {
  const { inputText } = req.body;

  if (!inputText || inputText.trim().length < 5) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Input too short",
    });
  }

  const aiResponse = await generateQuestionContent({ inputText });

  if (!aiResponse) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "AI failed to generate post content",
    });
  }

  return res.status(httpStatus.OK).json({
    success: true,
    data: aiResponse,
  });
};

export const generateSummaryController = async (req, res) => {
  const { questionId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(questionId)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Invalid question ID",
    });
  }

  const question = await Question.findById(questionId);

  if (!question) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Question not found",
    });
  }

  if (question.aiSummary?.summary && question.aiSummary?.generatedAt) {
    const diffHours =
      (Date.now() - new Date(question.aiSummary.generatedAt)) /
      (1000 * 60 * 60);

    if (diffHours < SUMMARY_EXPIRY_HOURS) {
      return res.status(httpStatus.OK).json({
        success: true,
        data: {
          summary: question.aiSummary.summary,
          cached: true,
        },
      });
    }
  }

  const answers = await Answer.find({ questionId })
    .select("content aiAccuracy upvotes")
    .lean();

  if (!answers.length || answers.length < 2) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "At least 2 answers required to generate summary",
    });
  }

  // Sort answers (BEST FIRST)
  const sortedAnswers = answers.sort((a, b) => {
    const scoreA = (a.aiAccuracy || 0) + (a.upvotes?.length || 0);
    const scoreB = (b.aiAccuracy || 0) + (b.upvotes?.length || 0);
    return scoreB - scoreA;
  });

  const selectedAnswers = sortedAnswers.slice(0, MAX_ANSWERS);

  const payload = {
    title: question.title,
    description: question.content,
    answers: selectedAnswers.map((a) => ({
      content: a.content.slice(0, MAX_CONTENT_LENGTH), // trim large answers
    })),
  };

  const aiResponse = await generateAnswerSummaryService(payload);

  if (!aiResponse?.summary) {
    return res.status(httpStatus.BAD_GATEWAY).json({
      success: false,
      message: "Invalid AI response",
    });
  }

  question.aiSummary = {
    summary: aiResponse.summary,
    generatedAt: new Date(),
    version: (question.aiSummary?.version || 0) + 1,
  };

  await question.save();

  return res.status(httpStatus.OK).json({
    success: true,
    data: {
      summary: aiResponse.summary,
      cached: false,
    },
  });
};
