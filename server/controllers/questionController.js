import mongoose from "mongoose";
import httpStatus from "http-status";
import Question from "../models/Question.js";
import User from "../models/User.js";
import { mapMediaType } from "../utils/mediaTypeMapper.js";
import { cleanupCloudinaryFiles } from "../services/cleanupCloudinary.js";
import Answer from "../models/Answer.js";
import { addUserActivity } from "../services/activity.service.js";

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
      select: "username email profile isVerified",
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
  const userId = req.user?.id;
  const files = req.files || [];

  let topics = [];
  if (req.body.topics) {
    topics = JSON.parse(req.body.topics);
  }

  const TOPIC_LIMIT = 10;

  if (topics.length > TOPIC_LIMIT) {
    await cleanupCloudinaryFiles(files);
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: `Maximum ${TOPIC_LIMIT} topics allowed`,
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
      { $push: { questions: question._id } },
    );

    await addUserActivity({
      userId,
      title: "Question Posted",
      text: `You asked: ${title.trim()}`,
      link: `/main/questions/${question?._id}`,
    });

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

export const updateQuestion = async (req, res) => {
  const { questionId } = req.params;
  const userId = req.user.id;
  const files = req.files || [];

  let { title, content } = req.body;
  let topics = [];

  try {
    if (req.body.topics) {
      topics = JSON.parse(req.body.topics);
    }
  } catch {
    await cleanupCloudinaryFiles(files);
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Invalid topics format",
    });
  }

  if (!title?.trim() || !content?.trim()) {
    await cleanupCloudinaryFiles(files);
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Title and content are required",
    });
  }

  if (topics.length > 10) {
    await cleanupCloudinaryFiles(files);
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Maximum 10 topics allowed",
    });
  }

  if (files.length > 6) {
    await cleanupCloudinaryFiles(files);
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Maximum 6 media files allowed",
    });
  }

  const question = await Question.findById(questionId);
  if (!question) {
    await cleanupCloudinaryFiles(files);
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Question not found",
    });
  }

  if (question.author.toString() !== userId) {
    await cleanupCloudinaryFiles(files);
    return res.status(httpStatus.FORBIDDEN).json({
      success: false,
      message: "You are not allowed to edit this question",
    });
  }

  const oldMedia = question.media || [];

  const newMedia = files.map((file) => ({
    type: mapMediaType(file),
    url: file.path,
    filename: file.filename,
  }));

  question.title = title.trim();
  question.content = content.trim();
  question.topics = topics;
  question.media = newMedia;

  try {
    await question.save();

    await addUserActivity({
      userId,
      title: "Question Updated",
      text: `Updated your question: ${question.title}`,
      link: `/main/questions/${question._id}`,
    });

    if (oldMedia.length) {
      await cleanupCloudinaryFiles(oldMedia);
    }

    req.io.to(`question:${questionId}`).emit("question:update", {
      questionId,
      updates: {
        title: question.title,
        content: question.content,
        topics: question.topics,
        media: question.media,
        contentUpdatedAt: question.contentUpdatedAt,
      },
    });

    return res.status(httpStatus.OK).json({
      success: true,
      message: "Question updated successfully",
    });
  } catch (err) {
    await cleanupCloudinaryFiles(newMedia);
    throw err;
  }
};

export const getAllTopics = async (req, res) => {
  const topics = await Question.aggregate([
    { $match: { status: "active" } },

    { $unwind: "$topics" },

    // normalize topic
    {
      $project: {
        topic: {
          $toLower: {
            $trim: { input: "$topics" },
          },
        },
      },
    },

    // unique normalized topics
    {
      $group: {
        _id: "$topic",
      },
    },

    // alphabetical order
    { $sort: { _id: 1 } },
  ]);

  return res.status(httpStatus.OK).json({
    success: true,
    message: "All topics fetched successfully",
    data: {
      topics: topics.map((t) => t._id),
    },
  });
};

export const getQuestionById = async (req, res) => {
  const { questionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(questionId)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Invalid question questionId",
    });
  }

  const question = await Question.findById(questionId)
    .populate({
      path: "author",
      select: "username email profile isVerified",
      populate: {
        path: "profile",
        select: "firstName lastName avatar bio",
      },
    })
    .lean();

  if (!question) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Question not found",
    });
  }

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Question found successfully",
    data: { question },
  });
};

