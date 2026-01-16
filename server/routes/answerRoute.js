import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js";
import wrapAsync from "../utils/wrapAsync.js";
import { addAnswerComment, createAnswer, deleteAnswer, deleteAnswerComment, editAnswer, toggleLikeAnswer, toggleUpvoteAnswer, toggleUpvoteComment } from "../controllers/answerController.js";

const router = express.Router();

router.post(
  "/new",
  authMiddleware,
  upload.array("media", 6),
  wrapAsync(createAnswer)
);

router.put("/:answerId", authMiddleware, wrapAsync(editAnswer));

router.delete("/:answerId", authMiddleware, wrapAsync(deleteAnswer));

router.post("/:answerId/likes", authMiddleware, wrapAsync(toggleLikeAnswer));

router.post("/:answerId/upvotes", authMiddleware, wrapAsync(toggleUpvoteAnswer));

router.post("/:answerId/add-comments", authMiddleware, wrapAsync(addAnswerComment));

router.post("/:answerId/comments/:commentId/upvotes", authMiddleware, wrapAsync(toggleUpvoteComment));

router.delete("/:answerId/comments/:commentId", authMiddleware, wrapAsync(deleteAnswerComment));

export default router;
