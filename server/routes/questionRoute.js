import express from "express";
import {
  createQuestion,
  getAllQuestions,
  getAllTopics,
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

export default router;
