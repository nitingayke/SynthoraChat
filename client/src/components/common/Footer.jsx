import { Brain, Twitter, Github, Linkedin, Sparkles, Mail, Sun, Moon } from "lucide-react";
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";

export default function Footer() {
  const year = new Date().getFullYear();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <footer className="bg-gray-100 dark:bg-[#0D1117] text-gray-700 dark:text-gray-300 pt-14 pb-10 px-4 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8 text-blue-600 dark:text-orange-400" />
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-wide">
              SynthoraChat
            </span>
          </div>
          <p className="text-sm italic max-w-xs mt-2">
            Discover answers. Elevate conversations. AI meets community!
          </p>
          <div className="flex items-center gap-3 mt-6">
            <Sparkles className="w-6 h-6 text-blue-600 dark:text-orange-400" />
            <span className="text-xs">Powered by GenAI & LangChain</span>
          </div>
          <div className="flex gap-4 mt-5">
            <a href="https://twitter.com" className="hover:text-blue-600 dark:hover:text-orange-400 transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://github.com" className="hover:text-blue-600 dark:hover:text-orange-400 transition">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" className="hover:text-blue-600 dark:hover:text-orange-400 transition">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Explore</h3>
          <ul className="flex flex-col gap-3">
            {["Home", "Features", "Community", "Leaderboard", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={`/${item.toLowerCase()}`}
                  className="hover:text-blue-600 dark:hover:text-orange-400 transition underline underline-offset-2"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Contact</h3>
          <p className="flex items-center gap-2 text-sm mb-2">
            <Mail className="w-5 h-5 text-blue-600 dark:text-orange-400" />
            support@synthorachat.com
          </p>
          <a
            href="https://discord.gg"
            className="inline-block mt-4 bg-blue-600 dark:bg-orange-500 text-white py-2 px-4 rounded hover:opacity-90 transition"
          >
            Join Discord
          </a>

          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 mt-6 text-sm bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-4 h-4 text-yellow-400" /> Light Mode
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-blue-600" /> Dark Mode
              </>
            )}
          </button>

          <div className="text-xs mt-6 text-gray-500 dark:text-gray-400">
            &copy; {year} SynthoraChat · All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
