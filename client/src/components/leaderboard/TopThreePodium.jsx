import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Crown, Star } from "lucide-react";

export default function TopThreePodium() {
  const topContributors = [
    {
      rank: 1,
      name: "Dr. Sarah Chen",
      role: "AI Research Scientist",
      score: 98.7,
      specialty: "Machine Learning",
      avatar: "👩‍🔬",
      gradient: "from-yellow-400 to-orange-500",
      stats: { answers: "1,247", accuracy: "98%", helped: "2.1K" },
    },
    {
      rank: 2,
      name: "Marcus Rodriguez",
      role: "Senior Developer",
      score: 96.3,
      specialty: "Web Development",
      avatar: "👨‍💻",
      gradient: "from-gray-400 to-gray-600",
      stats: { answers: "892", accuracy: "96%", helped: "1.5K" },
    },
    {
      rank: 3,
      name: "Dr. Emily Watson",
      role: "Data Scientist",
      score: 95.8,
      specialty: "Data Analysis",
      avatar: "👩‍🏫",
      gradient: "from-orange-400 to-red-500",
      stats: { answers: "756", accuracy: "97%", helped: "1.2K" },
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 max-w-6xl mx-auto mb-16"
    >
      {topContributors.map((user, index) => (
        <motion.div
          key={user.rank}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
          whileHover={{ y: -6 }}
          className={`relative w-full sm:w-[80%] md:w-[60%] lg:w-1/3 
            ${
              user.rank === 1
                ? "lg:order-2 lg:-mt-10"
                : user.rank === 2
                ? "lg:order-1 lg:mt-0"
                : "lg:order-3 lg:mt-4"
            }`}
        >

          {/* Card */}
          <div
            className={`relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 
            p-6 sm:p-8 shadow-lg flex flex-col items-center justify-between 
            ${
              user.rank === 1
                ? "sm:h-[24rem]"
                : "sm:h-[22rem]"
            }`}
          >
            {/* Rank Badge */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${user.gradient} 
                flex items-center justify-center shadow-md border border-white/30`}
              >
                {user.rank === 1 ? (
                  <Crown className="w-6 h-6 text-white" />
                ) : (
                  <span className="text-white font-bold text-lg">
                    {user.rank}
                  </span>
                )}
              </div>
            </div>

            {/* Avatar */}
            <div className="flex justify-center mt-6 mb-3">
              <div className="text-6xl">{user.avatar}</div>
            </div>

            {/* User Info */}
            <div className="text-center space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {user.name}
              </h3>
              <p className="text-gray-300 text-sm">{user.role}</p>
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full">
                <Star className="w-3 h-3 text-green-400" />
                <span className="text-xs text-gray-300">{user.specialty}</span>
              </div>
            </div>

            {/* Score */}
            <div className="text-center mt-3 mb-2">
              <div className="text-3xl font-bold text-white">
                {user.score}
              </div>
              <div className="text-xs text-gray-400">Overall Score</div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 text-center w-full mt-2">
              <div>
                <div className="text-sm font-semibold text-white">
                  {user.stats.answers}
                </div>
                <div className="text-xs text-gray-400">Answers</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-green-400">
                  {user.stats.accuracy}
                </div>
                <div className="text-xs text-gray-400">Accuracy</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-blue-400">
                  {user.stats.helped}
                </div>
                <div className="text-xs text-gray-400">Helped</div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
