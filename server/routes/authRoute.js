import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { googleLogin, userLogin, userSignup, verifyUser } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", wrapAsync(userSignup));

router.post("/login", wrapAsync(userLogin));

router.post("/google", wrapAsync(googleLogin));

router.post("/verify-user", authMiddleware, wrapAsync(verifyUser));

export default router;