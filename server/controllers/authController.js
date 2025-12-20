import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.js";
import User from "../models/User.js";

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
