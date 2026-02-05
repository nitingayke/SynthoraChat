import httpStatus from "http-status";
import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import User from "../models/User.js";
import { cleanupCloudinaryFiles } from "../services/cleanupCloudinary.js";
import { mapMediaType } from "../utils/mediaTypeMapper.js";
import { addUserActivity } from "../services/activity.service.js";
import { addNotification } from "../services/notification.service.js";

export const createAnswer = async (req, res) => {
  const { questionId, content } = req.body;
  const userId = req.user?.id;
  const files = req.files || [];

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
      { $push: { answers: answer._id } },
    );

    await User.updateOne({ _id: userId }, { $push: { answers: answer._id } });

    await addUserActivity({
      userId,
      title: "Answered a Question",
      text: "You posted a new answer",
      link: `/main/questions/${questionId}`,
    });

    if (question.author.toString() !== userId) {
      await addNotification(req, question.author.toString(), {
        title: "New Answer",
        description: `${user.username} answered your question`,
        link: `/main/questions/${questionId}`,
      });
    }

    const populatedAnswer = await Answer.findById(answer._id)
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

    req.io.to(`question:${questionId}`).emit("answer:new", {
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

export const editAnswer = async (req, res) => {
  const userId = req.user?.id;
  const { answerId } = req.params;
  const { content } = req.body;

  if (!content?.trim()) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Content is required",
    });
  }

  const answer = await Answer.findById(answerId);
  if (!answer || answer.status === "deleted") {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Answer not found",
    });
  }

  if (!answer.author.equals(userId)) {
    return res.status(httpStatus.FORBIDDEN).json({
      success: false,
      message: "You are not allowed to edit this answer",
    });
  }

  answer.content = content.trim();
  await answer.save();

  await addUserActivity({
    userId,
    title: "Answer Updated",
    text: "You edited your answer",
    link: `/main/questions/${answer.questionId}`,
  });

  req.io.to(`question:${answer.questionId.toString()}`).emit("answer:edit", {
    answerId,
    content: answer.content,
    contentUpdatedAt: answer.contentUpdatedAt,
  });

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Answer updated successfully",
  });
};

export const deleteAnswer = async (req, res) => {
  const userId = req.user?.id;
  const { answerId } = req.params;

  const answer = await Answer.findById(answerId).select(
    "author questionId comments media likes upvotes",
  );

  if (!answer) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Answer not found",
    });
  }

  if (!answer.author.equals(userId)) {
    return res.status(httpStatus.FORBIDDEN).json({
      success: false,
      message: "You can only delete your own answers",
    });
  }

  if (answer.comments.length > 0) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message:
        "You can't delete this answer because it already has comments. Deleting it would remove others’ contributions.",
    });
  }

  const helpfulAnswersRollback = answer.likes.length;
  const upvotesRollback = answer.upvotes.length;

  if (answer.media.length > 0) {
    await cleanupCloudinaryFiles(answer.media);
  }

  await Promise.all([
    Question.updateOne(
      { _id: answer.questionId },
      { $pull: { answers: answer._id } },
    ),

    User.updateOne(
      { _id: userId },
      {
        $pull: { answers: answer._id },
        $inc: {
          helpfulAnswers: -helpfulAnswersRollback,
          upvotesCount: -upvotesRollback,
        },
      },
    ),

    Answer.deleteOne({ _id: answerId }),
  ]);

  req.io.to(`question:${answer.questionId.toString()}`).emit("answer:delete", {
    answerId,
    questionId: answer.questionId,
  });

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Answer deleted permanently",
    data: { answerId },
  });
};

export const toggleLikeAnswer = async (req, res) => {
  const userId = req.user?.id;
  const { answerId } = req.params;

  const answer = await Answer.findById(answerId).select(
    "questionId likes author",
  );

  if (!answer) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Answer not found",
    });
  }

  const alreadyLiked = answer.likes.some((id) => id?.equals(userId));
  const updates = [];

  if (alreadyLiked) {
    answer.likes.pull(userId);

    updates.push(
      User.updateOne({ _id: answer.author }, { $inc: { helpfulAnswers: -1 } }),
    );
  } else {
    answer.likes.push(userId);

    updates.push(
      User.updateOne({ _id: answer.author }, { $inc: { helpfulAnswers: 1 } }),
    );
  }

  updates.push(answer.save());
  await Promise.all(updates);

  req.io.to(`question:${answer.questionId.toString()}`).emit("answer:like", {
    answerId: answer._id.toString(),
    userId: req.user.id,
    liked: !alreadyLiked,
  });

  return res.status(httpStatus.OK).json({
    success: true,
    message: alreadyLiked ? "Like removed" : "Answer liked",
    data: {
      liked: !alreadyLiked,
      likesCount: answer.likes.length,
    },
  });
};

