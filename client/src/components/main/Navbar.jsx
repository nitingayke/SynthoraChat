import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Settings, Brain, Bell, Search } from "lucide-react";
import ThemeContext from "../../context/ThemeContext";
import AuthContext from "../../context/AuthContext";
import UIStateContext from "../../context/UIStateContext";
import ProfileDropdown from "../navbar/ProfileDropdown";

export default function Navbar() {
    const location = useLocation();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { loginUser } = useContext(AuthContext);
    const { setOpenLoginDialog, searchQuery, setSearchQuery } = useContext(UIStateContext);

    const navLinks = [
        { name: "Home", path: "/home" },
        { name: "AI Chat", path: "/main/ai-chat" },
        { name: "Explore", path: "/main/explore" },
        { name: "Create Post", path: "/main/create-post" },
    ];

    const isActiveLink = (path) => location.pathname.startsWith(path);
    const notifications = loginUser?.notifications || [];

    return (
        <nav
            className="
                sticky top-0 left-0 w-full z-50
                bg-white/70 hover:bg-white dark:bg-[#161616]/80 dark:hover:bg-[#161616]
                backdrop-blur-md shadow-md dark:shadow-gray-800
                transition-all duration-300 ease-in-out
                hover:shadow-md hover:shadow-orange-400/50 dark:hover:shadow-[#07C5B9]/40
            "
        >
            <div className="max-w-5xl mx-auto flex justify-between items-center px-4 lg:px-0 py-2 md:px-6">
                <Link
                    to="/main"
                    className="flex items-center gap-1 hover:scale-95 transition-transform"
                >
                    <Brain className="text-orange-500 dark:text-[#07C5B9] w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-wide">
                        SC
                    </span>
                </Link>

                <div className="flex-1 flex justify-center items-center space-x-6 lg:space-x-6 text-gray-700 dark:text-gray-200">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`hidden md:block relative transition-all duration-200 
                                ${isActiveLink(link.path)
                                    ? "text-orange-500 dark:text-[#07C5B9] font-semibold"
                                    : "hover:text-orange-500 dark:hover:text-[#07C5B9]"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}


                    <div className="relative px-3 w-full sm:w-80 md:w-60 lg:w-70">
                        <Search
                            className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="
                        w-full pl-9 pr-3 py-1.5
                        bg-gray-100 dark:bg-[#202020]
                        text-gray-700 dark:text-gray-200
                        rounded-full border border-gray-300 dark:border-gray-700
                        focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-[#07C5B9]
                        placeholder-gray-500 dark:placeholder-gray-400
                        transition-all duration-300
                    "
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 lg:gap-4">
                    <button
                        onClick={toggleTheme}
                        className="hidden md:flex p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        title={theme ? "Switch to Dark Mode" : "Switch to Light Mode"}
                    >
                        {theme ? (
                            <Sun className="w-5 h-5 text-yellow-400" />
                        ) : (
                            <Moon className="w-5 h-5 text-gray-300" />
                        )}
                    </button>

                    <button
                        onClick={null}
                        className="related hidden sm:flex p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition relative"
                    >
                        <Bell className="w-5 h-5" />
                        {(notifications?.length > 0) && (
                            <span className="
                                absolute top-0 right-0 bg-orange-500 dark:bg-[#07C5B9]
                                text-white dark:text-black text-[12px] px-1 font-light flex items-center justify-center
                                rounded-full font-mono
                            ">
                                {Math.min(notifications?.length, 9)}
                                {notifications?.length > 9 && "+"}
                            </span>
                        )}
                    </button>

                    <Link
                        to="/main/settings"
                        className="hidden lg:flex p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        title="Settings"
                    >
                        <Settings className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                    </Link>

                    {loginUser ? (
                        <ProfileDropdown />
                    ) : (
                        <button
                            onClick={() => setOpenLoginDialog(true)}
                            className="hidden sm:block bg-orange-500 dark:bg-[#07C5B9] text-white py-1 px-4 rounded-full font-medium whitespace-nowrap shadow hover:opacity-90 transition-all"
                        >
                            Join Now
                        </button>
                    )}

                </div>
            </div>
        </nav>
    );
}
