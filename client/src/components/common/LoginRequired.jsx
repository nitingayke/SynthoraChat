import { Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginRequired() {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-fit flex flex-col items-center justify-center text-center px-6 transition-colors">

                <div className="w-20 h-20 flex items-center justify-center rounded-full  bg-orange-100 dark:bg-[#0d4442] mb-5">
                    <Lock className="w-10 h-10 text-orange-500 dark:text-[#07C5B9]" />
                </div>

                {/* Heading */}
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Login Required
                </h1>

                {/* Subtext */}
                <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md">
                    You need to be logged in to access this feature.
                    Please sign in or create an account to continue.
                </p>

                {/* Buttons */}
                <div className="flex gap-4 mt-6">
                    {/* Login Button */}
                    <button
                        onClick={() => navigate("/login")}
                        className="px-4 py-2 rounded-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 dark:bg-[#07C5B9] dark:hover:bg-[#05a9a4] flex items-center gap-2 shadow-md transition"
                    >
                        Login
                        <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => navigate("/signup")}
                        className="px-4 py-2 rounded-lg font-semibold border border-gray-300 dark:border-[#303030] text-gray-900 dark:text-white bg-gray-100 dark:bg-[#191919] hover:bg-gray-200 dark:hover:bg-[#202020] transition"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}
