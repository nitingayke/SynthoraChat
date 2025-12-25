import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { useSnackbar } from "notistack";
import { signupService } from "../services/auth.service";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";

export default function Signup() {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { setLoginUser } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const { username, email, password } = formData;

        formData.username = username.trim();
        formData.email = email.trim();
        formData.password = password.trim();

        if (!username || !email || !password) {
            enqueueSnackbar("All fields are required", { variant: "error" });
            return false;
        }

        if (!/^[a-zA-Z0-9_]{1,}$/.test(username)) {
            enqueueSnackbar(
                "Username must be at least 1 characters (letters, numbers, underscore)",
                { variant: "error" }
            );
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            enqueueSnackbar("Please enter a valid email address", {
                variant: "error",
            });
            return false;
        }

        if (password.length < 6) {
            enqueueSnackbar("Password must be at least 6 characters", {
                variant: "error",
            });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setLoading(true);

            const res = await signupService(formData);

            if (res?.success) {
                setLoginUser(res.data.user);
                enqueueSnackbar("Account created successfully 🎉", {
                    variant: "success",
                });
                navigate("/user-verification");
            }
        } catch (error) {
            enqueueSnackbar(
                error?.response?.data?.message ||
                "Signup failed. Please try again.",
                { variant: "error" }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-white dark:bg-[#191919] transition-colors px-4">

            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-5 left-5 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#222] transition"
            >
                <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-white" />
            </button>

            {/* Card */}
            <div className="w-full max-w-md bg-white dark:bg-[#111] rounded-xl shadow-lg p-4 sm:p-8 border border-gray-200 dark:border-[#222]">

                <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
                    Create Your Account
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2">

                    {/* Username */}
                    <div>
                        <label className="text-sm text-gray-700 dark:text-gray-300">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 rounded-lg bg-gray-100 dark:bg-[#191919] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-[#07C5B9] transition"
                            placeholder="Enter your username"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 rounded-lg bg-gray-100 dark:bg-[#191919] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-[#07C5B9] transition"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-700 dark:text-gray-300">Password</label>
                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full mt-1 p-3 rounded-lg bg-gray-100 dark:bg-[#191919] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-[#07C5B9] transition"
                                placeholder="Enter your password"
                            />

                            <button
                                type="button"
                                className="absolute right-3 top-4.5 text-gray-500 dark:text-gray-400"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-2 mt-2 rounded-lg font-semibold text-white shadow-mdbg-orange-500 bg-orange-500 dark:bg-[#07C5B9] hover:opacity-80 transition flex justify-center items-center gap-2 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="animate-spin w-5 h-5" />
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>

                <div className="flex items-center my-5">
                    <hr className="flex-grow border-gray-300 dark:border-gray-700" />
                    <span className="px-3 text-gray-500 dark:text-gray-400 text-sm">or continue with</span>
                    <hr className="flex-grow border-gray-300 dark:border-gray-700" />
                </div>

                {!loading && <GoogleLoginButton />}

                {/* Login Link */}
                <p className="mt-5 text-center text-gray-700 dark:text-gray-300">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-orange-500 dark:text-[#07C5B9] hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
