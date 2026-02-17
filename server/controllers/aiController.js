import mongoose from "mongoose";
import httpStatus from "http-status";
import axios from "axios";
import AIChat from "../models/AIChat.js";
import User from "../models/User.js";

import {
  estimateTokens,
  buildTokenLimitedContext,
} from "../utils/aiTokenCounter.js";

const MAX_MESSAGE_LENGTH = 10000;
const MAX_CONTEXT_TOKENS = 60000;
const MAX_SESSION_TOKENS = 500000;

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
      title: message.slice(0, 40),
      sessionType: mode || "general_chat",
      messages: [],
    });

    await User.findByIdAndUpdate(userId, {
      $push: { aiChatSessions: chat._id },
    });
  }

  if (chat.totalTokensUsed > MAX_SESSION_TOKENS) {
    return res.status(httpStatus.FORBIDDEN).json({
      success: false,
      message: "Session token limit reached. Please start a new chat.",
    });
  }

  const newUserMessage = {
    role: "user",
    content: message,
    timestamp: new Date(),
  };

  // const contextMessages = buildTokenLimitedContext(
  //   chat.messages,
  //   newUserMessage,
  //   MAX_CONTEXT_TOKENS,
  // );

  let reply;
  let metadata;
  let followUpQuestions;

  try {
    const response = await axios.post(
      "http://localhost:8000/chat/",
      {
        thread_id: chat._id.toString(),
        messages: [...chat.messages, newUserMessage],
        mode: mode || "general_chat",
      },
      { timeout: 300000 },
    );

    reply = response.data.reply;
    followUpQuestions = response.data.follow_up_questions;
    metadata = response.data.metadata;

    if (!reply) throw new Error("Invalid AI response");
  } catch {
    return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
      success: false,
      message: "AI service is temporarily unavailable. Please try again.",
    });
  }

  const assistantMessage = {
    role: "assistant",
    content: reply,
    timestamp: new Date(),
    metadata: {
      modelUsed: metadata?.model_used || "",
      promptTokens: metadata?.prompt_tokens || 0,
      completionTokens: metadata?.completion_tokens || 0,
      totalTokens: metadata?.total_tokens || 0,
      responseTime: metadata?.response_time || 0,
      confidenceScore: metadata?.confidence_score || 0.9,
    },
  };

  chat.messages.push(newUserMessage, assistantMessage);

  chat.totalTokensUsed += metadata?.total_tokens || 0;

  await chat.save();

  return res.status(httpStatus.OK).json({
    success: true,
    data: {
      threadId: chat._id,
      reply,
      followUpQuestions,
      metadata,
      totalTokensUsed: chat.totalTokensUsed,
    },
  });
};
