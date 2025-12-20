import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Basic Information
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ],
      set: function (value) {
        return value.replaceAll(/\s+/g, " ").trim();
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    // Profile Information
    profile: {
      firstName: {
        type: String,
        trim: true,
        maxlength: 50,
        default: "",
      },
      lastName: {
        type: String,
        trim: true,
        maxlength: 50,
        default: "",
      },
      bio: {
        type: String,
        maxlength: 500,
        default: "",
      },
      location: {
        type: String,
        maxlength: 100,
        default: "",
      },
      website: {
        type: String,
        trim: true,
        default: "",
      },
      profilePicture: {
        type: String,
        default: "",
      },
      coverPicture: {
        type: String,
        default: "",
      },
    },

    // specific Fields
    credentials: {
      type: [String], // e.g., ["Software Engineer", "PhD in Computer Science"]
      default: [],
    },
    topicsOfInterest: [
      // Topics user follows (like "Technology", "Science")
      {
        type: String,
        trim: true,
      },
    ],
    knowsAbout: [
      // Topics user claims expertise in like [javascript, js, problem solving, etc]
      {
        type: String,
        trim: true,
      },
    ],

    followers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        followedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    following: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        followedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    blockedUsers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        blockedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    savedQuestions: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        savedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    notifications: [
      {
        title: { type: String },
        description: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],

    aiChatSessions: [
      {
        sessionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "AIChat",
          required: true,
        },
        title: { type: String, default: "AI Chat" },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    upvotesCount: {
      type: Number,
      default: 0,
    },
    helpfulAnswers: {
      type: Number,
      default: 0,
    },
    // Account Status & Verification
    isVerified: {
      type: Boolean,
      default: false,
    },
    // Timestamps
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
