import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import AuthContext from "../../context/AuthContext";
import UIStateContext from "../../context/UIStateContext";
import { updatePasswordService } from "../../services/profile.service";
import { useSnackbar } from "notistack";
import { generateOtp } from "../../utils/helper";
import { sendEmailService } from "../../services/email.service";
import { Loader2, Lock, Eye, EyeOff } from "lucide-react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdatePasswordDialog() {
  const { loginUser } = useContext(AuthContext);
  const { openPasswordDialog, setOpenPasswordDialog } =
    useContext(UIStateContext);
  const { enqueueSnackbar } = useSnackbar();

  const inputsRef = useRef([]);

  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!openPasswordDialog) return;

    setStep(1);
    setOtp(new Array(6).fill(""));
    setGeneratedOtp("");
    setTimer(0);
    setNewPassword("");
    setConfirmPassword("");
    setLoading(false);
  }, [openPasswordDialog]);

  const handleSendOTP = useCallback(async () => {
    if (!loginUser?.email) {
      enqueueSnackbar("User email not found", { variant: "error" });
      return;
    }

    try {
      const otpValue = generateOtp();
      setGeneratedOtp(otpValue);
      setOtp(new Array(6).fill(""));
      setTimer(60);

      const fullName =
        `${loginUser.profile?.firstName || ""} ${loginUser.profile?.lastName || ""
          }`.trim() || "User";

      const templateParams = {
        email: loginUser.email,
        name: fullName,
        otp: otpValue,
      };

      const res = await sendEmailService(
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (res.status) {
        enqueueSnackbar("OTP sent to your email", { variant: "success" });
        inputsRef.current[0]?.focus();
      }
    } catch {
      enqueueSnackbar("Failed to send OTP", { variant: "error" });
    }
  }, [enqueueSnackbar, loginUser]);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (value, index) => {
    if (loading || !/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const verifyOtp = () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      enqueueSnackbar("Enter valid 6 digit OTP", { variant: "error" });
      return;
    }

    if (finalOtp !== generatedOtp) {
      enqueueSnackbar("OTP mismatch", { variant: "error" });
      return;
    }

    setStep(2);
  };

  const updatePassword = async () => {
    if (newPassword.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "warning",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }

    try {
      setLoading(true);

      await updatePasswordService({
        userId: loginUser._id,
        newPassword,
      });

      enqueueSnackbar("Password updated successfully 🎉", {
        variant: "success",
      });

      setOpenPasswordDialog(false);
    } catch (err) {
      enqueueSnackbar(
        err?.response?.data?.message || "Failed to update password",
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={openPasswordDialog}
      onClose={() => !loading && setOpenPasswordDialog(false)}
      TransitionComponent={Transition}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { backgroundColor: "transparent", boxShadow: "none" },
      }}
    >
      <div className="rounded-lg bg-white dark:bg-[#161616] p-6 space-y-5 border border-gray-200 dark:border-[#222]">
        <div className="flex items-center gap-1">
          <Lock className="text-orange-500 dark:text-[#07C5B9]" size={20} />
          <h2 className="text-lg font-semibold dark:text-white">
            Update Password
          </h2>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          OTP sent to
          <span className="ml-1 font-medium text-gray-800 dark:text-gray-200">
            {loginUser?.email}
          </span>
        </p>

        {step === 1 && (
          <>
            <div className="flex justify-between">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  disabled={loading}
                  maxLength={1}
                  className="w-10 h-10 text-center text-lg font-bold rounded-lg bg-gray-100 dark:bg-[#191919] focus:ring-2 outline-none focus:ring-orange-500 dark:focus:ring-[#07C5B9] dark:text-white"
                />
              ))}
            </div>

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full py-2 rounded-lg text-white bg-orange-500 dark:bg-[#07C5B9]"
            >
              Verify OTP
            </button>

            <div className="flex justify-between text-sm">
              {timer > 0 ? (
                <span className="text-gray-500">
                  Resend OTP in {timer}s
                </span>
              ) : (
                <button
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="text-orange-500 dark:text-[#07C5B9] font-semibold"
                >
                  Send OTP
                </button>
              )}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="relative flex items-center">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
                className="w-full mt-1 p-3 rounded-lg bg-white dark:bg-[#181818] dark:text-white outline-none border-2 border-gray-200 dark:border-[#222] focus:border-orange-500 dark:focus:border-[#07C5B9] disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 dark:text-gray-200"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>


            <div className="relative flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className="w-full mt-1 p-3 rounded-lg bg-white dark:bg-[#181818] dark:text-white outline-none border-2 border-gray-200 dark:border-[#222] focus:border-orange-500 dark:focus:border-[#07C5B9] disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 dark:text-gray-200"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            <button
              disabled={loading}
              onClick={updatePassword}
              className="w-full flex items-center justify-center gap-1 py-2 rounded-lg text-white bg-orange-500 dark:bg-[#07C5B9]"
            >
              {loading && <Loader2 className="animate-spin" size={20} />}
              {loading ? "Updating..." : "Update Password"}
            </button>
          </>
        )}
      </div>
    </Dialog>
  );
}
