import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.js";
import User from "../models/User.js";
import { googleAuth } from "../services/googleAuth.service.js";
import mongoose from "mongoose";

export const userSignup = async (req, res) => {
  let { username, email, password } = req.body;

  username = username?.trim();
  email = email?.trim().toLowerCase();
  password = password?.trim();

  if (!username || !email || !password) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Username, email and password are required",
    });
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    let conflictField = "";

    if (existingUser.email === email && existingUser.username === username) {
      conflictField = "Email and username already exist";
    } else if (existingUser.email === email) {
      conflictField = "Email already exists";
    } else {
      conflictField = "Username already exists";
    }

    return res.status(httpStatus.CONFLICT).json({
      success: false,
      message: conflictField,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = generateToken({
    id: user._id,
    username: user.username,
  });

  const userResponse = user.toObject();
  delete userResponse.password;

  return res.status(httpStatus.CREATED).json({
    success: true,
    message: "Account created successfully",
    data: {
      token,
      user: userResponse,
    },
  });
};

export const userLogin = async (req, res) => {
  let { identifier, password } = req.body;

  identifier = identifier.trim();
  password = password.trim();

  if (!identifier || !password) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Email/Username and password are required",
    });
  }

  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "User not found!",
    });
  }

  if (user.isBlocked) {
    return res.status(httpStatus.FORBIDDEN).json({
      success: false,
      message: "Your account has been blocked. Please contact support.",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Wrong password",
    });
  }

  const token = generateToken({
    id: user._id,
    username: user.username,
  });

  const userResponse = user.toObject();
  delete userResponse.password;

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Login successful",
    data: {
      token,
      user: userResponse,
    },
  });
};

export const googleLogin = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Google ID token is required",
    });
  }

  const { token, user } = await googleAuth(idToken);

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Google login successful",
    data: { token, user },
  });
};

export const verifyUser = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "User ID is required",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Invalid user ID format",
    });
  }

  if (userId !== req.user.id) {
    return res.status(httpStatus.FORBIDDEN).json({
      success: false,
      message: "You are not allowed to verify this user",
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "User not found",
    });
  }

  user.isVerified = true;
  await user.save();

  return res.status(httpStatus.OK).json({
    success: true,
    message: "User verified successfully",
  });
};
