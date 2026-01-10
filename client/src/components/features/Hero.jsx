import React, { useContext, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import AnalyticsContext from "../../context/AnalyticsContext";

export default function Hero() {
  const { analytics } = useContext(AnalyticsContext);


  const stats = useMemo(() => {
    const items = [];

    if (analytics?.users?.activeLastNDays) {
      items.push({
        label: "Active Users",
        value: analytics.users.activeLastNDays.toLocaleString(),
      });
    }

    if (analytics?.content?.questions?.total) {
      items.push({
        label: "Questions",
        value: analytics.content.questions.total.toLocaleString(),
      });
    }

    if (analytics?.content?.answers?.total) {
      items.push({
        label: "Answers",
        value: analytics.content.answers.total.toLocaleString(),
      });
    }

    if (analytics?.ai?.totalSessions) {
      items.push({
        label: "AI Sessions",
        value: analytics.ai.totalSessions.toLocaleString(),
      });
    }

    // fallback if less than 4
    if (items.length < 4) {
      items.push({
        label: "Community Driven",
        value: "100%",
      });
    }

    return items.slice(0, 4);
  }, [analytics]);

  return (
    <section className="flex justify-center items-center min-h-[calc(100vh-50px)] relative bg-gradient-to-br from-blue-50 to-purple-100 dark:from-blue-900 dark:via-purple-900 dark:to-gray-900 text-gray-900 dark:text-white py-15 sm:py-20 lg:py-28">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-2xl border border-gray-300 dark:border-white/20 mb-8"
          >
            <Sparkles className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-semibold text-gray-800 dark:text-white">
              AI + Community Powered
            </span>
          </motion.div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Discover Our{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}
            Platform
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed sm:flex hidden">
            Where artificial intelligence meets real human expertise to deliver
            smarter, faster answers.
          </p>

          <p className="text-base text-gray-600 dark:text-gray-300 max-w-xs mx-auto mb-8 sm:hidden">
            Smart answers. Real people.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/signup"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-2xl shadow-2xl hover:scale-105 transition-all"
            >
              Start Free
            </Link>
            <Link
              to="/demo"
              className="px-8 py-4 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white font-bold rounded-2xl transition"
            >
              Live Demo
            </Link>
          </div>

          {/* Dynamic Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
