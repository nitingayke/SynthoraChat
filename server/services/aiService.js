import axios from "axios";

// const AI_SERVER_URL = "http://localhost:8000";
const AI_SERVER_URL = "https://synthora-ai-server.onrender.com";

export const evaluateAnswerAccuracy = async ({
  title,
  description,
  topics,
  answer,
}) => {
  try {
    const response = await axios.post(
      `${AI_SERVER_URL}/evaluation/`,
      {
        title,
        description,
        topics,
        answer,
      },
      { timeout: 120000 },
    );

    return {
      success: true,
      data: response.data,
    };
  } catch {
    return {
      success: false,
      data: {
        accuracy: 0,
        feedback: "AI evaluation unavailable",
        improvements: [],
      },
    };
  }
};

export const generateAIChatReply = async ({ threadId, messages, mode }) => {
  try {
    const response = await axios.post(
      `${AI_SERVER_URL}/chat/user-message`,
      {
        thread_id: threadId,
        messages,
        mode: mode || "general_chat",
      },
      { timeout: 300000 },
    );

    const data = response.data;

    if (!data?.reply) {
      return {
        success: false,
        errorType: "INVALID_AI_RESPONSE",
      };
    }

    return {
      success: true,
      data: {
        reply: data.reply,
        followUpQuestions: data.follow_up_questions || [],
        metadata: data.metadata || {},
        sessionTitle: data.session_title || null,
      },
    };
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      return {
        success: false,
        errorType: "TIMEOUT",
        message: "AI request timed out.",
      };
    }

    if (error.code === "ECONNREFUSED") {
      return {
        success: false,
        errorType: "CONNECTION_REFUSED",
        message: "AI service unavailable.",
      };
    }

    if (error.response) {
      return {
        success: false,
        errorType: error.response.data?.error_type || "AI_SERVER_ERROR",
        message:
          error.response.data?.detail ||
          error.response.data?.message ||
          "AI server error",
      };
    }

    return {
      success: false,
      errorType: "UNKNOWN_ERROR",
      message: "Unexpected AI error occurred",
    };
  }
};
