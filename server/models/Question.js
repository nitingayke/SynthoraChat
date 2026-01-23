import mongoose from "mongoose";

const IMPORTANT_QUESTION_FIELDS = ["title", "content", "media", "topics"];
const MEDIA_LIMIT = 6;
const TOPICS_LIMIT = 10;

const questionSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 300,
    },
    content: {
      type: String,
      maxlength: 7000,
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
    topics: [
      {
        type: String,
        ref: "Topic",
        trim: true,
      },
    ],
    allowComments: {
      type: Boolean,
      default: true,
    },
    contentUpdatedAt: {
      type: Date,
      default: null,
    },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    saves: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
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
      enum: ["active", "closed", "deleted"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

questionSchema.path("media").validate(function (media) {
  return media.length <= MEDIA_LIMIT;
}, `Maximum ${MEDIA_LIMIT} media files allowed per question`);

questionSchema.path("topics").validate(function (topics) {
  return topics.length <= TOPICS_LIMIT;
}, `Maximum ${TOPICS_LIMIT} topics allowed per question`);

questionSchema.pre("save", function (next) {
  if (this.isNew) return next();

  const modified = this.modifiedPaths();

  const isContentEdit = IMPORTANT_QUESTION_FIELDS.some((field) =>
    modified.includes(field),
  );

  if (isContentEdit) {
    this.contentUpdatedAt = new Date();
  }

  next();
});

questionSchema.pre(
  ["findOneAndUpdate", "updateOne", "updateMany"],
  function (next) {
    const update = this.getUpdate() || {};

    const updatedFields = new Set([
      ...Object.keys(update.$set || {}),
      ...Object.keys(update).filter((k) => !k.startsWith("$")),
    ]);

    const isContentEdit = IMPORTANT_QUESTION_FIELDS.some((field) =>
      updatedFields.has(field),
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
  },
);

questionSchema.index({ createdAt: 1 });

export default mongoose.model("Question", questionSchema);
