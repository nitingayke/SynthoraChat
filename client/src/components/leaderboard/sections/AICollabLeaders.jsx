import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap, Target, Users } from 'lucide-react';

export default function AICollabLeaders() {
  const leaders = [
    {
      rank: 1,
      name: "Dr. Sarah Chen",
      role: "AI Research Scientist",
      aiScore: 95,
      enhancedAnswers: 189,
      aiSuggestions: 234,
      innovation: 92,
      efficiency: 88,
      avatar: "👩‍🔬",
      specialty: "Machine Learning"
    },
    {
      rank: 2,
      name: "Dr. Emily Watson",
      role: "Data Scientist",
      aiScore: 94,
      enhancedAnswers: 156,
      aiSuggestions: 198,
      innovation: 90,
      efficiency: 86,
      avatar: "👩‍🏫",
      specialty: "Data Analysis"
    },
    {
      rank: 3,
      name: "Marcus Rodriguez",
      role: "Senior Developer",
      aiScore: 92,
      enhancedAnswers: 134,
      aiSuggestions: 167,
      innovation: 88,
      efficiency: 91,
      avatar: "👨‍💻",
      specialty: "Web Development"
    },
    {
      rank: 4,
      name: "Alex Thompson",
      role: "ML Engineer",
      aiScore: 90,
      enhancedAnswers: 112,
      aiSuggestions: 145,
      innovation: 85,
      efficiency: 89,
      avatar: "👨‍💼",
      specialty: "Neural Networks"
    }
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          AI Collaboration Masters
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Experts who excel at working with AI to enhance their answers
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {leaders.map((user, index) => (
          <motion.div
            key={user.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{user.avatar}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{user.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user.role}</p>
                  <span className="inline-block mt-1 px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-semibold rounded-full">
                    {user.specialty}
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                {user.rank}
              </div>
            </div>

            {/* Main AI Score */}
            <div className="text-center mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
              <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{user.aiScore}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">AI Collaboration Score</div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-gray-900 dark:text-white">{user.enhancedAnswers}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Enhanced Answers</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                <Zap className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-gray-900 dark:text-white">{user.aiSuggestions}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">AI Suggestions</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 text-center">
                <Target className="w-5 h-5 text-orange-600 dark:text-orange-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-gray-900 dark:text-white">{user.innovation}%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Innovation</div>
              </div>
              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-3 text-center">
                <Users className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-gray-900 dark:text-white">{user.efficiency}%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Efficiency</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}