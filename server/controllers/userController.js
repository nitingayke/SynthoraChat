import mongoose from "mongoose";
import httpStatus from "http-status";
import User from "../models/User.js";
import { findUserWithProfile } from "../services/user.service.js";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";
import AIChat from "../models/AIChat.js";

export const getCurrentUser = async (req, res) => {
  const userId = req.user.id;

  const user = await findUserWithProfile({ _id: userId });

  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Current user fetched successfully",
    data: {
      user,
    },
  });
};

export const getUserProfile = async (req, res) => {
  const { identifier } = req.params;

  const query = mongoose.Types.ObjectId.isValid(identifier)
    ? { _id: identifier }
    : { username: identifier };

  const user = await findUserWithProfile(query);

  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(httpStatus.OK).json({
    success: true,
    message: "User profile retrieved successfully",
    data: {
      user,
    },
  });
};

export const getUserQuestions = async (req, res) => {
  const { userId } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [questions, total] = await Promise.all([
    Question.find({ author: userId })
      .select(
        "title content topics allowComments answers likes upvotes saves views status createdAt"
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),

    Question.countDocuments({ author: userId }),
  ]);

  return res.status(httpStatus.OK).json({
    success: true,
    data: {
      questions,
    },
    pagination: {
      page,
      limit,
      total,
      hasMore: skip + questions.length < total,
    },
  });
};

export const getUserAnswers = async (req, res) => {
  const { userId } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [answers, total] = await Promise.all([
    Answer.find({ author: userId })
      .select(
        "questionId content upvotes likes comments aiAccuracy views status createdAt"
      )
      .populate({
        path: "questionId",
        select: "title",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),

    Answer.countDocuments({ author: userId }),
  ]);

  return res.status(httpStatus.OK).json({
    success: true,
    data: {
      answers,
    },
    pagination: {
      page,
      limit,
      total,
      hasMore: skip + answers.length < total,
    },
  });
};

export const getSavedQuestions = async (req, res) => {
  const { userId } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const user = await User.findById(userId)
    .select("savedQuestions")
    .populate({
      path: "savedQuestions.question",
      select:
        "title content topics allowComments answers likes upvotes saves views status createdAt author",
      populate: {
        path: "author",
        select:
          "username profile.profilePicture profile.firstName profile.lastName",
      },
      options: {
        skip,
        limit,
      },
    })
    .lean();

  const total = user?.savedQuestions?.length || 0;

  return res.status(httpStatus.OK).json({
    success: true,
    data: {
      questions: user.savedQuestions,
    },
    pagination: {
      page,
      limit,
      total,
      hasMore: skip + user.savedQuestions.length < total,
    },
  });
};











// .populate({
//       path: "answers",
//       select:
//         "questionId content upvotes likes comments aiAccuracy views shares status createdAt",
//       model: "Answer",
//       options: { limit: 15 },
//     })
// .populate({
//       path: "questions",
//       select:
//         "title content topics allowComments answers likes upvotes saves views status createdAt",
//       model: "Question",
//       options: { limit: 7 },
//     })
//     .populate({
//       path: "savedQuestions.question",
//       select:
//         "title content topics allowComments answers likes upvotes saves views status createdAt author",
//       model: "Question",
//       options: { limit: 7 },
//       populate: {
//         path: "author",
//         select:
//           "username profile.profilePicture profile.firstName profile.lastName",
//         model: "User",
//       },
//     })
