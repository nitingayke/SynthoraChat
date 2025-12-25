import { useContext } from "react";
import { Brain, Menu, X, Sparkles, Sun, Moon, LogOut, Bell } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import ThemeContext from "../../context/ThemeContext";
import UIStateContext from "../../context/UIStateContext";
import AuthContext from "../../context/AuthContext";
import ProfileDropdown from "../navbar/ProfileDropdown";

const navLinks = [
  { name: "Home", path: "/home" },
  { name: "SolveHub", path: "/main" },
  { name: "Features", path: "/features" },
  { name: "Community", path: "/community" },
  { name: "Leaderboard", path: "/leaderboard" },
  { name: "Contact", path: "/contact" },
  // { name: "Notifications", path: "/notifications"},
  // { name: "Settings", path: "/settings"},
  // { name: "Profile", paht: "/profile" }
];

export default function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { loginUser, logout } = useContext(AuthContext);
  const { setOpenLoginDialog, openSidebar, setOpenSidebar } = useContext(UIStateContext);

  const notifications = loginUser?.notifications || [];

  const isActiveLink = (linkPath) => location.pathname.startsWith(linkPath);

  const renderNavLinks = (isMobile = false) => {
    const commonClass = (path, isMobile) =>`relative transition-all duration-200 ${isActiveLink(path) ? "text-orange-600 dark:text-[#07C5B9] font-bold" : "text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-[#07C5B9]"} ${isMobile ? "px-2 py-1.5 rounded-lg font-semibold" : "px-3 py-2"}`;

    return (
      <div
        className={
          isMobile
            ? "flex-1 flex flex-col gap-3 overflow-auto scrollbar-hide"
            : "hidden lg:flex items-center gap-2"
        }
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => isMobile && setOpenSidebar(false)}
            className={commonClass(link.path, isMobile)}
          >
            {link.name}
          </Link>
        ))}

        {isMobile && loginUser?.username && (
          <>
            <Link to={`/main/u/profile/${loginUser.username}`} onClick={() => setOpenSidebar(false)} className={commonClass("/main/u/profile", isMobile)}>
              My Profile
            </Link>

            <Link to={`/main/u/profile/${loginUser.username}?tab=notifications`} onClick={() => setOpenSidebar(false)} className={commonClass("tab=notifications", isMobile)}>
              Notifications
            </Link>

            <Link to={`/main/u/profile/${loginUser.username}?tab=settings`} onClick={() => setOpenSidebar(false)} className={commonClass("tab=saved-settings", isMobile)}>
              Settings
            </Link>

            <Link to={`/main/u/profile/${loginUser.username}?tab=saved-questions`} onClick={() => setOpenSidebar(false)} className={commonClass("tab=saved-questions", isMobile)}>
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
        className="w-full sticky top-0 z-40 bg-white dark:bg-[#0D1117] shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-orange-500/20 dark:hover:shadow-[#07C5B9]/40"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 sm:py-2 px-4 md:px-6">
          {/* Logo */}
          <Link
            to={"/"}
            className="flex items-center gap-2 hover:scale-95 transition-transform"
          >
            <Brain className="text-orange-500 dark:text-[#07C5B9] w-7 h-7 sm:w-8 sm:h-8" />
            <span className="text-2xl font-extrabold dark:text-white tracking-wide">
              SynthoraChat
            </span>
            <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />
          </Link>

          {renderNavLinks(false)}

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleTheme}
              className="hidden sm:flex p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#252525] dark:text-white transition"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 " />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {loginUser && <Link
              to={`/main/u/profile/${loginUser?.username}?tab=notifications`}
              className="related hidden sm:flex p-2 rounded-full dark:text-white hover:bg-gray-200 dark:hover:bg-[#252525] transition relative"
            >
              <Bell className="w-5 h-5" />
              {(notifications?.length > 0) && (
                <span className="absolute top-0 right-0 bg-orange-500 dark:bg-[#07C5B9] text-white text-[12px] px-1 font-semibold flex items-center justify-center rounded-full">
                  {Math.min(notifications?.length, 9)}
                  {notifications?.length > 9 && "+"}
                </span>
              )}
            </Link>}

            {/* User or Join */}
            {loginUser ? (
              <div className="hidden sm:flex items-center">
                <ProfileDropdown />
              </div>
            ) : (
              <button
                onClick={() => setOpenLoginDialog(true)}
                className="hidden sm:block bg-orange-500 dark:bg-[#07C5B9] text-white py-1.5 px-4 rounded-lg font-bold whitespace-nowrap shadow hover:opacity-90 transition-all"
              >
                Join Now
              </button>
            )}


            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
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
        className="lg:hidden"
      >
        <div className="w-64 h-full bg-gray-100 dark:bg-[#191919] dark:text-gray-100 flex flex-col justify-between p-4">
          {/* Header */}
          <div className="sticky top-0 z-50 flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Brain className="text-orange-500 dark:text-[#07C5B9] w-6 h-6" />
              <span className="text-xl font-bold dark:text-white">SynthoraChat</span>
            </div>
            <button onClick={() => setOpenSidebar(false)}>
              <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* Links */}
          {renderNavLinks(true)}

          {/* Footer Actions */}
          <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-gray-300/50 dark:border-[#202020]">
            {/* Theme Switch */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-[#202020] py-2 rounded-lg hover:opacity-80 transition"
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

            {/* Auth Action */}
            {loginUser ? (
              <button
                onClick={logout}
                className="flex items-center justify-center gap-2 bg-red-500/10 text-red-500 hover:opacity-80 py-2 rounded-lg transition"
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
                className="bg-orange-500 dark:bg-[#07C5B9] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Join Now
              </button>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
}
