const mongoose = require("mongoose");

const aiChatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Session metadata
    sessionType: {
      type: String,
      enum: [
        "question_assist", // AI helps form a question
        "answer_generation", // AI answers a user's question
        "summarization", // AI summarizes answers
        "fact_check", // AI verifies correctness
        "general_chat", // user-AI conversation
      ],
      default: "general_chat",
    },

    // Chat messages (chronological)
    messages: [
      {
        role: {
          type: String,
          enum: ["user", "assistant"],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Optional link to question if context-based
    relatedQuestion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },

    // AI response metadata
    aiResponseMeta: {
      modelUsed: { type: String, default: "GPT-5" },
      tokensUsed: { type: Number, default: 0 },
      responseTime: { type: Number, default: 0 },
      confidenceScore: { type: Number, default: 0.9 }, // 0–1 scale
    },

    feedback: {
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String, maxlength: 500 },
    },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AIChat", aiChatSchema);
