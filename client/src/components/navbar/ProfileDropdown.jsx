// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  User,
  Brain,
  FileEdit,
  Bookmark,
  Settings,
  LogOut,
  Sun,
  Moon,
  ChevronDown,
} from 'lucide-react';
import Avatar from '@mui/material/Avatar';
import AuthContext from '../../context/AuthContext';
import ThemeContext from '../../context/ThemeContext';

export default function ProfileDropdown() {
  const { loginUser, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Close when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } },
  };

  const menuItems = [
    { icon: User, label: 'My Profile', path: '/profile' },
    { icon: Brain, label: 'AI Chat', path: '/main/ai-chat' },
    { icon: FileEdit, label: 'My Posts', path: '/main' },
    { icon: Bookmark, label: 'Saved Posts', path: '/main/saved' },
    { icon: Settings, label: 'Settings', path: '/main/settings' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#202020] transition-all duration-300"
      >
        {
          loginUser?.profile?.profilePicture
            ? <Avatar alt={loginUser?.profile?.firstName} src={loginUser?.profile?.profilePicture} className='!w-8 !h-8' />
            : <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {loginUser?.profile?.firstName?.[0]?.toUpperCase() || 'U'}
            </div>
        }
        <ChevronDown
          className={`hidden lg:block w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''
            }`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-12 right-0 z-50 w-56 bg-white dark:bg-[#161616] border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg py-2"
          >
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 mb-2 flex items-center gap-3">
              {/* Profile Photo */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                {loginUser?.profile?.profilePicture ? (
                  <img
                    src={loginUser?.profile?.profilePicture}
                    alt={`${loginUser?.profile?.firstName} ${loginUser?.profile?.lastName}`}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <>
                    {loginUser?.profile?.firstName?.[0]}
                    {loginUser?.profile?.lastName?.[0]}
                  </>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white truncate">
                  {loginUser?.profile?.firstName} {loginUser?.profile?.lastName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  @{loginUser?.username}
                </p>
              </div>
            </div>

            {/* Menu Items */}
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#202020] rounded-lg transition-all"
                >
                  <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            

            {/* Theme Toggle */}
            <div className="border-t border-gray-200 dark:border-gray-800 mt-2 pt-2">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 px-4 py-2.5 w-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#202020] rounded-lg"
              >
                {theme ? (
                  <Sun className="w-4 h-4 text-yellow-500" />
                ) : (
                  <Moon className="w-4 h-4 text-gray-500" />
                )}
                <span>{theme ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>

            {/* Logout */}
            <div className="border-t border-gray-200 dark:border-gray-800 mt-2 pt-2">
              <button
                onClick={() => logout()}
                className="flex items-center gap-3 px-4 py-2.5 w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-[#202020]/40 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

