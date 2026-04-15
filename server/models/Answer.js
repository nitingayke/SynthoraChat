import mongoose from "mongoose";

const IMPORTANT_ANSWER_FIELDS = ["content", "media"];

const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 5000,
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
        filename: {
          type: String,
          required: true,
        },
      },
    ],
    contentUpdatedAt: {
      type: Date,
      default: null,
    },

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
      enum: ["published", "draft"],
      default: "published",
    },
  },
  {
    timestamps: true,
  },
);

answerSchema.pre("save", function (next) {
  if (this.isNew) return next();

  const modified = this.modifiedPaths();

  const isContentEdit = IMPORTANT_ANSWER_FIELDS.some(field =>
    modified.includes(field)
  );

  if (isContentEdit) {
    this.contentUpdatedAt = new Date();
  }

  next();
});

answerSchema.pre(
  ["findOneAndUpdate", "updateOne", "updateMany"],
  function (next) {
    const update = this.getUpdate() || {};

    const updatedFields = new Set([
      ...Object.keys(update.$set || {}),
      ...Object.keys(update).filter(k => !k.startsWith("$")),
    ]);

    const isContentEdit = IMPORTANT_ANSWER_FIELDS.some(field =>
      updatedFields.has(field)
    );

    if (isContentEdit) {
      this.setUpdate({
        ...update,
        $set: {
          ...(update.$set || {}),
          contentUpdatedAt: new Date(),
        },
      });
    }

    next();
  }
);


export default mongoose.model("Answer", answerSchema);
