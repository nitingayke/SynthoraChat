import mongoose from "mongoose";
import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import httpStatus from "http-status";
import User from "../models/User.js";
import { cleanupCloudinaryFiles } from "../services/cleanupCloudinary.js";
import { mapMediaType } from "../utils/mediaTypeMapper.js";

// Get all answers for a question
export const getAnswersByQuestion = async (req, res) => {
  try {
    // console.log("Get answers by question")
    const { questionId } = req.params;
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Validate question exists
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Build query
    const query = {
      questionId,
      status: "published",
    };

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get answers with populated author
    const answers = await Answer.find(query)
      .populate("author", "username email profile")
      .populate({
        path: "comments.author",
        select: "username profile",
      })
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count for pagination
    const totalAnswers = await Answer.countDocuments(query);

    // Update question views
    await Question.findByIdAndUpdate(questionId, {
      $inc: { views: 1 },
    });

    res.status(200).json({
      success: true,
      data: answers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalAnswers / parseInt(limit)),
        totalItems: totalAnswers,
        hasNext: skip + answers.length < totalAnswers,
        hasPrev: parseInt(page) > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching answers:", error);
    res.status(500).json({
      error: "Failed to fetch answers",
    });
  }
};
// Get single answer
export const getAnswerById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid answer ID format",
      });
    }

    const answer = await Answer.findById(id)
      .populate("author", "username email profile")
      .populate("upvotes likes", "username profile")
      .populate({
        path: "comments.author",
        select: "username profile",
      });

    if (!answer || answer.status !== "published") {
      return res.status(404).json({
        success: false,
        error: "Answer not found",
      });
    }

    // Increment views
    answer.views += 1;
    await answer.save();

    res.status(200).json({
      success: true,
      data: answer,
    });
  } catch (error) {
    console.error("Error fetching answer:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch answer",
    });
  }
};

export const createAnswer = async (req, res) => {
  const { questionId, content } = req.body;
  const userId = req.user?.id;
  const files = req.files || [];

  console.log("Uploaded files:", files);

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

  // Map files to media array
  const media = files.map((file) => ({
    type: mapMediaType(file.mimetype || file.originalname),
    url: file.path,
    filename: file.originalname,
    public_id: file.filename,
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

    // Populate the answer with author details
    const populatedAnswer = await Answer.findById(answer._id)
      .populate("author", "username email profile")
      .lean();

    req.io.emit("answer:new", {
      questionId,
      answer: populatedAnswer,
    });

    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "Answer posted successfully",
      data: populatedAnswer, // Return full populated answer
    });
  } catch (error) {
    console.error("Error creating answer:", error);
    await cleanupCloudinaryFiles(files);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create answer",
      error: error.message,
    });
  }
};
// Update answer controller
export const updateAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const answer = await Answer.findById(id);
    if (!answer) {
      return res.status(404).json({ 
        success: false,
        error: "Answer not found" 
      });
    }

    // Check ownership
    if (answer.author.toString() !== userId.toString()) {
      return res.status(403).json({ 
        success: false,
        error: "Not authorized to update this answer" 
      });
    }

    // Update content
    if (content !== undefined) {
      answer.content = content.trim();
    }

    answer.updatedAt = new Date();
    await answer.save();

    const populatedAnswer = await Answer.findById(id)
      .populate("author", "username email profile");

    res.status(200).json({
      success: true,
      message: "Answer updated successfully",
      data: populatedAnswer
    });
  } catch (error) {
    console.error("Error updating answer:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to update answer" 
    });
  }
};

// Delete answer controller
export const deleteAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const answer = await Answer.findById(id);
    if (!answer) {
      return res.status(404).json({ 
        success: false,
        error: "Answer not found" 
      });
    }

    // Check ownership or admin
    const isOwner = answer.author.toString() === userId.toString();
    const isAdmin = req.user.isAdmin; // Assuming you have isAdmin field

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ 
        success: false,
        error: "Not authorized to delete this answer" 
      });
    }

    // Soft delete (update status)
    answer.status = "deleted";
    await answer.save();

    // Or hard delete:
    // await Answer.findByIdAndDelete(id);
    // await Question.updateOne(
    //   { _id: answer.questionId },
    //   { $pull: { answers: id } }
    // );

    res.status(200).json({
      success: true,
      message: "Answer deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting answer:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to delete answer" 
    });
  }
};

