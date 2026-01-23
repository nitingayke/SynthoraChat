import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { followUser, getCurrentUser, getSavedQuestions, getUserAnswers, getUserProfile, getUserQuestions, unfollowUser } from "../controllers/userController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, wrapAsync(getCurrentUser));

router.get("/profile/:identifier", wrapAsync(getUserProfile));

router.get("/profile/:userId/questions", wrapAsync(getUserQuestions));

router.get("/profile/:userId/answers", wrapAsync(getUserAnswers));

router.get("/profile/:userId/saved-questions", wrapAsync(getSavedQuestions));

router.post("/follow/:userId", authMiddleware, wrapAsync(followUser));

router.delete("/unfollow/:userId", authMiddleware, wrapAsync(unfollowUser));

export default router;