import mongoose from "mongoose";
import httpStatus from "http-status";
import User from "../models/User.js";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";
import AIChat from "../models/AIChat.js";

export const getUserProfile = async (req, res) => {
  const { identifier } = req.params;

  let query = {};

  if (mongoose.Types.ObjectId.isValid(identifier)) {
    query._id = identifier;
  } else {
    query.username = identifier;
  }

  const user = await User.findOne(query)
    .select("-password")
    .populate({
      path: "followers.user",
      select:
        "username profile credentials topicsOfInterest followers following lastActive createdAt isVerified",
      model: "User",
    })
    .populate({
      path: "following.user",
      select:
        "username profile credentials topicsOfInterest followers following lastActive createdAt isVerified",
      model: "User",
    })
    .populate({
      path: "answers",
      select:
        "questionId content upvotes likes comments aiAccuracy views shares status createdAt",
      model: "Answer",
      options: { limit: 7 },
    });

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