// Like an answer
export const likeAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const answer = await Answer.findById(id);
    if (!answer || answer.status !== "published") {
      return res.status(404).json({ 
        success: false,
        error: "Answer not found" 
      });
    }

    // Check if already liked
    const hasLiked = answer.likes.includes(userId);
    
    if (hasLiked) {
      // Remove like
      answer.likes = answer.likes.filter(
        like => like.toString() !== userId.toString()
      );
    } else {
      // Add like
      answer.likes.push(userId);
    }

    await answer.save();

    res.status(200).json({
      success: true,
      message: hasLiked ? "Like removed" : "Answer liked",
      data: {
        likes: answer.likes.length,
        hasLiked: !hasLiked
      }
    });
  } catch (error) {
    console.error("Error liking answer:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to like answer" 
    });
  }
};

// Upvote an answer
export const upvoteAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const answer = await Answer.findById(id);
    if (!answer || answer.status !== "published") {
      return res.status(404).json({ 
        success: false,
        error: "Answer not found" 
      });
    }

    // Check if already upvoted
    const hasUpvoted = answer.upvotes.includes(userId);
    
    if (hasUpvoted) {
      // Remove upvote
      answer.upvotes = answer.upvotes.filter(
        upvote => upvote.toString() !== userId.toString()
      );
    } else {
      // Add upvote
      answer.upvotes.push(userId);
    }

    await answer.save();

    res.status(200).json({
      success: true,
      message: hasUpvoted ? "Upvote removed" : "Answer upvoted",
      data: {
        upvotes: answer.upvotes.length,
        hasUpvoted: !hasUpvoted
      }
    });
  } catch (error) {
    console.error("Error upvoting answer:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to upvote answer" 
    });
  }
};

// Add comment to answer
export const addCommentToAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ 
        success: false,
        error: "Comment content is required" 
      });
    }

    const answer = await Answer.findById(id);
    if (!answer || answer.status !== "published") {
      return res.status(404).json({ 
        success: false,
        error: "Answer not found" 
      });
    }

    // Create new comment
    const newComment = {
      author: userId,
      content: content.trim(),
      sentiment: "neutral", // You can implement sentiment analysis here
      isAiGenerated: false
    };

    answer.comments.push(newComment);
    await answer.save();

    // Populate the new comment with author info
    const updatedAnswer = await Answer.findById(id)
      .populate({
        path: "comments.author",
        select: "username profile"
      });

    const addedComment = updatedAnswer.comments[updatedAnswer.comments.length - 1];

    // Emit socket event for real-time updates
    req.io.emit(`answer:comment:${id}`, {
      comment: addedComment
    });

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: addedComment
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to add comment" 
    });
  }
};

// Get answer comments
export const getAnswerComments = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const answer = await Answer.findById(id)
      .select("comments")
      .populate({
        path: "comments.author",
        select: "username profile"
      })
      .lean();

    if (!answer) {
      return res.status(404).json({ 
        success: false,
        error: "Answer not found" 
      });
    }

    const comments = answer.comments || [];
    const totalComments = comments.length;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedComments = comments.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      data: {
        comments: paginatedComments,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalComments / limit),
          totalComments,
          hasNext: endIndex < totalComments,
          hasPrev: startIndex > 0
        }
      }
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch comments" 
    });
  }
};

