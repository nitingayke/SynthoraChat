import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js";
import {
  editProfile,
  updateEmail,
  updatePassword,
} from "../controllers/profileEditController.js";

const router = express.Router();

router.put(
  "/update-profile",
  authMiddleware,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  wrapAsync(editProfile)
);

router.post("/update-email", authMiddleware, wrapAsync(updateEmail));

router.post("/update-password", authMiddleware, wrapAsync(updatePassword));

export default router;
