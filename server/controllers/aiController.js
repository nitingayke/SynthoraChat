import mongoose from "mongoose";
import httpStatus from "http-status";
import axios from "axios";
import AIChat from "../models/AIChat.js";
import User from "../models/User.js";
import { generateAIChatReply } from "../services/aiService.js";

import { buildTokenLimitedContext } from "../utils/aiTokenCounter.js";

const MAX_MESSAGE_LENGTH = 10000;
const MAX_CONTEXT_TOKENS = 200000;
const MAX_SESSION_TOKENS = 100000;
const MAX_MESSAGES_PER_SESSION = 201;

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

  if (!chat.title && sessionTitle) {
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
