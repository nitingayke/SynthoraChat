import mongoose from "mongoose";
import User from "../models/User.js";

export const findUserWithProfile = async (query) => {
    
  if (query?._id && !mongoose.Types.ObjectId.isValid(query._id)) return null;

  return User.findOne(query)
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
};
