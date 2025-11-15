const mongoose = require("mongoose");

const aiChatSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "Untitled Chat",
      trim: true,
    },

    sessionType: {
      type: String,
      enum: [
        "general_chat",
        "question_assist",
        "summarization",
        "fact_check",
        "answer_generation",
      ],
      default: "general_chat",
    },

    messages: [
      {
        role: {
          type: String,
          enum: ["user", "assistant", "system"],
          required: true,
        },
        content: {
          type: String,
          required: true,
          trim: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        // AI response metadata
        metadata: {
          modelUsed: { type: String, default: "GPT-5" },
          tokens: { type: Number, default: 0 },
          responseTime: { type: Number, default: 0 },
          confidenceScore: { type: Number, default: 0.9 }, // 0–1 scale
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("AIChat", aiChatSessionSchema);
