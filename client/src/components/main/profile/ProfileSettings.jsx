import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import {
  updateUserProfile,
  validateEmail,
  isSameEmail,
  emailUpdateService,
  passwordUpdateService,
  useOtpTimer,
} from "../../../services/userProfile.service";

// Import extracted components
import EmailUpdateModal from "./profileSettings/modals/EmailUpdateModal";
import PasswordUpdateModal from "./profileSettings/modals/PasswordUpdateModal";
import ProfileMediaSection from "./profileSettings/sections/ProfileMediaSection";
import BasicInfoSection from "./profileSettings/sections/BasicInfoSection";
import ProfessionalDetailsSection from "./profileSettings/sections/ProfessionalDetailsSection";
import NotificationsSection from "./profileSettings/sections/NotificationsSection";
import PrivacySecuritySection from "./profileSettings/sections/PrivacySecuritySection";
import DangerZoneSection from "./profileSettings/sections/DangerZoneSection";

export default function ProfileSettings({ user }) {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Email update states
  const [emailForm, setEmailForm] = useState({
    newEmail: '',
    otp: '',
    currentPassword: ''
  });
  const [emailStep, setEmailStep] = useState('enterEmail');
  const [emailOtpSent, setEmailOtpSent] = useState(false);

  // Password update states
  const [passwordForm, setPasswordForm] = useState({
    email: user?.email || '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordStep, setPasswordStep] = useState('enterEmail');
  const [passwordOtpSent, setPasswordOtpSent] = useState(false);

  const emailOtp = useOtpTimer();
  const passwordOtp = useOtpTimer();

  // Show/hide password
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form state
  const [form, setForm] = useState({
    firstName: user?.profile?.firstName || "",
    lastName: user?.profile?.lastName || "",
    bio: user?.profile?.bio || "",
    location: user?.profile?.location || "",
    website: user?.profile?.website || "",
    credentials: user?.credentials || [],
    knowsAbout: user?.knowsAbout || [],
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.profile?.profilePicture);
  const [coverPreview, setCoverPreview] = useState(user?.profile?.coverPicture);

  // Event Handlers
  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    if (type === "avatar") {
      setAvatarPreview(url);
      setAvatarFile(file);
    } else {
      setCoverPreview(url);
      setCoverFile(file);
    }
  };

  const validateInputs = () => {
    const { firstName, lastName, bio, location, website, credentials, knowsAbout } = form;
    return (
      !!firstName &&
      !!lastName &&
      !!bio &&
      !!location &&
      !!website &&
      !!credentials &&
      !!knowsAbout
    );
  };

  const handleSave = async () => {
    if (!validateInputs()) {
      enqueueSnackbar("Please fill out all required fields", { variant: "warning" });
      return;
    }

    try {
      setLoading(true);
      const res = await updateUserProfile(
        form,
        avatarFile,
        coverFile,
        user?._id
      );

      if (res?.success) {
        enqueueSnackbar("Profile edited successfully", { variant: "success" });
        setAvatarFile(null);
        setCoverFile(null);
      } else {
        enqueueSnackbar("Update failed", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || "Something went wrong.",
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmailOtp = async () => {
    if (!emailForm.newEmail || !validateEmail(emailForm.newEmail)) {
      enqueueSnackbar("Please enter a valid email address", { variant: "error" });
      return;
    }

    if (isSameEmail(emailForm.newEmail, user.email)) {
      enqueueSnackbar("New email cannot be same as current email", {
        variant: "warning",
      });
      return;
    }

    const result = await emailUpdateService.checkAndSendEmailOtp(
      user._id,
      emailForm.newEmail,
      user
    );

    if (!result.success) {
      enqueueSnackbar(result.message, { variant: "error" });
      return;
    }

    emailOtp.setTimer(300);
    setEmailStep("verifyOtp");
    enqueueSnackbar(result.message, { variant: "success" });
  };

  const handleVerifyEmailOtp = async () => {
    if (!emailForm?.otp || emailForm?.otp.length !== 6) {
      enqueueSnackbar("Please enter the 6-digit OTP", { variant: "error" });
      return;
    }

    const result = await emailUpdateService.verifyEmailOtp(
      user._id,
      emailForm.newEmail,
      emailForm.otp
    );

    if (!result.success) {
      enqueueSnackbar(result.message, { variant: "error" });
      return;
    }

    setEmailStep("enterPassword");
    enqueueSnackbar(
      "OTP verified! Please enter your current password",
      { variant: "success" }
    );
  };

  const handleConfirmEmailPassword = async () => {
    if (!emailForm.currentPassword) {
      enqueueSnackbar("Please enter your current password", {
        variant: "error",
      });
      return;
    }

    const result = await emailUpdateService.updateEmail(
      user._id,
      emailForm.newEmail,
      emailForm.currentPassword,
      emailForm.otp
    );

    if (!result.success) {
      enqueueSnackbar(result.message, { variant: "error" });
      return;
    }

    await emailUpdateService.sendEmailUpdateConfirmation(
      emailForm.newEmail,
      user,
      user.email
    );

    enqueueSnackbar(
      "Email updated successfully! Please verify your new email.",
      { variant: "success" }
    );

    setIsUpdatingEmail(false);
    resetEmailForm();
  };

  const emailStepHandlers = {
    enterEmail: handleSendEmailOtp,
    verifyOtp: handleVerifyEmailOtp,
    enterPassword: handleConfirmEmailPassword,
  };

  const handleEmailUpdate = async () => {
    try {
      setLoading(true);
      await emailStepHandlers[emailStep]?.();
    } catch (error) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendPasswordOtp = async () => {
    const result = await passwordUpdateService.sendPasswordOtp(user._id, user);

    if (!result.success) {
      enqueueSnackbar(result.message, { variant: "error" });
      return;
    }

    passwordOtp.setTimer(300);
    setPasswordStep("verifyOtp");
    enqueueSnackbar(result.message, { variant: "success" });
  };

  const handleVerifyPasswordOtp = async () => {
    if (!passwordForm?.otp || passwordForm?.otp.length !== 6) {
      enqueueSnackbar("Please enter the 6-digit OTP", { variant: "error" });
      return;
    }

    const result = await passwordUpdateService.verifyPasswordOtp(
      user._id,
      user.email,
      passwordForm.otp
    );

    if (!result.success) {
      enqueueSnackbar(result.message, { variant: "error" });
      return;
    }

    setPasswordStep("enterPassword");
    enqueueSnackbar(
      "OTP verified! Please enter your new password",
      { variant: "success" }
    );
  };

  const handleUpdatePassword = async () => {
    const validationResult = passwordUpdateService.validatePassword(
      passwordForm.newPassword,
      passwordForm.confirmPassword
    );

    if (!validationResult.isValid) {
      enqueueSnackbar(validationResult.message, { variant: "error" });
      return;
    }

    const result = await passwordUpdateService.updatePassword(
      user._id,
      passwordForm.newPassword,
      passwordForm.otp
    );

    if (!result.success) {
      enqueueSnackbar(result.message, { variant: "error" });
      return;
    }

    await passwordUpdateService.sendPasswordChangeConfirmation(user);

    enqueueSnackbar("Password updated successfully!", { variant: "success" });
    setIsUpdatingPassword(false);
    resetPasswordForm();
  };

  const passwordStepHandlers = {
    enterEmail: handleSendPasswordOtp,
    verifyOtp: handleVerifyPasswordOtp,
    enterPassword: handleUpdatePassword,
  };


  const handlePasswordUpdate = async () => {
    try {
      setLoading(true);
      await passwordStepHandlers[passwordStep]?.();
    } catch (error) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  // Resend OTP handlers
  const resendEmailOtp = async () => {
    if (emailOtp.timer > 0) return;

    try {
      setLoading(true);
      const result = await emailUpdateService.resendEmailOtp(
        user._id,
        emailForm.newEmail,
        user
      );

      if (result.success) {
        emailOtp.setTimer(300);
        enqueueSnackbar(result.message, { variant: "success" });
      } else {
        enqueueSnackbar(result.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Failed to resend OTP", { variant: "error" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resendPasswordOtp = async () => {
    if (passwordOtp.timer > 0) return;

    try {
      setLoading(true);
      const result = await passwordUpdateService.resendPasswordOtp(user._id, user);

      if (result.success) {
        passwordOtp.setTimer(300);
        enqueueSnackbar(result.message, { variant: "success" });
      } else {
        enqueueSnackbar(result.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Failed to resend OTP", { variant: "error" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Reset form functions
  const resetEmailForm = () => {
    setEmailForm({
      newEmail: '',
      otp: '',
      currentPassword: ''
    });
    setEmailStep('enterEmail');
    setEmailOtpSent(false);
    emailOtp.setTimer(0);
  };

  const resetPasswordForm = () => {
    setPasswordForm({
      email: user?.email || '',
      otp: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordStep('enterEmail');
    setPasswordOtpSent(false);
    passwordOtp.setTimer(0);
  };

  const handleModalClose = (type) => {
    if (type === 'email') {
      setIsUpdatingEmail(false);
      resetEmailForm();
    } else {
      setIsUpdatingPassword(false);
      resetPasswordForm();
    }
  };

  // Helper functions
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getEmailButtonLabel = () => {
    if (emailStep === "enterEmail") return "Send OTP";
    if (emailStep === "verifyOtp") return "Verify OTP";
    return "Update Email";
  };

  const getPasswordButtonLabel = () => {
    if (passwordStep === "enterEmail") return "Send OTP";
    if (passwordStep === "verifyOtp") return "Verify OTP";
    return "Update Password";
  };

  return (
    <div id="profile_settings" className="max-w-5xl mx-auto space-y-4 mt-4 md:mt-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Profile Settings
        </h1>
        <p className="text-sm text-gray-500">
          Update your personal and professional details
        </p>
      </div>

      {/* Profile Media Section */}
      <ProfileMediaSection
        coverPreview={coverPreview}
        avatarPreview={avatarPreview}
        handleImageChange={handleImageChange}
      />

      {/* Basic Information Section */}
      <BasicInfoSection form={form} setForm={setForm} />

      {/* Professional Details Section */}
      <ProfessionalDetailsSection form={form} setForm={setForm} />

      {/* Notifications Section */}
      <NotificationsSection />

      {/* Privacy & Security Section */}
      <PrivacySecuritySection
        setIsUpdatingEmail={setIsUpdatingEmail}
        setIsUpdatingPassword={setIsUpdatingPassword}
      />

      {/* Email Update Modal */}
      <EmailUpdateModal
        isOpen={isUpdatingEmail}
        onClose={() => handleModalClose('email')}
        user={user}
        loading={loading}
        emailForm={emailForm}
        setEmailForm={setEmailForm}
        emailStep={emailStep}
        emailOtp={emailOtp}
        handleEmailUpdate={handleEmailUpdate}
        resendEmailOtp={resendEmailOtp}
        formatTime={formatTime}
        buttonLabelForEmail={getEmailButtonLabel()}
      />

      {/* Password Update Modal */}
      <PasswordUpdateModal
        isOpen={isUpdatingPassword}
        onClose={() => handleModalClose('password')}
        user={user}
        loading={loading}
        passwordForm={passwordForm}
        setPasswordForm={setPasswordForm}
        passwordStep={passwordStep}
        passwordOtp={passwordOtp}
        handlePasswordUpdate={handlePasswordUpdate}
        resendPasswordOtp={resendPasswordOtp}
        formatTime={formatTime}
        showNewPassword={showNewPassword}
        setShowNewPassword={setShowNewPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        buttonLabelForPassword={getPasswordButtonLabel()}
      />

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-orange-500 dark:bg-[#07C5B9] text-white font-medium hover:opacity-80 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Danger Zone Section */}
      <DangerZoneSection />
    </div>
  );
}

ProfileSettings.propTypes = {
  user: PropTypes.object.isRequired,
};