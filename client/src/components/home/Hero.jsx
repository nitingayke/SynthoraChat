import { useContext, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Brain, Sparkles, MessageCircle, Search } from "lucide-react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Hero() {

  const { loginUser } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");

  const trendingTopics = [
    "AI Development",
    "Web Development",
    "Machine Learning",
    "React Tips",
    "FastAPI Setup"
  ];

  return (
    <section className="min-h-[calc(100vh-50px)] flex items-center justify-center relative bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 text-white py-16 lg:py-24">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 mb-8 lg:mb-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              {loginUser ? (
                <>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                    Welcome back,{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {loginUser.name}!
                    </span>
                  </h1>
                  <p className="text-xl text-gray-300">
                    What do you want to learn or ask today?
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                    Ask Smarter.{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Answer Better.
                    </span>
                  </h1>
                  <p className="text-xl text-gray-300">
                    Join our community of curious minds and AI intelligence
                  </p>
                </>
              )}
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mb-6 mx-auto lg:mx-0"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-50" />
                <input
                  type="text"
                  placeholder="Search questions or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row w-fit gap-4 mb-6 mx-auto lg:mx-0"
            >
              <Link
                to="/ask-question"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                Ask a Question
              </Link>
              
              <Link
                to="/ai-suggestions"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                AI Suggested Questions
              </Link>
            </motion.div>

            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start"
            >
              <span className="text-gray-300 text-sm">Trending:</span>
              {trendingTopics.map((topic) => (
                <span
                  key={topic}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-200 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  {topic}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 hidden md:flex justify-center lg:justify-end pt-15 md:pt-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-lg opacity-75 animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-10 md:p-20 rounded-3xl border border-white/20 shadow-2xl">
                <Brain className="w-24 h-24 text-white mb-4 mx-auto" />
                <div className="text-center">
                  <div className="text-white font-bold text-lg mb-2">AI Powered</div>
                  <div className="text-gray-300 text-sm">Real-time Answers</div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-orange-500 text-white p-2 rounded-full shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-green-500 text-white p-2 rounded-full shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}