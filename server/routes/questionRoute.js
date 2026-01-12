import express from "express";
import {
  createQuestion,
  getAllQuestions,
  getAllTopics,
  getAnswersByQuestionId,
  getQuestionById,
  toggleLikeQuestion,
  toggleSaveQuestion,
  toggleUpvoteQuestion,
} from "../controllers/questionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import wrapAsync from "../utils/wrapAsync.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.get("/", wrapAsync(getAllQuestions));

router.post(
  "/new",
  authMiddleware,
  upload.array("media", 10),
  wrapAsync(createQuestion)
);

router.get("/topics", wrapAsync(getAllTopics));

router.get("/:questionId", wrapAsync(getQuestionById));

router.get("/:questionId/answers", wrapAsync(getAnswersByQuestionId));

router.post("/:questionId/likes", authMiddleware, wrapAsync(toggleLikeQuestion));

router.post("/:questionId/upvotes", authMiddleware, wrapAsync(toggleUpvoteQuestion));

router.post("/:questionId/saves", authMiddleware, wrapAsync(toggleSaveQuestion));

export default router;
