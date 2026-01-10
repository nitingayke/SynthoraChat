import express from "express";
import {
  createQuestion,
  getAllQuestions,
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

router.get("/getQuestionById", wrapAsync(getQuestionById))

router.post("/like", wrapAsync(toggleLikeQuestion))
router.post("/upvote", wrapAsync(toggleUpvoteQuestion));
router.post("/save", wrapAsync(toggleSaveQuestion));

export default router;
