import httpStatus from "http-status";
import Question from "../models/Question.js";
import User from "../models/User.js";
import { mapMediaType } from "../utils/mediaTypeMapper.js";
import { cleanupCloudinaryFiles } from "../services/cleanupCloudinary.js";
import mongoose from "mongoose";

export const getAllQuestions = async (req, res) => {
  const page = Number.parseInt(req.query.page) || 1;
  const limit = Number.parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const questions = await Question.find({ status: "active" })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate({
      path: "author",
      select: "username email profile",
    })
    .lean();

  const totalQuestions = await Question.countDocuments({ status: "active" });

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Questions retrieved successfully",
    data: {
      questions,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalQuestions / limit),
        totalQuestions,
      },
    },
  });
};

export const createQuestion = async (req, res) => {
  const { title, content, allowComments } = req.body;
  const userId = req.user?.id;
  const files = req.files || [];

  let topics = [];
  if (req.body.topics) {
    topics = JSON.parse(req.body.topics);
  }

  if (!userId) {
    await cleanupCloudinaryFiles(files);
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  if (!title?.trim() || !content?.trim()) {
    await cleanupCloudinaryFiles(files);
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Title and content are required",
    });
  }

  const user = await User.findById(userId).select("username email profile");
  if (!user) {
    await cleanupCloudinaryFiles(files);
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "User not found",
    });
  }

  const media = (req.files || []).map((file) => ({
    type: mapMediaType(file),
    url: file.path,
    filename: file.filename,
  }));

  try {
    const question = await Question.create({
      author: userId,
      title: title.trim(),
      content: content.trim(),
      topics,
      allowComments,
      media,
    });

    await User.updateOne(
      { _id: userId },
      { $push: { questions: question._id } }
    );

    const populatedQuestion = {
      ...question.toObject(),
      author: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile,
      },
    };

    req.io.emit("question:new", { question: populatedQuestion });

    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "Question created successfully",
      data: {
        questionId: question._id,
      },
    });
  } catch {
    await cleanupCloudinaryFiles(files);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create question",
    });
  }
};

export const getQuestionById = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(404).json({ success: false, message: "Id not found" });
  }

  const question = await Question.findOne({ _id: id })
    .populate({
      path: "author",
      select: "username email profile", // Select only necessary fields
      populate: {
        path: "profile", // If profile is a separate field
        select: "firstName lastName avatar bio", // Select profile fields
      },
    })
    .lean(); // Convert to plain JavaScript object
    
  if (!question) {
    return res
      .status(404)
      .json({ success: false, message: "Question not found" });
  }

  return res
    .status(200)
    .json({ success: true, message: "Question found successfully", question });
};

export const toggleLikeQuestion = async (req, res) => {
  const { userId, questionId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(questionId)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid userId or questionId",
    });
  }

  const question = await Question.findById(questionId);

  if (!question) {
    return res.status(404).json({
      success: false,
      message: "Question not found",
    });
  }

  const alreadyLiked = question.likes.includes(userId);

  if (alreadyLiked) {
    // remove like
    question.likes.pull(userId);
  } else {
    // add like
    question.likes.push(userId);
  }

  await question.save();

  res.status(200).json({
    success: true,
    message: alreadyLiked ? "Like removed" : "Question liked",
    likesCount: question.likes.length,
    likes: question.likes,
  });
};

export const toggleUpvoteQuestion = async (req, res) => {
  const { userId, questionId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(questionId)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid userId or questionId",
    });
  }

  const question = await Question.findById(questionId);

  if (!question) {
    return res.status(404).json({
      success: false,
      message: "Question not found",
    });
  }

  const alreadyUpvoted = question.upvotes.includes(userId);

  if (alreadyUpvoted) {
    question.upvotes.pull(userId);
  } else {
    question.upvotes.push(userId);
  }

  await question.save();

  res.status(200).json({
    success: true,
    message: alreadyUpvoted ? "Upvote removed" : "Question upvoted",
    upvotesCount: question.upvotes.length,
    upvotes: question.upvotes,
  });
};

export const toggleSaveQuestion = async (req, res) => {
    const { userId, questionId } = req.body;

    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(questionId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId or questionId",
      });
    }

    // Check if already saved
    const alreadySaved = await User.exists({
      _id: userId,
      "savedQuestions.question": questionId,
    });

    if (alreadySaved) {
      // UNSAVE
      await Promise.all([
        User.findByIdAndUpdate(userId, {
          $pull: { savedQuestions: { question: questionId } },
        }),
        Question.findByIdAndUpdate(questionId, {
          $pull: { saves: userId },
        }),
      ]);

      return res.status(200).json({
        success: true,
        message: "Question unsaved",
        saved: false,
      });
    } else {
      // SAVE
      await Promise.all([
        User.findByIdAndUpdate(userId, {
          $addToSet: {
            savedQuestions: {
              question: questionId,
              savedAt: new Date(),
            },
          },
        }),
        Question.findByIdAndUpdate(questionId, {
          $addToSet: { saves: userId },
        }),
      ]);

      return res.status(200).json({
        success: true,
        message: "Question saved",
        saved: true,
      });
    }
};
export const getAllTopics = async (req, res) => {
  const topics = await Question.aggregate([
    { $match: { status: "active" } },
    { $unwind: "$topics" },

    // unique topics as stored
    {
      $group: {
        _id: "$topics",
      },
    },

    // optional: alphabetical order
    { $sort: { _id: 1 } },
  ]);

  return res.status(httpStatus.OK).json({
    success: true,
    message: "All topics fetched successfully",
    data: {
      topics: topics.map((t) => t._id),
    },
  });
};
