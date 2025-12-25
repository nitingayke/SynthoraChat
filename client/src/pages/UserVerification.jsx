import {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import AuthContext from "../context/AuthContext";
import { useSnackbar } from "notistack";
import { verifyUserService } from "../services/auth.service";

export default function UserVerification() {

  const { loginUser, setLoginUser } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const beforeUnloadRef = useRef(null);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");

  const inputsRef = useRef([]);

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendOTP = useCallback(async () => {
    try {
      const otpValue = generateOtp();
      setGeneratedOtp(otpValue);
      setOtp(new Array(6).fill(""));
      setTimer(60);

      const emailTemplate = `
      Subject: SkillAsync Email Verification

      Hello User 👋,

      Your OTP for verifying your SkillAsync account is:

      👉 ${otpValue}

      This OTP is valid for 60 seconds.
      Please do not share it with anyone.

      Thanks,
      Team SkillAsync 🚀
    `;

      console.log("📧 DUMMY EMAIL SENT:");
      console.log(emailTemplate);

      enqueueSnackbar("OTP sent to your registered email", {
        variant: "success",
      });

      setTimer(60);
    } catch {
      enqueueSnackbar("Failed to send OTP", { variant: "error" });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    handleSendOTP();
  }, [handleSendOTP]);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "OTP will be re-sent if you refresh the page.";
    };

    beforeUnloadRef.current = handleBeforeUnload;
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const verifyOtp = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      enqueueSnackbar("Enter valid 6 digit OTP", { variant: "error" });
      return;
    }

    if (!loginUser) {
      enqueueSnackbar("User not authenticated", { variant: "error" });
      return;
    }

    if (finalOtp !== generatedOtp) {
      enqueueSnackbar("OTP mismatch", { variant: "error" });
      return;
    }

    try {
      setLoading(true);

      const res = await verifyUserService(loginUser?._id);
      if (res?.success) {

        if (beforeUnloadRef.current) {
          window.removeEventListener(
            "beforeunload",
            beforeUnloadRef.current
          );
        }

        setLoginUser(prev => ({ ...prev, isVerified: true }));
        enqueueSnackbar("Email verified successfully 🎉", {
          variant: "success",
        });
        window.location.href = "/home";
      }

    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || "Invalid OTP", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value, index) => {

    if (loading) return;

    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleReset = () => {
    if (loading) return;
    setOtp(new Array(6).fill(""));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#191919]">
      <div className="w-full max-w-md bg-white dark:bg-[#111] rounded-xl p-6 shadow-lg border border-gray-200 dark:border-[#222]">

        <h1 className="text-2xl font-bold text-center text-orange-500 dark:text-[#07C5B9]">
          SkillAsync
        </h1>

        <p className="text-center mt-2 text-gray-600 dark:text-gray-400">
          Verify your email to continue
        </p>

        <div className="flex justify-between mt-6">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              maxLength={1}
              className="w-12 h-12 text-center text-lg font-bold rounded-lg bg-gray-100 dark:bg-[#191919] focus:ring-2 outline-none focus:ring-orange-500 dark:focus:ring-[#07C5B9] text-gray-600 dark:text-white"
            />
          ))}
        </div>

        <button
          onClick={verifyOtp}
          disabled={loading}
          className="w-full mt-6 py-2 rounded-lg text-white font-semibold bg-orange-500 dark:bg-[#07C5B9] hover:opacity-80 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="text-center mt-4 text-sm flex justify-between ">
          {timer > 0 ? (
            <span className="text-gray-500">
              Resend OTP in {timer}s
            </span>
          ) : (
            <button
              onClick={handleSendOTP}
              className="text-orange-500 dark:text-[#07C5B9] font-semibold"
            >
              Resend OTP
            </button>
          )}

          <button
            onClick={handleReset}
            className="dark:text-gray-200 hover:text-orange-500 dark:hover:text-[#07C5B9] disabled:cursor-not-allowed"
            disabled={loading}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
