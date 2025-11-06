import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import UIStateContext from "../../context/UIStateContext";

export default function LoginComponent() {

  const navigate = useNavigate();
  const { setLoginUser } = useContext(AuthContext);
  const { openLoginDialog, setOpenLoginDialog } = useContext(UIStateContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    setLoginUser({
      id: 1,
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      password: "password123",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Frontend developer passionate about React and Tailwind CSS",
      joinDate: "2023-01-15"
    });

    if (openLoginDialog) {
      setOpenLoginDialog(false);
    } else {
      navigate("/home");
    }
  };

  const handleGoogleLogin = () => {
    console.log("login using google")
  };

  return (
    <div className="mx-auto max-w-md w-full bg-white/20 dark:bg-[#161B22]/90 backdrop-blur-lg p-6 sm:p-8 rounded-xl shadow-xl transition-colors duration-300">
      <h2 className="text-3xl font-extrabold text-gray-100 dark:text-white mb-6 text-center">
        Login
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Email or Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#0D1117] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#0D1117] text-gray-900 dark:text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            className="absolute right-3 top-3 cursor-pointer text-gray-500 dark:text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 dark:bg-orange-500 text-white py-3 rounded-full font-bold hover:opacity-90 transition shadow-md"
        >
          Login
        </button>
      </form>

      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        <span className="px-2 text-gray-500 dark:text-gray-400">or</span>
        <hr className="flex-grow border-gray-300 dark:border-gray-600" />
      </div>

      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 py-3 rounded-full text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-[#0D1117] transition shadow-sm"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Login with Google
      </button>

      <p className="mt-4 text-center text-gray-200 dark:text-gray-400">
        Don't have an account?{" "}
        <Link to="/signup" onClick={() => setOpenLoginDialog(false)} className="text-blue-600 dark:text-orange-500 font-semibold hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
