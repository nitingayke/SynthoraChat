import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js";
import {
  editProfile,
  verifyEmailOtp,
  updateEmail,
  verifyPasswordOtp,
  updatePassword,
  checkEmailAvailability,
  saveOtp,
} from '../controllers/profileEditController.js';

const router = express.Router();

// Email update routes
// router.post('/send-email-otp', sendEmailOtp);
router.post('/check-email', checkEmailAvailability)
router.post('/save-otp', saveOtp)
router.post('/verify-email-otp', verifyEmailOtp);
router.post('/update-email', updateEmail);
// router.post('/resend-email-otp', resendEmailOtp);

// Password update routes
// router.post('/send-password-otp', sendPasswordOtp);
router.post('/verify-password-otp', verifyPasswordOtp);
router.post('/update-password', updatePassword);
// router.post('/resend-password-otp', resendPasswordOtp);

router.put(
  "/profile-edit",
  authMiddleware,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  wrapAsync(editProfile)
);

export default router;