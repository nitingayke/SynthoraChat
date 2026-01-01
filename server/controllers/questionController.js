import httpStatus from "http-status";
import Question from "../models/Question.js";
import User from "../models/User.js";
import { mapMediaType } from "../utils/mediaTypeMapper.js";
import { cleanupCloudinaryFiles } from "../services/cleanupCloudinary.js";

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
  const topics = req.body["topics[]"] || [];
  const userId = req.user?.id;
  const files = req.files || [];

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
