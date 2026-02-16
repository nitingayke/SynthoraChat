import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { aiChatController, getAllChatSessions, getSingleChat } from "../controllers/aiController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/sessions", authMiddleware, wrapAsync(getAllChatSessions));

router.get("/chat/:threadId", authMiddleware, wrapAsync(getSingleChat));

router.post("/chat", authMiddleware, wrapAsync(aiChatController));

export default router;