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

  const isActiveLink = (linkPath) => location.pathname.startsWith(linkPath);

  const renderNavLinks = (isMobile = false) => (
    <ul
      className={`flex ${isMobile
          ? "flex-col gap-4 mt-6 text-lg font-semibold overflow-auto"
          : "hidden lg:flex gap-5 lg:gap-1 font-semibold"
        } text-gray-800 dark:text-gray-200`}
    >
      {navLinks.map((link) => (
        <li key={link.name}>
          <Link
            to={link.path}
            onClick={() => isMobile && setOpenSidebar(false)}
            className={`
              relative block px-3 py-2 rounded transition duration-200
              hover:text-orange-500 dark:hover:text-[#07C5B9]
              ${isActiveLink(link.path)
                ? "text-orange-600 dark:text-[#07C5B9] font-bold"
                : "text-gray-700 dark:text-gray-300"}
            `}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <nav
        className="
          w-full sticky top-0 z-40
          bg-gray-100 dark:bg-[#0D1117]
          shadow-lg backdrop-blur-md
          transition-all duration-300
          hover:shadow-blue-400/40 dark:hover:shadow-[#07C5B9]/40
        "
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 sm:py-2 px-4 md:px-6">
          {/* Logo */}
          <Link
            to={"/"}
            className="flex items-center gap-2 hover:scale-95 transition-transform"
          >
            <Brain className="text-orange-500 dark:text-[#07C5B9] w-7 h-7 sm:w-8 sm:h-8" />
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-wide">
              SynthoraChat
            </span>
            <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />
          </Link>

          {renderNavLinks(false)}

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="hidden sm:flex p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* Notification */}
            <button className="hidden sm:flex p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              <Bell className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>

            {/* User or Join */}
            {loginUser ? (
              <div className="hidden sm:flex items-center">
                <ProfileDropdown />
              </div>
            ) : (
              <button
                onClick={() => setOpenLoginDialog(true)}
                className="hidden sm:block bg-orange-500 dark:bg-[#07C5B9] text-white py-1.5 px-4 rounded-full font-bold whitespace-nowrap shadow hover:opacity-90 transition-all"
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

      {/* ---- SIDEBAR (Drawer) ---- */}
      <Drawer
        anchor="right"
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
        className="lg:hidden"
      >
        <div className="w-64 h-full bg-gray-100 dark:bg-[#0D1117] text-gray-900 dark:text-gray-100 flex flex-col justify-between p-6">
          {/* Header */}
          <div className="sticky top-0 z-50 bg-gray-100 dark:bg-[#0D1117] flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Brain className="text-orange-500 dark:text-[#07C5B9] w-6 h-6" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">SynthoraChat</span>
            </div>
            <button onClick={() => setOpenSidebar(false)}>
              <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* Links */}
          {renderNavLinks(true)}

          {/* Footer Actions */}
          <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-gray-300 dark:border-gray-700">
            {/* Theme Switch */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-800 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-5 h-5 text-yellow-400" />
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
                className="flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
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
