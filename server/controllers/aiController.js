import mongoose from "mongoose";
import httpStatus from "http-status";
import axios from "axios";
import AIChat from "../models/AIChat.js";
import User from "../models/User.js";

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
    content: message,
    timestamp: new Date(),
  };

  const contextMessages = buildTokenLimitedContext(
    chat.messages,
    newUserMessage,
    MAX_CONTEXT_TOKENS,
  );

  let reply;
  let metadata;
  let followUpQuestions;
  let sessionTitle;

  try {
    const response = await axios.post(
      "http://localhost:8000/chat/",
      {
        thread_id: chat._id.toString(),
        messages: contextMessages,
        mode: mode || "general_chat",
      },
      { timeout: 300000 },
    );

    reply = response.data.reply;
    followUpQuestions = response.data.follow_up_questions;
    metadata = response.data.metadata;
    sessionTitle = response.data.session_title;

    if (!reply) throw new Error("Invalid AI response");

    if (!chat.title && sessionTitle) {
      chat.title = sessionTitle;
    }
  } catch (err) {
    if (err.response) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        success: false,
        message: "AI service is temporarily unavailable. Please try again.",
      });
    }

    return res.status(err.response.status).json({
      success: false,
      message: err.response.data?.detail || "AI error occurred",
      errorType: err.response.data?.error_type || null,
    });

    if (err.code === "ECONNABORTED") {
      return res.status(504).json({
        success: false,
        message: "AI request timed out.",
      });
    }
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
