import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  MessageCircle,
  Search,
} from "lucide-react";

import AuthContext from "../../context/AuthContext";
import AnalyticsContext from "../../context/AnalyticsContext";
import AIChatContext from "../../context/AIChatContext";
import { slugify } from "../../utils/helper";

export default function Hero() {
  const { loginUser } = useContext(AuthContext);
  const { loading, analytics } = useContext(AnalyticsContext);
  const { userPrompt, setUserPrompt } = useContext(AIChatContext);

  /* -------------------- Trending Topics (Dynamic) -------------------- */
  const trendingTopics = useMemo(() => {
    if (!analytics?.trendingTopics?.length) return [];

    return analytics.trendingTopics
      .slice(0, 12)
      .map((t) => t?._id)
      .filter(Boolean);
  }, [analytics]);

  return (
    <section className="relative min-h-[calc(100vh-50px)] flex items-center bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 text-white py-16 lg:py-24 overflow-hidden">

      {/* Background blobs (static, no animation) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {loginUser ? (
              <>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  Welcome back{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {loginUser.name}
                  </span>
                </h1>
                <p className="text-lg text-gray-300">
                  What would you like to explore today?
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
                <p className="text-lg text-gray-300">
                  Community-driven knowledge powered by AI
                </p>
              </>
            )}

            {/* Search */}
            <div className="mt-8 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 opacity-80" />
                <input
                  type="text"
                  placeholder="Search questions, topics, or ideas..."
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  className="w-full p-2 pl-10 sm:pl-12 ms:pr-4 sm:py-4 rounded-lg sm:rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-2 sm:mt-6 grid grid-cols-2 sm:flex flex-wrap gap-2 sm:gap-4">
              <Link
                to="/main/ai-chat"
                className="inline-flex items-center gap-1 sm:gap-3 px-3 py-1.5 sm:px-7 sm:py-4 rounded-lg sm:rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold shadow-xl hover:scale-105 transition"
              >
                <MessageCircle className="w-5 h-5 hidden sm:flex" />
                Ask a Question
              </Link>

              <Link
                to="/ai-suggestions"
                className="inline-flex items-center gap-3 px-2 py-1.5 sm:px-7 sm:py-4 rounded-lg sm:rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm font-semibold hover:bg-white/20 transition"
              >
                <Sparkles className="w-5 h-5 hidden sm:flex" />
                AI Suggestions
              </Link>
            </div>

            {/* Trending Topics */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-400">Trending:</span>

              {loading && (
                <span className="text-sm text-gray-400">Loading…</span>
              )}

              {!loading && trendingTopics.length === 0 && (
                <span className="text-sm text-gray-400">
                  No trends yet
                </span>
              )}

              {!loading &&
                trendingTopics.map((topic) => (
                  <Link
                    key={topic}
                    to={`/main?topic=${slugify(topic)}`}
                    className="px-3 py-1 rounded-full bg-white/10 text-sm text-gray-200 hover:bg-white/20 cursor-pointer transition"
                  >
                    {topic}
                  </Link>
                ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-xl opacity-60 rounded-3xl" />
              <div className="relative p-16 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl text-center">
                <Brain className="w-24 h-24 mx-auto mb-4 text-white" />
                <p className="font-semibold">AI Powered Learning</p>
                <p className="text-sm text-gray-300">
                  Real-time, community-validated answers
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