export const getAnswersByQuestionId = async (req, res) => {
  const { questionId } = req.params;
  const skip = Number.parseInt(req.query.skip) || 0;
  const limit = Number.parseInt(req.query.limit) || 10;

  const questionExists = await Question.exists({ _id: questionId });
  if (!questionExists) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Question not found",
    });
  }

  const answers = await Answer.find({
    questionId,
    // status: "published",
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate({
      path: "author",
      select:
        "_id username profile.firstName profile.lastName profile.profilePicture",
    })
    .populate({
      path: "comments.author",
      select:
        "_id username profile.firstName profile.lastName profile.profilePicture",
    })
    .lean();

  const totalAnswers = await Answer.countDocuments({
    questionId,
    // status: "published",
  });

  const formattedAnswers = answers.map((answer) => ({
    ...answer,
    comments: [...(answer.comments || [])].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    ),
  }));

  return res.status(httpStatus.OK).json({
    success: true,
    data: { answers: formattedAnswers },
    meta: {
      skip,
      limit,
      total: totalAnswers,
      hasMore: skip + answers.length < totalAnswers,
    },
  });
};

export const toggleLikeQuestion = async (req, res) => {
  const userId = req.user?.id;
  const { questionId } = req.params;

  const question = await Question.findById(questionId);
  if (!question) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Question not found",
    });
  }

  const alreadyLiked = question.likes.some((id) => id.equals(userId));

  if (alreadyLiked) {
    question.likes.pull(userId);
  } else {
    question.likes.push(userId);
  }

  await question.save();

  req.io.to(`question:${questionId}`).emit("question:like", {
    questionId,
    userId,
    liked: !alreadyLiked,
  });

  return res.status(httpStatus.OK).json({
    success: true,
    message: alreadyLiked ? "Like removed" : "Question liked",
    data: {
      likesCount: question.likes.length,
      liked: !alreadyLiked,
    },
  });
};

export const toggleUpvoteQuestion = async (req, res) => {
  const userId = req.user?.id;
  const { questionId } = req.params;

  const question = await Question.findById(questionId).select("upvotes author");
  if (!question) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Question not found",
    });
  }

  const alreadyUpvoted = question.upvotes.some((id) => id.equals(userId));
  const updates = [];

  if (alreadyUpvoted) {
    question.upvotes.pull(userId);

    updates.push(
      User.updateOne({ _id: question.author }, { $inc: { upvotesCount: -1 } }),
    );
  } else {
    question.upvotes.push(userId);

    updates.push(
      User.updateOne({ _id: question.author }, { $inc: { upvotesCount: 1 } }),
    );
  }

  updates.push(question.save());

  await Promise.all(updates);

  if (!alreadyUpvoted) {
    await addUserActivity({
      userId,
      title: "Upvoted a Question",
      text: "You upvoted a question",
      link: `/main/questions/${questionId}`,
    });
  }

  req.io.to(`question:${questionId}`).emit("question:upvote", {
    questionId,
    userId,
    upvoted: !alreadyUpvoted,
  });

  return res.status(httpStatus.OK).json({
    success: true,
    message: alreadyUpvoted ? "Upvote removed" : "Question upvoted",
    data: {
      upvoted: !alreadyUpvoted,
    },
  });
};

export const toggleSaveQuestion = async (req, res) => {
  const userId = req.user?.id;
  const { questionId } = req.params;

  const alreadySaved = await User.exists({
    _id: userId,
    "savedQuestions.question": questionId,
  });

  let saved;

  if (alreadySaved) {
    await Promise.all([
      User.updateOne(
        { _id: userId },
        { $pull: { savedQuestions: { question: questionId } } },
      ),
      Question.updateOne({ _id: questionId }, { $pull: { saves: userId } }),
    ]);
    saved = false;
  } else {
    await Promise.all([
      User.updateOne(
        { _id: userId },
        {
          $addToSet: {
            savedQuestions: { question: questionId, savedAt: new Date() },
          },
        },
      ),
      Question.updateOne({ _id: questionId }, { $addToSet: { saves: userId } }),
    ]);
    saved = true;
  }

  if (saved) {
    await addUserActivity({
      userId,
      title: "Saved a Question",
      text: "You saved a question",
      link: `/main/questions/${questionId}`,
    });
  }

  req.io.to(`question:${questionId}`).emit("question:save", {
    questionId,
    userId,
    saved,
  });

  return res.status(httpStatus.OK).json({
    success: true,
    message: saved ? "Question saved" : "Question unsaved",
    data: { saved },
  });
};
