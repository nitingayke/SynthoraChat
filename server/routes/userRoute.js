import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { getCurrentUser, getUserProfile } from "../controllers/userController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, wrapAsync(getCurrentUser));

router.get("/profile/:identifier", wrapAsync(getUserProfile));

router.get("/profile/:userId/questions", wrapAsync({}));

router.get("/profile/:userId/answers", wrapAsync({}));

router.get("/profile/:userId/saved-questions", wrapAsync({}));

export default router;