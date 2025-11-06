// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { TrendingUp, Users, Trophy } from "lucide-react";

export default function CommunityHighlights() {
  
  const topContributors = [
    {
      name: "Sarah Chen",
      avatar: "👩‍💻",
      answers: 142,
      streak: 15,
      role: "AI Expert",
      points: 2840,
      badge: "🏆"
    },
    {
      name: "Mike Rodriguez",
      avatar: "👨‍🔬",
      answers: 128,
      streak: 12,
      role: "ML Engineer",
      points: 2560,
      badge: "⭐"
    },
    {
      name: "Alex Thompson",
      avatar: "👨‍💼",
      answers: 98,
      streak: 8,
      role: "Full Stack",
      points: 1960,
      badge: "🔥"
    },
    {
      name: "Emily Park",
      avatar: "👩‍💼",
      answers: 87,
      streak: 6,
      role: "DevOps",
      points: 1740,
      badge: "🚀"
    }
  ];

  const communityStats = [
    { label: "Questions Today", value: "127", change: "+15%" },
    { label: "Answers Today", value: "342", change: "+22%" },
    { label: "New Members", value: "48", change: "+8%" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Community Leaders
          </h3>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          This Week
        </div>
      </div>

      {/* Top Contributors */}
      <div className="space-y-4 mb-6">
        {topContributors.map((contributor, index) => (
          <motion.div
            key={contributor.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="text-2xl">{contributor.avatar}</div>
                <div className="absolute -top-1 -right-1 text-xs">
                  {contributor.badge}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {contributor.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {contributor.role}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-gray-900 dark:text-white">
                {contributor.answers}
              </div>
              <div className="text-xs text-green-500 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {contributor.streak} days
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Community Stats */}
      <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Community Stats
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {communityStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
              <div className="text-xs text-green-500">
                {stat.change}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <button className="w-full mt-6 py-3 text-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm border border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200">
        View Full Leaderboard
      </button>
    </motion.div>
  );
}