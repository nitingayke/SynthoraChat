import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { getActiveUsers, getAppAnalyticsController } from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/analytics", wrapAsync(getAppAnalyticsController));

router.get("/active-users", wrapAsync(getActiveUsers));

export default router;