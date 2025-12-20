import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { userLogin, userSignup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", wrapAsync(userSignup));

router.post("/login", wrapAsync(userLogin));

export default router;