import { useContext, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import UIStateContext from "../../context/UIStateContext";
import { useSnackbar } from "notistack";
import { loginService } from "../../services/auth.service";
import GoogleLoginButton from "../auth/GoogleLoginButton"

export default function LoginComponent() {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { setLoginUser } = useContext(AuthContext);
  const { openLoginDialog, setOpenLoginDialog } = useContext(UIStateContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      enqueueSnackbar("All fields are required", { variant: "error" });
      return;
    }

    try {
      setLoading(true);

      const res = await loginService({ identifier: email, password });

      if (res?.success) {
        const user = res?.data?.user;
        setLoginUser(user);

        if (!user?.isVerified) {
          if (openLoginDialog) setOpenLoginDialog(false);
          navigate("/user-verification");
          return;
        }

        if (openLoginDialog) setOpenLoginDialog(false);
        else navigate("/home");
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || error?.message || "Someting went wrong! please try again.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`
        w-full max-w-md rounded-xl shadow-lg border
        ${openLoginDialog
          ? "bg-white/80 dark:bg-[#0D0F10]/80 backdrop-blur-sm border-gray-200 dark:border-[#222] px-3 py-5"
          : "bg-white dark:bg-[#111] border-gray-200 dark:border-[#222] p-4 sm:p-8"
        }
      `}
    >
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
        Welcome Back
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Email or Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 p-3 rounded-lg bg-gray-100 dark:bg-[#191919] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-[#07C5B9] transition"
        />

        <div className="relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 p-3 rounded-lg bg-gray-100 dark:bg-[#191919] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-[#07C5B9] transition"
          />
          <button
            type="button"
            className="absolute right-3 top-4.5 text-gray-500 dark:text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-white bg-orange-500 hover:bg-orange-600  dark:bg-[#07C5B9] dark:hover:bg-[#05a9a4] transition disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* OR Divider */}
      <div className="flex items-center my-5">
        <hr className="flex-grow border-gray-300 dark:border-gray-700" />
        <span className="px-3 text-gray-500 dark:text-gray-400 text-sm">or continue with</span>
        <hr className="flex-grow border-gray-300 dark:border-gray-700" />
      </div>

      {!loading && <GoogleLoginButton />}

      <p className="text-center text-sm mt-5 text-gray-700 dark:text-gray-400">
        Don't have an account?{" "}
        <Link
          to="/signup"
          onClick={() => setOpenLoginDialog(false)}
          className="font-semibold text-orange-500 dark:text-[#07C5B9] hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
