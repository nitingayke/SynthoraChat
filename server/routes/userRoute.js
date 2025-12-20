import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { getUserProfile } from "../controllers/userController.js"

const router = express.Router();

router.get("/profile/:identifier", wrapAsync(getUserProfile));

export default router;