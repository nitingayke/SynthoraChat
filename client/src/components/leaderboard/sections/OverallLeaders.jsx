import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Star, Trophy, Target, Zap, Brain } from 'lucide-react';

export default function OverallLeaders() {
  const leaders = [
    {
      rank: 4,
      name: "Alex Thompson",
      role: "ML Engineer",
      score: 94.2,
      answers: 634,
      accuracy: 95,
      responseTime: "3.1min",
      aiCollaboration: 90,
      avatar: "👨‍💼",
      specialty: "Neural Networks"
    },
    {
      rank: 5,
      name: "Priya Patel",
      role: "UX Designer",
      score: 92.8,
      answers: 521,
      accuracy: 93,
      responseTime: "2.8min",
      aiCollaboration: 88,
      avatar: "👩‍🎨",
      specialty: "Design Systems"
    },
    {
      rank: 6,
      name: "James Wilson",
      role: "DevOps Engineer",
      score: 91.5,
      answers: 487,
      accuracy: 92,
      responseTime: "3.5min",
      aiCollaboration: 85,
      avatar: "👨‍🔧",
      specialty: "Cloud Infrastructure"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Overall Community Leaders
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Top contributors based on comprehensive performance metrics
        </p>
      </div>

      {leaders.map((user, index) => (
        <motion.div
          key={user.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left Section */}
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {user.rank}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-4xl">{user.avatar}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user.role}</p>
                  <span className="inline-block mt-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold rounded-full">
                    {user.specialty}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section - Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 text-center">
              <div className="flex flex-col items-center">
                <Trophy className="w-5 h-5 text-yellow-500 mb-1" />
                <div className="text-lg font-bold text-gray-900 dark:text-white">{user.score}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
              </div>
              <div className="flex flex-col items-center">
                <Target className="w-5 h-5 text-green-500 mb-1" />
                <div className="text-lg font-bold text-green-600 dark:text-green-400">{user.accuracy}%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Accuracy</div>
              </div>
              <div className="flex flex-col items-center">
                <Zap className="w-5 h-5 text-blue-500 mb-1" />
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{user.responseTime}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Response</div>
              </div>
              <div className="flex flex-col items-center">
                <Brain className="w-5 h-5 text-purple-500 mb-1" />
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{user.aiCollaboration}%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">AI Collab</div>
              </div>
              <div className="flex flex-col items-center">
                <Star className="w-5 h-5 text-orange-500 mb-1" />
                <div className="text-lg font-bold text-gray-900 dark:text-white">{user.answers}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Answers</div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}