export const toggleUpvoteAnswer = async (req, res) => {
  const userId = req.user?.id;
  const { answerId } = req.params;

  const answer = await Answer.findById(answerId).select(
    "questionId upvotes author",
  );
  
  if (!answer) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Answer not found",
    });
  }

  const alreadyUpvoted = answer.upvotes.some((id) => id?.equals(userId));
  const updates = [];

  if (alreadyUpvoted) {
    answer.upvotes.pull(userId);

    updates.push(
      User.updateOne({ _id: answer.author }, { $inc: { upvotesCount: -1 } }),
    );
  } else {
    answer.upvotes.push(userId);

    updates.push(
      User.updateOne({ _id: answer.author }, { $inc: { upvotesCount: 1 } }),
    );
  }

  updates.push(answer.save());
  await Promise.all(updates);

  if (!alreadyUpvoted) {
    await addUserActivity({
      userId,
      title: "Upvoted an Answer",
      text: "You upvoted an answer",
      link: `/main/questions/${answer.questionId}`,
    });

    if (answer.author.toString() !== userId) {
      await addNotification(req, answer.author.toString(), {
        title: "Answer Upvoted",
        description: `${req.user.username} upvoted your answer`,
        link: `/main/questions/${answer.questionId.toString()}`,
      });
    }
  }

  req.io.to(`question:${answer.questionId.toString()}`).emit("answer:upvote", {
    answerId,
    userId,
    upvoted: !alreadyUpvoted,
  });

  return res.status(httpStatus.OK).json({
    success: true,
    message: alreadyUpvoted ? "Upvote removed" : "Answer upvoted",
    data: {
      upvoted: !alreadyUpvoted,
    },
  });
};

export const addAnswerComment = async (req, res) => {
  const userId = req.user.id;
  const { answerId } = req.params;
  const { content } = req.body;

  if (!content?.trim()) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Comment cannot be empty",
    });
  }

  const answer = await Answer.findById(answerId).select("author comments questionId");

  if (!answer) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Answer not found",
    });
  }

  answer.comments.push({
    author: userId,
    content: content.trim(),
  });

  await answer.save();

  await addUserActivity({
    userId,
    title: "Commented on an Answer",
    text: "You added a comment",
    link: `/main/questions/${answer.questionId}`,
  });

  if (answer.author.toString() !== userId) {
    await addNotification(req, answer.author.toString(), {
      title: "New Comment",
      description: `${req.user.username} commented on your answer`,
      link: `/main/questions/${answer.questionId.toString()}`,
    });
  }

  await answer.populate({
    path: "comments.author",
    select:
      "_id username profile.firstName profile.lastName profile.profilePicture",
  });

  const createdComment = answer.comments.at(-1);

  req.io
    .to(`question:${answer.questionId.toString()}`)
    .emit("answer:comment:new", {
      answerId,
      comment: createdComment,
    });

  return res.status(httpStatus.CREATED).json({
    success: true,
    message: "Comment added",
  });
};

export const toggleUpvoteComment = async (req, res) => {
  const userId = req.user.id;
  const { answerId, commentId } = req.params;

  const answer = await Answer.findById(answerId).select("questionId comments");

  if (!answer) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Answer not found",
    });
  }

  const comment = answer.comments.id(commentId);

  if (!comment) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Comment not found",
    });
  }

  const alreadyUpvoted = comment.upvotes.some((id) => id.equals(userId));

  const updates = [];

  if (alreadyUpvoted) {
    comment.upvotes.pull(userId);

    updates.push(
      User.updateOne({ _id: comment.author }, { $inc: { upvotesCount: -1 } }),
    );
  } else {
    comment.upvotes.push(userId);

    updates.push(
      User.updateOne({ _id: comment.author }, { $inc: { upvotesCount: 1 } }),
    );
  }

  updates.push(answer.save());
  await Promise.all(updates);

  req.io.to(`question:${answer.questionId.toString()}`).emit("comment:upvote", {
    answerId,
    commentId,
    userId,
    upvoted: !alreadyUpvoted,
  });

  return res.status(httpStatus.OK).json({
    success: true,
    message: alreadyUpvoted ? "Comment upvote removed" : "Comment upvoted",
    data: {
      upvoted: !alreadyUpvoted,
      upvotesCount: comment.upvotes.length,
    },
  });
};

export const deleteAnswerComment = async (req, res) => {
  const userId = req.user.id;
  const { answerId, commentId } = req.params;

  const answer = await Answer.findById(answerId).select(
    "questionId author comments",
  );

  if (!answer) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Answer not found",
    });
  }

  const comment = answer.comments.id(commentId);

  if (!comment) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Comment not found",
    });
  }

  if (!comment.author.equals(userId)) {
    return res.status(httpStatus.FORBIDDEN).json({
      success: false,
      message: "You are not allowed to delete this comment",
    });
  }

  const upvotesCount = comment.upvotes.length;
  const updates = [];

  if (upvotesCount > 0) {
    updates.push(
      User.updateOne(
        { _id: comment.author },
        { $inc: { upvotesCount: -upvotesCount } },
      ),
    );
  }

  comment.deleteOne();
  updates.push(answer.save());

  await Promise.all(updates);

  req.io
    .to(`question:${answer.questionId.toString()}`)
    .emit("comment:deleted", {
      answerId,
      commentId,
    });

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Comment deleted successfully",
  });
};
