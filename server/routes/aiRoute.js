import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { aiChatController, generatePostController, generateSummaryController, getAllChatSessions, getSingleChat } from "../controllers/aiController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/sessions", authMiddleware, wrapAsync(getAllChatSessions));

router.get("/chat/:threadId", authMiddleware, wrapAsync(getSingleChat));

router.post("/chat", authMiddleware, wrapAsync(aiChatController));

router.post("/question-content", authMiddleware, wrapAsync(generatePostController));

router.post("/summary", authMiddleware, wrapAsync(generateSummaryController));

export default router;