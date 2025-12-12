import httpStatus from "http-status";
import { generateToken } from "../utils/token.js";


export const userSignup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Username, email, and password are required.",
    });
  }

  const token = generateToken({
    id: email,
    username,
  });

  return res.status(httpStatus.CREATED).json({
    success: true,
    message: "Account created successfully.",
    data: {
      token,
      user: {
        username,
        email,
      },
    },
  });
};


export const userLogin = async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Identifier (email/username) and password required",
    });
  }

  //   const user = await User.findOne({
  //     $or: [{ email: identifier }, { username: identifier }],
  //   });

  const token = generateToken({
    id: identifier, // here: userid
    username: identifier, // here we have to add username or email
  });

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Login successfully",
    data: {
      token,
      user: {
        username: "nitingayke",
        identifier
      },
    },
  });
};


export const getUserProfile = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "User ID is required.",
    });
  }

  return res.status(httpStatus.OK).json({
    success: true,
    message: "User profile retrieved successfully.",
    data: {
      name: req?.user?.username,
      userId,
    },
  });
};
