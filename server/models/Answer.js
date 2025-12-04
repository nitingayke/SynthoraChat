const answerSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 10000,
    },
    media: [
      {
        type: {
          type: String,
          enum: ["image", "video", "audio", "document"],
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          auto: true,
          default: () => new mongoose.Types.ObjectId(),
        },
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: {
          type: String,
          required: true,
          maxlength: 2000,
        },
        sentiment: {
          type: String,
          enum: ["positive", "negative", "neutral"],
          default: "neutral",
        },
        upvotes: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
        isAiGenerated: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    aiAccuracy: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["published", "draft", "deleted"],
      default: "published",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", answerSchema);
