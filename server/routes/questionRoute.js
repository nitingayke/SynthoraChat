import express from "express";
import { createQuestion, getAllQuestions } from "../controllers/questionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import wrapAsync from "../utils/wrapAsync.js";

const router = express.Router();

router.get("/", wrapAsync(getAllQuestions));

router.post("/new", authMiddleware, wrapAsync(createQuestion));

export default router;