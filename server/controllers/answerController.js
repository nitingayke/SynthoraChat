import httpStatus from "http-status";
import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import User from "../models/User.js";
import { cleanupCloudinaryFiles } from "../services/cleanupCloudinary.js";
import { mapMediaType } from "../utils/mediaTypeMapper.js";

export const createAnswer = async (req, res) => {
  const { questionId, content } = req.body;
  const userId = req.user?.id;
  const files = req.files || [];

  if (!userId) {
    await cleanupCloudinaryFiles(files);
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  if (!questionId || !content?.trim()) {
    await cleanupCloudinaryFiles(files);
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Question ID and content are required",
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

  const question = await Question.findById(questionId);
  if (!question || question.status !== "active") {
    await cleanupCloudinaryFiles(files);
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Question not found or inactive",
    });
  }

  const media = files.map((file) => ({
    type: mapMediaType(file),
    url: file.path,
    filename: file.filename,
  }));

  try {
    const answer = await Answer.create({
      questionId,
      author: userId,
      content: content.trim(),
      media,
    });

    await Question.updateOne(
      { _id: questionId },
      { $push: { answers: answer._id } }
    );

    await User.updateOne({ _id: userId }, { $push: { answers: answer._id } });

    const populatedAnswer = {
      ...answer.toObject(),
      author: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile,
      },
    };

    req.io.emit("answer:new", {
      questionId,
      answer: populatedAnswer,
    });

    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "Answer posted successfully",
      data: {
        answerId: answer._id,
      },
    });
  } catch {
    await cleanupCloudinaryFiles(files);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create answer",
    });
  }
};
