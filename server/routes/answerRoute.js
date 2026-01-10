import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js";
import wrapAsync from "../utils/wrapAsync.js";
import { createAnswer } from "../controllers/answerController.js";

const router = express.Router();

router.post(
  "/new",
  authMiddleware,
  upload.array("media", 6),
  wrapAsync(createAnswer)
);

export default router;
