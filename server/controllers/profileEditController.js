import httpStatus from "http-status";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const editProfile = async (req, res) => {
  const { userId, editData } = req.body;

  if (!userId || !editData) {
    return res.status(400).json({
      success: false,
      message: "Missing required data",
    });
  }

  // editData comes as string from FormData
  const parsedEditData = JSON.parse(editData);

  /**
   * Build update object STRICTLY according to schema
   */
  const updateObject = {
    "profile.firstName": parsedEditData.firstName || "",
    "profile.lastName": parsedEditData.lastName || "",
    "profile.bio": parsedEditData.bio || "",
    "profile.location": parsedEditData.location || "",
    "profile.website": parsedEditData.website || "",
    credentials: parsedEditData.credentials || [],
    topicsOfInterest: parsedEditData.topicsOfInterest || [],
    knowsAbout: parsedEditData.knowsAbout || [],
  };

  // Handle uploaded images (Cloudinary URLs from multer)
  if (req.files?.avatar?.[0]?.path) {
    updateObject["profile.profilePicture"] = req.files.avatar[0].path;
  }

  if (req.files?.cover?.[0]?.path) {
    updateObject["profile.coverPicture"] = req.files.cover[0].path;
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updateObject },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    newUser: updatedUser,
  });
};

// Store OTPs (use Redis in production)
const otpStore = new Map();

// Check email availability
export const checkEmailAvailability = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User Already Exists",
        existingUser,
      });
    }

    res.status(200).json({
      success: true,
      message: "User not registered before.",
    });
  } catch (error) {
    console.error("Error checking email availability:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Save OTP
export const saveOtp = async (req, res) => {
  try {
    const { userId, email, otp, type } = req.body;

    const key = `${type}:${userId}:${email}`;
    const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore.set(key, { otp, expiry, verified: false });

    res.status(200).json({
      success: true,
      message: "OTP saved",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save OTP",
    });
  }
};

// Verify email OTP
export const verifyEmailOtp = async (req, res) => {
  try {
    const { userId, newEmail, otp } = req.body;

    const key = `email_update:${userId}:${newEmail}`;
    const storedData = otpStore.get(key);

    if (!storedData) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found",
      });
    }

    if (storedData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (Date.now() > storedData.expiry) {
      otpStore.delete(key);
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // Mark OTP as verified
    storedData.verified = true;
    otpStore.set(key, storedData);

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Error verifying password OTP:", error);
    res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
};

// Update email
export const updateEmail = async (req, res) => {
  try {
    const { userId, newEmail, currentPassword, otp } = req.body;
    console.log(userId);

    // Verify OTP
    const key = `email_update:${userId}:${newEmail}`;
    const storedData = otpStore.get(key);

    if (!storedData?.verified || storedData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "OTP not verified",
      });
    }

    // Get user and verify current password
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Update email
    user.email = newEmail;
    user.isVerified = false; // Require re-verification
    await user.save();

    // Clear OTP
    otpStore.delete(key);

    res.status(200).json({
      success: true,
      message: "Email updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update email",
    });
  }
};

// Verify password OTP
export const verifyPasswordOtp = async (req, res) => {
  try {
    const { userId, email, otp } = req.body;

    const key = `password_reset:${userId}:${email}`;
    const storedData = otpStore.get(key);

    if (!storedData) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found",
      });
    }

    if (storedData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (Date.now() > storedData.expiry) {
      otpStore.delete(key);
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // Mark OTP as verified
    storedData.verified = true;
    otpStore.set(key, storedData);

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
};

// Update password
export const updatePassword = async (req, res) => {
  try {
    const { userId, newPassword, otp } = req.body;

    if(!userId || !newPassword || !otp) {
      return res.status(404).json({
        success : false,
        message : "Missing request body fields."
      })
    }

    // Verify OTP
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const key = `password_reset:${userId}:${user.email}`;
    const storedData = otpStore.get(key);

    if (!storedData?.verified || storedData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "OTP not verified",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    // Clear OTP
    otpStore.delete(key);

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update password",
    });
  }
};
