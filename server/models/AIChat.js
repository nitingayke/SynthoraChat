import mongoose from "mongoose";

const aiChatSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "SynthoraChat AI",
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
    },

    totalTokensUsed: {
      type: Number,
      default: 0,
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
          modelUsed: { type: String, default: "" },
          totalTokens: { type: Number, default: 0 },
          responseTime: { type: Number, default: 0 },
        },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("AIChat", aiChatSessionSchema);
