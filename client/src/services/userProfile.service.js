import { useState, useEffect } from "react";
import api from "../api/api";
import emailjs from "@emailjs/browser";

export function useOtpTimer(initial = 0) {
  const [timer, setTimer] = useState(initial);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  return { timer, setTimer };
}

export const updateUserProfile = async (
  form,
  avatarPreview,
  coverPreview,
  userId
) => {
  const formData = new FormData();

  formData.append("userId", userId);
  formData.append("editData", JSON.stringify(form));

  if (avatarPreview) {
    formData.append("avatar", avatarPreview);
  }

  if (coverPreview) {
    formData.append("cover", coverPreview);
  }

  const res = await api.put("/user-profile/profile-edit", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log(res.data);

  return res.data;
};

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Send OTP via EmailJS
export const sendEmailJsOtp = async (email, templateParams) => {
  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    return response.status === 200;
  } catch (error) {
    console.error("EmailJS error:", error);
    return false;
  }
};

// Generate a 6-digit OTP
export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Validate email format
export const validateEmail = (email) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

// Check if email is same as current
export const isSameEmail = (newEmail, currentEmail) => {
  return newEmail === currentEmail;
};

// Format timer seconds to MM:SS
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// Email update related functions
export const emailUpdateService = {
  // Step 1: Check email availability and send OTP
  checkAndSendEmailOtp: async (userId, newEmail, userData) => {
    try {
      // Check if email exists via API
      const checkRes = await api.post(
        "/user-profile/check-email",
        { email: newEmail },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (checkRes.success) {
        return {
          success: false,
          message: "Email already in use",
        };
      }

      // Generate OTP
      const otp = generateOtp();

      // Prepare template parameters
      const templateParams = {
        email: newEmail,
        name: `${userData.profile?.firstName || "User"}`,
        otp: otp,
        user_name: `${userData.profile?.firstName || ""} ${
          userData.profile?.lastName || ""
        }`.trim(),
        purpose: "email verification",
      };

      // Send OTP via EmailJS
      const emailSent = await sendEmailJsOtp(newEmail, templateParams);

      if (emailSent) {
        // Save OTP to backend
        const saveOtpRes = await api.post(
          "/user-profile/save-otp",
          {
            userId,
            email: newEmail,
            otp,
            type: "email_update",
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (saveOtpRes?.data?.success) {
          return {
            success: true,
            otp,
            message: "OTP sent to your new email address",
          };
        } else {
          return {
            success: false,
            message: "Failed to save OTP",
          };
        }
      } else {
        return {
          success: false,
          message: "Failed to send OTP email",
        };
      }
    } catch (error) {
      console.error("Error in checkAndSendEmailOtp:", error);
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  },

  // Step 2: Verify email OTP
  verifyEmailOtp: async (userId, newEmail, otp) => {
    try {
      const res = await api.post(
        "/user-profile/verify-email-otp",
        {
          userId,
          newEmail,
          otp,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(res);

      const data = await res.data;
      return data;
    } catch (error) {
      console.error("Error in verifyEmailOtp:", error);
      return {
        success: false,
        message: "Verification failed",
      };
    }
  },

  // Step 3: Update email
  updateEmail: async (userId, newEmail, currentPassword, otp) => {
    try {
      const res = await api.post(
        "/user-profile/update-email",
        {
          userId,
          newEmail,
          currentPassword,
          otp,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.data;
      return data;
    } catch (error) {
      console.error("Error in updateEmail:", error);
      return {
        success: false,
        message: "Failed to update email",
      };
    }
  },

  // Resend email OTP
  resendEmailOtp: async (userId, newEmail, userData) => {
    try {
      const otp = generateOtp();

      const templateParams = {
        to_email: newEmail,
        to_name: `${userData.profile?.firstName || "User"}`,
        otp_code: otp,
        user_name: `${userData.profile?.firstName || ""} ${
          userData.profile?.lastName || ""
        }`.trim(),
        purpose: "email verification",
      };

      const emailSent = await sendEmailJsOtp(
        newEmail,
        "email_verification",
        templateParams
      );

      if (emailSent) {
        // Save new OTP to backend
        const saveOtpRes = await fetch("/api/user/save-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            email: newEmail,
            otp,
            type: "email_update",
          }),
        });

        if (saveOtpRes.ok) {
          return {
            success: true,
            message: "New OTP sent to your email",
          };
        }
      }

      return {
        success: false,
        message: "Failed to resend OTP",
      };
    } catch (error) {
      console.error("Error in resendEmailOtp:", error);
      return {
        success: false,
        message: "Failed to resend OTP",
      };
    }
  },

  // Send email update confirmation
  sendEmailUpdateConfirmation: async (newEmail, userData, oldEmail) => {
    try {
      const confirmParams = {
        to_email: newEmail,
        to_name: `${userData.profile?.firstName || "User"}`,
        user_name: `${userData.profile?.firstName || ""} ${
          userData.profile?.lastName || ""
        }`.trim(),
        old_email: oldEmail,
        date: new Date().toLocaleDateString(),
      };

      await sendEmailJsOtp(
        newEmail,
        "email_update_confirmation",
        confirmParams
      );

      return { success: true };
    } catch (error) {
      console.error("Error sending confirmation email:", error);
      return { success: false };
    }
  },
};

// Password update related functions
export const passwordUpdateService = {
  // Step 1: Send password reset OTP
  sendPasswordOtp: async (userId, userData) => {
    try {
      const otp = generateOtp();

      const templateParams = {
        email: userData.email,
        name: `${userData.profile?.firstName || "User"}`,
        otp: otp,
        user_name: `${userData.profile?.firstName || ""} ${
          userData.profile?.lastName || ""
        }`.trim(),
        purpose: "password reset",
      };

      const emailSent = await sendEmailJsOtp(userData.email, templateParams);

      if (emailSent) {
        // Save OTP to backend
        const saveOtpRes = await api.post(
          "/user-profile/save-otp",
          {
            userId,
            email: userData.email,
            otp,
            type: "password_reset",
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (saveOtpRes?.data?.success) {
          return {
            success: true,
            otp,
            message: "OTP sent to your registered email",
          };
        } else {
          return {
            success: false,
            message: "Failed to save OTP",
          };
        }
      } else {
        return {
          success: false,
          message: "Failed to send OTP email",
        };
      }
    } catch (error) {
      console.error("Error in sendPasswordOtp:", error);
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  },

  // Step 2: Verify password OTP
  verifyPasswordOtp: async (userId, email, otp) => {
    try {
      const res = await api.post(
        "/user-profile/verify-password-otp",
        {
          userId,
          email,
          otp,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.data;
      return data;
    } catch (error) {
      console.error("Error in verifyPasswordOtp:", error);
      return {
        success: false,
        message: "Verification failed",
      };
    }
  },

  // Step 3: Update password
  updatePassword: async (userId, newPassword, otp) => {
    try {
      const res = await api.post("/user-profile/update-password",{
          userId,
          newPassword,
          otp,
        }, {
        headers: { "Content-Type": "application/json" }
      });

      const data = await res.data;
      return data;
    } catch (error) {
      console.error("Error in updatePassword:", error);
      return {
        success: false,
        message: "Failed to update password",
      };
    }
  },

  // Resend password OTP
  resendPasswordOtp: async (userId, userData) => {
    try {
      const otp = generateOtp();

      const templateParams = {
        to_email: userData.email,
        to_name: `${userData.profile?.firstName || "User"}`,
        otp_code: otp,
        user_name: `${userData.profile?.firstName || ""} ${
          userData.profile?.lastName || ""
        }`.trim(),
        purpose: "password reset",
      };

      const emailSent = await sendEmailJsOtp(
        userData.email,
        "password_reset",
        templateParams
      );

      if (emailSent) {
        // Save new OTP to backend
        const saveOtpRes = await fetch("/api/user/save-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            email: userData.email,
            otp,
            type: "password_reset",
          }),
        });

        if (saveOtpRes.ok) {
          return {
            success: true,
            message: "New OTP sent to your email",
          };
        }
      }

      return {
        success: false,
        message: "Failed to resend OTP",
      };
    } catch (error) {
      console.error("Error in resendPasswordOtp:", error);
      return {
        success: false,
        message: "Failed to resend OTP",
      };
    }
  },

  // Send password change confirmation
  sendPasswordChangeConfirmation: async (userData) => {
    try {
      const confirmParams = {
        to_email: userData.email,
        to_name: `${userData.profile?.firstName || "User"}`,
        user_name: `${userData.profile?.firstName || ""} ${
          userData.profile?.lastName || ""
        }`.trim(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      };

      await sendEmailJsOtp(
        userData.email,
        "password_change_confirmation",
        confirmParams
      );

      return { success: true };
    } catch (error) {
      console.error("Error sending confirmation email:", error);
      return { success: false };
    }
  },

  // Validate password requirements
  validatePassword: (password, confirmPassword) => {
    if (!password || password.length < 6) {
      return {
        isValid: false,
        message: "Password must be at least 6 characters",
      };
    }

    if (password !== confirmPassword) {
      return {
        isValid: false,
        message: "Passwords do not match",
      };
    }

    return {
      isValid: true,
      message: "Password is valid",
    };
  },
};

// Profile image upload service
export const profileImageService = {
  // Prepare form data for profile update
  prepareProfileFormData: (form, avatarFile, coverFile, userId) => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("editData", JSON.stringify(form));

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    if (coverFile) {
      formData.append("cover", coverFile);
    }

    return formData;
  },

  // Validate profile inputs
  validateProfileInputs: (form) => {
    const {
      firstName,
      lastName,
      bio,
      location,
      website,
      credentials,
      knowsAbout,
    } = form;
    return (
      !!firstName &&
      !!lastName &&
      !!bio &&
      !!location &&
      !!website &&
      !!credentials &&
      !!knowsAbout
    );
  },
};

// Utility function for making API calls
export const apiService = {
  callApi: async (url, method = "GET", body = null, headers = {}) => {
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `API call failed with status ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`API call error for ${url}:`, error);
      throw error;
    }
  },

  // For form data (file uploads)
  callApiWithFormData: async (url, method = "POST", formData) => {
    try {
      const options = {
        method,
        body: formData,
        // Don't set Content-Type header for FormData
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `API call failed with status ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`API call error for ${url}:`, error);
      throw error;
    }
  },
};
