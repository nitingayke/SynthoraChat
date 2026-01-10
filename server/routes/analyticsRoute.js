import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { getAppAnalyticsController } from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/analytics", wrapAsync(getAppAnalyticsController));

export default router;