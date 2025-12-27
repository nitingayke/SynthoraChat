import httpStatus from "http-status";
import User from "../models/User.js";
import { authorizeUser } from "../utils/authorizeUser.js";
import { updateUserEmail, updateUserPassword, updateUserProfile } from "../services/user.service.js";

export const editProfile = async (req, res) => {
  const { userId, editData } = req.body;

  if (!authorizeUser(req, userId, res)) return;

  const parsed = JSON.parse(editData);
  const updateData = {};

  const allowedFields = ["firstName", "lastName", "bio", "location", "website"];

  allowedFields.forEach((field) => {
    if (parsed[field] !== undefined) {
      updateData[`profile.${field}`] = parsed[field];
    }
  });

  if (parsed.credentials) updateData.credentials = parsed.credentials;
  if (parsed.knowsAbout) updateData.knowsAbout = parsed.knowsAbout;

  if (req.files?.avatar?.[0]?.path) {
    updateData["profile.profilePicture"] = req.files.avatar[0].path;
  }

  if (req.files?.cover?.[0]?.path) {
    updateData["profile.coverPicture"] = req.files.cover[0].path;
  }

  const updatedUser = await updateUserProfile(userId, updateData);

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Profile updated successfully",
    data: updatedUser,
  });
};

export const updateEmail = async (req, res) => {
  const { userId, newEmail } = req.body;

  if (!authorizeUser(req, userId, res)) return;

  if (!newEmail) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  const emailExists = await User.findOne({ email: newEmail });
  if (emailExists) {
    return res.status(400).json({
      success: false,
      message: "Email already in use",
    });
  }

  await updateUserEmail(userId, newEmail)

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Email updated successfully",
  });
};

export const updatePassword = async (req, res) => {
  const { userId, newPassword } = req.body;

  if (!authorizeUser(req, userId, res)) return;

  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  await updateUserPassword(userId, newPassword);

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Password updated successfully",
  });
};
