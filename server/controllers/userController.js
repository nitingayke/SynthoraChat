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
