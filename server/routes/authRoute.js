import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { getUserProfile, userLogin, userSignup } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", wrapAsync(userLogin));

router.post("/signup", wrapAsync(userSignup));

router.post("/user-profile", authMiddleware, wrapAsync(getUserProfile));

export default router;