import PropTypes from "prop-types";
import { Mail, Key } from "lucide-react";
import Modal from "../../Modal";
import Input from "../components/Input";
import LoadingButton from "../components/LoadingButton";

function EmailUpdateModal({
  isOpen,
  onClose,
  user,
  loading,
  emailForm,
  setEmailForm,
  emailStep,
  emailOtp,
  handleEmailUpdate,
  resendEmailOtp,
  formatTime,
  buttonLabelForEmail
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Email Address"
    >
      <div className="space-y-4">
        {emailStep === 'enterEmail' && (
          <EmailStep1
            user={user}
            emailForm={emailForm}
            setEmailForm={setEmailForm}
          />
        )}

        {emailStep === 'verifyOtp' && (
          <EmailStep2
            emailForm={emailForm}
            setEmailForm={setEmailForm}
            emailOtp={emailOtp}
            resendEmailOtp={resendEmailOtp}
            formatTime={formatTime}
          />
        )}

        {emailStep === 'enterPassword' && (
          <EmailStep3
            emailForm={emailForm}
            setEmailForm={setEmailForm}
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
            label={buttonLabelForEmail}
            onClick={handleEmailUpdate}
            className="flex-1 px-4 py-2 text-sm rounded-lg bg-blue-600 text-white"
          />
        </div>
      </div>
    </Modal>
  );
}

// Sub-components for each step
function EmailStep1({ user, emailForm, setEmailForm }) {
  return (
    <>
      <div className="mb-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Current email: <span className="font-medium text-gray-800 dark:text-gray-200">{user?.email}</span>
        </p>
      </div>
      <Input
        label="New Email Address"
        type="email"
        value={emailForm.newEmail}
        onChange={(e) => setEmailForm({ ...emailForm, newEmail: e.target.value })}
        placeholder="Enter your new email address"
        icon={Mail}
        required
      />
      <div className="text-xs text-gray-500 dark:text-gray-400">
        A verification OTP will be sent to this email address.
      </div>
    </>
  );
}

function EmailStep2({ emailForm, setEmailForm, emailOtp, resendEmailOtp, formatTime }) {
  return (
    <>
      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          OTP sent to: <span className="font-medium">{emailForm.newEmail}</span>
        </p>
      </div>
      <Input
        label="Verification OTP"
        type="text"
        value={emailForm.otp}
        onChange={(e) => setEmailForm({ ...emailForm, otp: e.target.value })}
        placeholder="Enter 6-digit OTP"
        maxLength={6}
        required
      />
      <div className="flex justify-between items-center">
        <button
          onClick={resendEmailOtp}
          disabled={emailOtp.timer > 0}
          className={`text-sm ${emailOtp.timer > 0 ? 'text-gray-400' : 'text-blue-600 dark:text-blue-400 hover:underline'}`}
        >
          {emailOtp.timer > 0 ? `Resend OTP in ${formatTime(emailOtp.timer)}` : 'Resend OTP'}
        </button>
      </div>
    </>
  );
}

function EmailStep3({ emailForm, setEmailForm }) {
  return (
    <>
      <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <p className="text-sm text-green-800 dark:text-green-300">
          ✓ OTP verified successfully
        </p>
      </div>
      <Input
        label="Current Password"
        type="password"
        value={emailForm.currentPassword}
        onChange={(e) => setEmailForm({ ...emailForm, currentPassword: e.target.value })}
        placeholder="Enter your current password"
        icon={Key}
        required
      />
      <div className="text-xs text-gray-500 dark:text-gray-400">
        For security, please confirm your current password.
      </div>
    </>
  );
}

EmailUpdateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  emailForm: PropTypes.object.isRequired,
  setEmailForm: PropTypes.func.isRequired,
  emailStep: PropTypes.string.isRequired,
  emailOtp: PropTypes.object.isRequired,
  handleEmailUpdate: PropTypes.func.isRequired,
  resendEmailOtp: PropTypes.func.isRequired,
  formatTime: PropTypes.func.isRequired,
  buttonLabelForEmail: PropTypes.string.isRequired,
};

export default EmailUpdateModal;