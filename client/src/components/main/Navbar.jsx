import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Settings, Brain, Bell, Search, Menu, X, LogOut } from "lucide-react";
import ThemeContext from "../../context/ThemeContext";
import AuthContext from "../../context/AuthContext";
import UIStateContext from "../../context/UIStateContext";
import ProfileDropdown from "../navbar/ProfileDropdown";
import Drawer from "@mui/material/Drawer";

export default function Navbar() {

    const location = useLocation();

    const { theme, toggleTheme } = useContext(ThemeContext);
    const { loginUser, logout } = useContext(AuthContext);
    const { setOpenLoginDialog, searchQuery, setSearchQuery } = useContext(UIStateContext);

    const [openSidebar, setOpenSidebar] = useState(false);

    useEffect(() => {
        setSearchQuery("");
    }, [setSearchQuery, location.pathname, location.search]);

    const navLinks = [
        { name: "Main", path: "/main" },
        { name: "AI Chat", path: "/main/ai-chat" },
        { name: "Create Post", path: "/main/create-post" },
        { name: "Explore", path: "/main/explore" },
    ];

    const isActiveLink = (path) => {
        if (path === "/main") {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    }

    const notifications = loginUser?.notifications || [];

    const renderMainNavLinks = (isMobile) => {

        const commonClass = (path) => `relative transition-all duration-200 ${isActiveLink(path) ? "text-orange-500 dark:text-[#07C5B9] font-semibold" : "hover:text-orange-500 dark:hover:text-[#07C5B9]"} ${isMobile ? "px-4 py-2 rounded-lg" : ""}`;

        return (
            <div className={`${isMobile ? "flex-1 flex flex-col gap-1 overflow-auto scrollbar-hide" : "hidden md:flex items-center gap-3 md:gap-6"}`}>
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => isMobile && setOpenSidebar(false)}
                        className={commonClass(link.path)}
                    >
                        {link.name}
                    </Link>
                ))}

                {(isMobile && loginUser?.username) && (
                    <>
                        <Link to={`/main/u/profile/${loginUser?.username}`} onClick={() => setOpenSidebar(false)} className={commonClass("/main/profile")}>
                            My Profile
                        </Link>

                        <Link to={`/main/u/profile/${loginUser?.username}?tab=notifications`} onClick={() => setOpenSidebar(false)} className={commonClass("/main/notifications")}>
                            Notifications
                        </Link>

                        <Link to={`/main/u/profile/${loginUser?.username}?tab=settings`} onClick={() => setOpenSidebar(false)} className={commonClass("/main/settings")}>
                            Settings
                        </Link>

                        <Link to={`/main/u/profile/${loginUser?.username}?tab=saved-questions`} onClick={() => setOpenSidebar(false)} className={commonClass("/main/saved")}>
                            Saved Questions
                        </Link>

                        {!loginUser?.isVerified && <Link to={`/user-verification`} onClick={() => setOpenSidebar(false)} className={commonClass("/user-verification", isMobile)}>
                            User Verification
                        </Link>}
                    </>
                )}
            </div>
        );
    };

    return (
        <>
            <nav
                className="sticky top-0 left-0 w-full z-50 bg-white/70 hover:bg-white dark:bg-[#161616]/80 dark:hover:bg-[#161616] backdrop-blur-md shadow-md dark:shadow-gray-800 transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-orange-400/50 dark:hover:shadow-[#07C5B9]/40
            "
            >
                <div className="max-w-5xl mx-auto flex justify-between items-center px-4 lg:px-0 py-2 md:px-6">
                    <Link
                        to="/"
                        className="flex items-center gap-1 hover:scale-95 transition-transform"
                    >
                        <Brain className="text-orange-500 dark:text-[#07C5B9] w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-wide">
                            SC
                        </span>
                    </Link>

                    <div className="flex ps-3 w-fit justify-center items-center space-x-3 lg:space-x-6 text-gray-700 dark:text-gray-200">
                        {renderMainNavLinks(false)}

                        <div className="relative px-3 w-full sm:w-80 md:w-60 lg:w-70">
                            <Search
                                className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-3 py-1.5 bg-gray-100 dark:bg-[#202020] text-gray-700 dark:text-gray-200 rounded-full border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-[#07C5B9] placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                            />
                        </div>
                    </div>

                    <div className="flex items-center sm:gap-4">
                        <button
                            onClick={toggleTheme}
                            className="hidden md:flex p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#252525] transition"
                            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
                        >
                            {theme === "dark" ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </button>

                        {loginUser && <Link
                            to={`/main/u/profile/${loginUser?.username}?tab=notifications`}
                            className="related hidden sm:flex p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#252525] transition relative"
                        >
                            <Bell className="w-5 h-5" />
                            {(notifications?.length > 0) && (
                                <span className="
                                absolute top-0 right-0 bg-orange-500 dark:bg-[#07C5B9]
                                text-white text-[12px] px-1 font-semibold flex items-center justify-center
                                rounded-full
                            ">
                                    {Math.min(notifications?.length, 9)}
                                    {notifications?.length > 9 && "+"}
                                </span>
                            )}
                        </Link>}

                        {
                            loginUser && <Link
                                to={`/main/u/profile/${loginUser?.username}?tab=settings`}
                                className="hidden lg:flex p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#252525] transition"
                                title="Settings"
                            >
                                <Settings className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                            </Link>
                        }

                        {loginUser ? (
                            <div className="sm:flex hidden"><ProfileDropdown /></div>
                        ) : (
                            <button
                                onClick={() => setOpenLoginDialog(true)}
                                className="hidden sm:block bg-orange-500 dark:bg-[#07C5B9] text-white py-1 px-4 rounded-lg font-medium whitespace-nowrap shadow hover:opacity-90 transition-all"
                            >
                                Join Now
                            </button>
                        )}

                        <button
                            className="md:hidden"
                            onClick={() => setOpenSidebar((prev) => !prev)}
                        >
                            {openSidebar ? (
                                <X className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            <Drawer
                anchor="right"
                open={openSidebar}
                onClose={() => setOpenSidebar(false)}
                className="md:hidden"
            >
                <div className="w-60 h-full bg-gray-100 dark:bg-[#191919] text-gray-900 dark:text-gray-100 flex flex-col justify-between p-4">
                    <div className="sticky top-0 z-50 flex items-center justify-between mb-3">
                        <Link to={"/"} onClick={() => setOpenSidebar(false)} className="flex items-center gap-2">
                            <Brain className="text-orange-500 dark:text-[#07C5B9] w-6 h-6" />
                            <span className="text-xl font-bold text-gray-900 dark:text-white">SynthoraChat</span>
                        </Link>
                        <button onClick={() => setOpenSidebar(false)}>
                            <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                        </button>
                    </div>

                    {renderMainNavLinks(true)}

                    <div className="flex flex-col gap-2 pt-2 mt-2 border-t border-gray-300/50 dark:border-[#202020]">
                        <button
                            onClick={toggleTheme}
                            className="flex items-center gap-2 bg-gray-200 dark:bg-[#202020] py-2 px-4 rounded-lg hover:opacity-80 transition"
                        >
                            {theme === "dark" ? (
                                <>
                                    <Sun className="w-5 h-5" />
                                    Light Mode
                                </>
                            ) : (
                                <>
                                    <Moon className="w-5 h-5 text-gray-700" />
                                    Dark Mode
                                </>
                            )}
                        </button>

                        {loginUser ? (
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 bg-red-500/10 text-red-500 hover:opacity-80 py-2 px-4 rounded-lg transition"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setOpenLoginDialog(true);
                                    setOpenSidebar(false);
                                }}
                                className="bg-orange-500 dark:bg-[#07C5B9] text-white py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition"
                            >
                                Join Now
                            </button>
                        )}
                    </div>
                </div>
            </Drawer >
        </>
    );
}
