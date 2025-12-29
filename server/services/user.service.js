import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

/**
 * Find user by ID or username and populate the other fields
 */
export const findUserWithProfile = async (query) => {
  if (query?._id && !mongoose.Types.ObjectId.isValid(query._id)) return null;

  return User.findOne(query)
    .select("-password")
    .populate({
      path: "followers.user",
      select:
        "username profile credentials topicsOfInterest followers following lastActive createdAt isVerified",
      model: "User",
      options: { limit: 15 },
    })
    .populate({
      path: "following.user",
      select:
        "username profile credentials topicsOfInterest followers following lastActive createdAt isVerified",
      model: "User",
      options: { limit: 15 },
    })
    .populate({
      path: "answers",
      select:
        "questionId content upvotes likes comments aiAccuracy views shares status createdAt",
      model: "Answer",
      options: { limit: 15 },
    });
};

/**
 * Find user by ID or throw error
 */
export const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("USER_NOT_FOUND");
  return user;
};

/**
 * Update profile fields safely
 */
export const updateUserProfile = async (userId, updateData) => {
  return await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true }
  );
};

/**
 * Update email
 */
export const updateUserEmail = async (userId, newEmail) => {
  return await User.findByIdAndUpdate(
    userId,
    { email: newEmail, isVerified: false },
    { new: true }
  );
};

/**
 * Update password
 */
export const updateUserPassword = async (userId, newPassword) => {
  const hashed = await bcrypt.hash(newPassword, 10);
  return await User.findByIdAndUpdate(
    userId,
    { password: hashed },
    { new: true }
  );
};
