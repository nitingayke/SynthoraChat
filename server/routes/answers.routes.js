import express from "express";
import {
  getAnswersByQuestion,
  getAnswerById,
  createAnswer,
  updateAnswer,
  deleteAnswer,
  upvoteAnswer,
  likeAnswer,
  shareAnswer,
  getUserAnswers,
  searchAnswers,
  getTrendingAnswers,
  addCommentToAnswer,
  deleteComment,
  getAnswerComments,
} from "../controllers/answers.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js";
import wrapAsync from "../utils/wrapAsync.js";

const router = express.Router();

// Public routes
router.get("/question/:questionId", getAnswersByQuestion);
router.get("/:id", getAnswerById);
router.get("/search", searchAnswers);
router.get("/trending", getTrendingAnswers);
router.get("/user/:userId", getUserAnswers);

// Protected routes (require authentication)
router.use(authMiddleware);

// Answer CRUD
router.post(
  "/new",
  authMiddleware,
  upload.array("media", 6),
  wrapAsync(createAnswer)
);
// In your answer.routes.js
router.put("/:id", authMiddleware, wrapAsync(updateAnswer));
router.delete("/:id", authMiddleware, wrapAsync(deleteAnswer));

// Interactions
router.post("/:id/upvote", authMiddleware, wrapAsync(upvoteAnswer));
router.post("/:id/like", authMiddleware, wrapAsync(likeAnswer));
router.post("/:id/share", authMiddleware, wrapAsync(shareAnswer));
router.get("/:id/comments", authMiddleware, wrapAsync(getAnswerComments));

// Comments
router.post("/:id/comments", authMiddleware, wrapAsync(addCommentToAnswer));
router.delete("/:id/comments/:commentId", authMiddleware, wrapAsync(deleteComment));

export default router;
