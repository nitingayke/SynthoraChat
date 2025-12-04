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
      },
    ],
    topics: [
      {
        type: String,
        ref: "Topic",
      },
    ],
    allowComments: {
      type: Boolean,
      default: true,
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
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
