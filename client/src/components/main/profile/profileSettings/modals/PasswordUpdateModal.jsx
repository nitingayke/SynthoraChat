import PropTypes from "prop-types";
import { Mail, Key, Clock, Eye, EyeOff } from "lucide-react";
import Modal from "../../Modal";
import Input from "../components/Input";
import LoadingButton from "../components/LoadingButton";

function PasswordUpdateModal({
  isOpen,
  onClose,
  loading,
  passwordForm,
  setPasswordForm,
  passwordStep,
  passwordOtp,
  handlePasswordUpdate,
  resendPasswordOtp,
  formatTime,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  buttonLabelForPassword
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Password"
    >
      <div className="space-y-4">
        {passwordStep === 'enterEmail' && (
          <PasswordStep1
            passwordForm={passwordForm}
            setPasswordForm={setPasswordForm}
          />
        )}

        {passwordStep === 'verifyOtp' && (
          <PasswordStep2
            passwordForm={passwordForm}
            setPasswordForm={setPasswordForm}
            passwordOtp={passwordOtp}
            resendPasswordOtp={resendPasswordOtp}
            formatTime={formatTime}
          />
        )}

        {passwordStep === 'enterPassword' && (
          <PasswordStep3
            passwordForm={passwordForm}
            setPasswordForm={setPasswordForm}
            showNewPassword={showNewPassword}
            setShowNewPassword={setShowNewPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
        )}

        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <LoadingButton
            loading={loading}
            label={buttonLabelForPassword}
            onClick={handlePasswordUpdate}
            className="flex-1 px-4 py-2 text-sm rounded-lg bg-blue-600 text-white"
          />
        </div>
      </div>
    </Modal>
  );
}

// Sub-components
function PasswordStep1({ passwordForm, setPasswordForm }) {
  return (
    <>
      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          We'll send a verification OTP to your registered email address.
        </p>
      </div>
      <Input
        label="Registered Email"
        type="email"
        value={passwordForm.email}
        onChange={(e) => setPasswordForm({ ...passwordForm, email: e.target.value })}
        placeholder="Enter your registered email"
        icon={Mail}
        required
      />
    </>
  );
}

function PasswordStep2({ passwordForm, setPasswordForm, passwordOtp, resendPasswordOtp, formatTime }) {
  return (
    <>
      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          OTP sent to: <span className="font-medium">{passwordForm.email}</span>
        </p>
      </div>
      <Input
        label="Verification OTP"
        type="text"
        value={passwordForm.otp}
        onChange={(e) => setPasswordForm({ ...passwordForm, otp: e.target.value })}
        placeholder="Enter 6-digit OTP"
        maxLength={6}
        required
      />
      <div className="flex justify-between items-center">
        <button
          onClick={resendPasswordOtp}
          disabled={passwordOtp.timer > 0}
          className={`text-sm ${passwordOtp.timer > 0 ? 'text-gray-400' : 'text-blue-600 dark:text-blue-400 hover:underline'}`}
        >
          {passwordOtp.timer > 0 ? `Resend OTP in ${formatTime(passwordOtp.timer)}` : 'Resend OTP'}
        </button>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          {formatTime(passwordOtp.timer)}
        </div>
      </div>
    </>
  );
}

function PasswordStep3({
  passwordForm,
  setPasswordForm,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword
}) {
  return (
    <>
      <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <p className="text-sm text-green-800 dark:text-green-300">
          ✓ OTP verified successfully
        </p>
      </div>
      <div className="space-y-3">
        <div className="relative">
          <Input
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
            placeholder="Enter new password"
            icon={Key}
            required
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 dark:text-gray-400"
          >
            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="relative">
          <Input
            label="Confirm New Password"
            type={showConfirmPassword ? "text" : "password"}
            value={passwordForm.confirmPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
            placeholder="Confirm new password"
            icon={Key}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 dark:text-gray-400"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>✓ Password must be at least 6 characters</p>
          <p>✓ Use a combination of letters, numbers, and symbols</p>
        </div>
      </div>
    </>
  );
}

PasswordUpdateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  passwordForm: PropTypes.object.isRequired,
  setPasswordForm: PropTypes.func.isRequired,
  passwordStep: PropTypes.string.isRequired,
  passwordOtp: PropTypes.object.isRequired,
  handlePasswordUpdate: PropTypes.func.isRequired,
  resendPasswordOtp: PropTypes.func.isRequired,
  formatTime: PropTypes.func.isRequired,
  showNewPassword: PropTypes.bool.isRequired,
  setShowNewPassword: PropTypes.func.isRequired,
  showConfirmPassword: PropTypes.bool.isRequired,
  setShowConfirmPassword: PropTypes.func.isRequired,
  buttonLabelForPassword: PropTypes.string.isRequired,
};

export default PasswordUpdateModal;