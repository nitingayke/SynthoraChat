import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { CheckCircle, Brain, TrendingUp, Target } from 'lucide-react';

export default function AccuracyLeaders() {
  const leaders = [
    {
      rank: 1,
      name: "Dr. Sarah Chen",
      role: "AI Research Scientist",
      accuracy: 98,
      verifiedAnswers: 245,
      aiValidation: 97,
      streak: 45,
      avatar: "👩‍🔬",
      specialty: "Machine Learning"
    },
    {
      rank: 2,
      name: "Dr. Emily Watson",
      role: "Data Scientist",
      accuracy: 97,
      verifiedAnswers: 189,
      aiValidation: 96,
      streak: 38,
      avatar: "👩‍🏫",
      specialty: "Data Analysis"
    },
    {
      rank: 3,
      name: "Alex Thompson",
      role: "ML Engineer",
      accuracy: 96,
      verifiedAnswers: 156,
      aiValidation: 95,
      streak: 32,
      avatar: "👨‍💼",
      specialty: "Neural Networks"
    }
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Accuracy Champions
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Members with the highest answer accuracy and verification rates
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {leaders.map((user, index) => (
          <motion.div
            key={user.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{user.avatar}</div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{user.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user.role}</p>
                </div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold">
                {user.rank}
              </div>
            </div>

            {/* Accuracy Score */}
            <div className="text-center mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <Target className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{user.accuracy}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy Score</div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
                <div className="text-sm font-semibold text-gray-900 dark:text-white">{user.verifiedAnswers}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Verified</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
                <div className="text-sm font-semibold text-gray-900 dark:text-white">{user.aiValidation}%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">AI Valid</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400 mx-auto mb-1" />
                <div className="text-sm font-semibold text-gray-900 dark:text-white">{user.streak}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Day Streak</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}