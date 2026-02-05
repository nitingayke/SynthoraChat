import mongoose from "mongoose";
import httpStatus from "http-status";
import User from "../models/User.js";
import { findUserWithProfile } from "../services/user.service.js";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";
import AIChat from "../models/AIChat.js";
import { addNotification } from "../services/notification.service.js";
import { addUserActivity } from "../services/activity.service.js";

export const getCurrentUser = async (req, res) => {
  const userId = req.user.id;

  const user = await findUserWithProfile({ _id: userId });

  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Current user fetched successfully",
    data: {
      user,
    },
  });
};

export const getUserProfile = async (req, res) => {
  const { identifier } = req.params;

  const query = mongoose.Types.ObjectId.isValid(identifier)
    ? { _id: identifier }
    : { username: identifier };

  const user = await findUserWithProfile(query);

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

export const getUserQuestions = async (req, res) => {
  const { userId } = req.params;
  const limit = Number(req.query.limit) || 10;
  const cursor = req.query.cursor;

  const query = {
    author: userId,
    ...(cursor && { _id: { $lt: new mongoose.Types.ObjectId(cursor) } }),
  };

  const questions = await Question.find(query)
    .select(
      "title content topics allowComments answers likes upvotes saves views status createdAt",
    )
    .sort({ _id: -1 })
    .limit(limit + 1)
    .lean(); //skip hydrating the results into heavy Mongoose Document instances and returns plain JavaScript objects

  const hasMore = questions.length > limit;
  if (hasMore) questions.pop();

  return res.status(200).json({
    success: true,
    data: {
      questions,
    },
    pagination: {
      hasMore,
      nextCursor:
        questions.length > 0 ? questions[questions.length - 1]._id : null,
    },
  });
};

export const getUserAnswers = async (req, res) => {
  const { userId } = req.params;
  const limit = Number(req.query.limit) || 10;
  const cursor = req.query.cursor;

  const query = {
    author: userId,
    ...(cursor && { _id: { $lt: new mongoose.Types.ObjectId(cursor) } }),
  };

  const answers = await Answer.find(query)
    .select(
      "questionId content upvotes likes comments aiAccuracy views status createdAt",
    )
    .populate({
      path: "questionId",
      select: "title",
    })
    .sort({ _id: -1 })
    .limit(limit + 1)
    .lean();

  const hasMore = answers.length > limit;
  if (hasMore) answers.pop();

  return res.status(200).json({
    success: true,
    data: {
      answers,
    },
    pagination: {
      hasMore,
      nextCursor: answers.length > 0 ? answers.at(-1)._id : null,
    },
  });
};

export const getSavedQuestions = async (req, res) => {
  const { userId } = req.params;
  const limit = Number(req.query.limit) || 10;
  const cursor = req.query.cursor;

  const user = await User.findById(userId).select("savedQuestions").lean();

  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "User not found",
    });
  }

  let saved = user.savedQuestions || [];

  saved.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));

  if (cursor) {
    const cursorDate = new Date(cursor);
    saved = saved.filter((sq) => new Date(sq.savedAt) < cursorDate);
  }

  let slice = saved.slice(0, limit + 1);

  const populated = await User.populate(slice, {
    path: "question",
    model: "Question",
    select:
      "title content topics allowComments answers likes upvotes saves views status createdAt author",
    populate: {
      path: "author",
      select:
        "username profile.profilePicture profile.firstName profile.lastName",
    },
  });

  const cleaned = populated.filter((sq) => sq.question);

  const hasMore = cleaned.length > limit;
  if(hasMore) cleaned.pop();

  const nextCursor = cleaned.length > 0 ? cleaned.at(-1).savedAt : null;

  return res.status(httpStatus.OK).json({
    success: true,
    data: {
      questions: cleaned,
    },
    pagination: {
      hasMore,
      nextCursor
    },
  });
};

export const followUser = async (req, res) => {
  const currentUserId = req.user.id;
  const targetUserId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Invalid user ID",
    });
  }

  if (currentUserId === targetUserId) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "You cannot follow yourself",
    });
  }

  const [currentUser, targetUser] = await Promise.all([
    User.findById(currentUserId),
    User.findById(targetUserId),
  ]);

  if (!targetUser) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "User not found",
    });
  }

  const isAlreadyFollowing = currentUser.following.some(
    (f) => f.user.toString() === targetUserId,
  );

  if (isAlreadyFollowing) {
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Already following",
    });
  }

  currentUser.following.push({ user: targetUserId });
  targetUser.followers.push({ user: currentUserId });

  await addNotification(req, targetUserId, {
    title: "New Follower",
    description: `${currentUser.username} started following you`,
    link: `/main/u/profile/${currentUser.username}`,
  });

  await addUserActivity({
    userId: currentUserId,
    title: "You followed a user",
    text: `You started following @${targetUser.username}`,
    link: `/main/u/profile/${targetUser.username}`,
  });

  await addUserActivity({
    userId: targetUserId,
    title: "New follower",
    text: `@${currentUser.username} started following you`,
    link: `/main/u/profile/${currentUser.username}`,
  });

  await Promise.all([currentUser.save(), targetUser.save()]);

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Followed successfully",
  });
};

export const unfollowUser = async (req, res) => {
  const currentUserId = req.user.id;
  const targetUserId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Invalid user ID",
    });
  }

  if (currentUserId === targetUserId) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "You cannot unfollow yourself",
    });
  }

  const [currentUser, targetUser] = await Promise.all([
    User.findById(currentUserId),
    User.findById(targetUserId),
  ]);

  if (!targetUser) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "User not found",
    });
  }

  const wasFollowing = currentUser.following.some(
    (f) => f.user.toString() === targetUserId,
  );

  if (!wasFollowing) {
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Already unfollowed",
    });
  }

  currentUser.following = currentUser.following.filter(
    (f) => f.user.toString() !== targetUserId,
  );

  targetUser.followers = targetUser.followers.filter(
    (f) => f.user.toString() !== currentUserId,
  );

  await addUserActivity({
    userId: currentUserId,
    title: "You unfollowed a user",
    text: `You unfollowed @${targetUser.username}`,
    link: `/main/u/profile/${targetUser.username}`,
  });

  await Promise.all([currentUser.save(), targetUser.save()]);

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Unfollowed successfully",
  });
};

export const markAllNotificationsRead = async (req, res) => {
  const userId = req.user.id;

  await User.findByIdAndUpdate(userId, {
    lastNotificationReadAt: new Date(),
  });

  return res.status(httpStatus.OK).json({
    success: true,
    message: "All notifications marked as read",
  });
};