// Share an answer
export const shareAnswer = async (req, res) => {
  try {
    const { id } = req.params;

    const answer = await Answer.findById(id);
    if (!answer || answer.status !== "published") {
      return res.status(404).json({ error: "Answer not found" });
    }

    // Increment shares count
    answer.shares += 1;
    await answer.save();

    res.status(200).json({
      success: true,
      message: "Share recorded",
      data: {
        shares: answer.shares,
      },
    });
  } catch (error) {
    console.error("Error sharing answer:", error);
    res.status(500).json({ error: "Failed to record share" });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const userId = req.user._id;

    const answer = await Answer.findById(id);
    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    // Find comment
    const commentIndex = answer.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const comment = answer.comments[commentIndex];

    // Check ownership or admin
    if (
      comment.author.toString() !== userId.toString() &&
      answer.author.toString() !== userId.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({
        error: "Not authorized to delete this comment",
      });
    }

    // Remove comment
    answer.comments.splice(commentIndex, 1);
    await answer.save();

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};

// Get user's answers
export const getUserAnswers = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const answers = await Answer.find({
      author: userId,
      status: "published",
    })
      .populate("questionId", "title")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalAnswers = await Answer.countDocuments({
      author: userId,
      status: "published",
    });

    res.status(200).json({
      success: true,
      data: answers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalAnswers / parseInt(limit)),
        totalItems: totalAnswers,
      },
    });
  } catch (error) {
    console.error("Error fetching user answers:", error);
    res.status(500).json({ error: "Failed to fetch user answers" });
  }
};

// Search answers
export const searchAnswers = async (req, res) => {
  try {
    const { q, questionId, page = 1, limit = 10 } = req.query;

    const query = {
      status: "published",
      $or: [{ content: { $regex: q, $options: "i" } }],
    };

    if (questionId) {
      query.questionId = questionId;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const answers = await Answer.find(query)
      .populate("author", "username profile")
      .populate("questionId", "title")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Answer.countDocuments(query);

    res.status(200).json({
      success: true,
      data: answers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
      },
    });
  } catch (error) {
    console.error("Error searching answers:", error);
    res.status(500).json({ error: "Failed to search answers" });
  }
};

// Get trending answers
export const getTrendingAnswers = async (req, res) => {
  try {
    const { days = 7, limit = 10 } = req.query;

    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - parseInt(days));

    const answers = await Answer.aggregate([
      {
        $match: {
          status: "published",
          createdAt: { $gte: dateThreshold },
        },
      },
      {
        $addFields: {
          engagementScore: {
            $add: [
              { $multiply: [{ $size: "$upvotes" }, 3] },
              { $multiply: [{ $size: "$likes" }, 2] },
              { $multiply: [{ $size: "$comments" }, 1] },
              { $multiply: ["$views", 0.1] },
            ],
          },
        },
      },
      { $sort: { engagementScore: -1 } },
      { $limit: parseInt(limit) },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },
      {
        $lookup: {
          from: "questions",
          localField: "questionId",
          foreignField: "_id",
          as: "question",
        },
      },
      { $unwind: "$question" },
      {
        $project: {
          content: 1,
          upvotes: 1,
          likes: 1,
          comments: 1,
          views: 1,
          createdAt: 1,
          engagementScore: 1,
          "author.username": 1,
          "author.profile": 1,
          "question.title": 1,
          "question._id": 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: answers,
    });
  } catch (error) {
    console.error("Error fetching trending answers:", error);
    res.status(500).json({ error: "Failed to fetch trending answers" });
  }
};

// Helper functions (implement these based on your needs)
function calculateAIAccuracy(content) {
  // Implement your AI accuracy calculation logic
  // This could involve NLP, similarity scoring, etc.
  return Math.floor(Math.random() * 100); // Placeholder
}

function analyzeSentiment(content) {
  // Implement sentiment analysis logic
  // Could use a simple keyword-based approach or external API
  const positiveWords = ["good", "great", "excellent", "helpful", "thanks"];
  const negativeWords = ["bad", "poor", "wrong", "incorrect", "useless"];

  const contentLower = content.toLowerCase();
  let positiveCount = 0;
  let negativeCount = 0;

  positiveWords.forEach((word) => {
    if (contentLower.includes(word)) positiveCount++;
  });

  negativeWords.forEach((word) => {
    if (contentLower.includes(word)) negativeCount++;
  });

  if (positiveCount > negativeCount) return "positive";
  if (negativeCount > positiveCount) return "negative";
  return "neutral";
}

export default {
  getAnswersByQuestion,
  getAnswerById,
  createAnswer,
  updateAnswer,
  deleteAnswer,
  upvoteAnswer,
  likeAnswer,
  shareAnswer,
  deleteComment,
  getUserAnswers,
  searchAnswers,
  getTrendingAnswers,
};
