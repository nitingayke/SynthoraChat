import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { TrendingUp, Rocket, Star, Target, Zap } from 'lucide-react';

export default function RisingStars() {
  const leaders = [
    {
      rank: 1,
      name: "Alex Thompson",
      role: "Student",
      growth: "+45%",
      recentAnswers: 89,
      accuracyImprovement: "+12%",
      engagement: "+67%",
      responseTime: "3.2min",
      avatar: "🎓",
      specialty: "Machine Learning",
      joined: "3 months ago"
    },
    {
      rank: 2,
      name: "James Wilson",
      role: "Career Changer",
      growth: "+38%",
      recentAnswers: 67,
      accuracyImprovement: "+15%",
      engagement: "+58%",
      responseTime: "4.1min",
      avatar: "🔄",
      specialty: "Cloud Computing",
      joined: "2 months ago"
    },
    {
      rank: 3,
      name: "Priya Patel",
      role: "UX Designer",
      growth: "+32%",
      recentAnswers: 78,
      accuracyImprovement: "+8%",
      engagement: "+42%",
      responseTime: "2.8min",
      avatar: "👩‍🎨",
      specialty: "Design Systems",
      joined: "4 months ago"
    },
    {
      rank: 4,
      name: "Michael Brown",
      role: "Frontend Developer",
      growth: "+28%",
      recentAnswers: 56,
      accuracyImprovement: "+10%",
      engagement: "+35%",
      responseTime: "3.5min",
      avatar: "💻",
      specialty: "React & Vue",
      joined: "5 months ago"
    }
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Rising Stars
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Fastest growing contributors showing exceptional progress
        </p>
      </div>

      <div className="space-y-6">
        {leaders.map((user, index) => (
          <motion.div
            key={user.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left Section */}
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {user.rank}
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{user.avatar}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
                      <Rocket className="w-4 h-4 text-orange-500" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user.role}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-semibold rounded-full">
                        {user.specialty}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{user.joined}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Growth Indicator */}
              <div className="text-center">
                <div className="flex items-center gap-2 justify-center mb-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  <span className="text-3xl font-bold text-green-600 dark:text-green-400">{user.growth}</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Growth Rate</div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <Star className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                  <div className="text-sm font-bold text-gray-900 dark:text-white">{user.recentAnswers}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Recent</div>
                </div>
                <div>
                  <Target className="w-4 h-4 text-green-500 mx-auto mb-1" />
                  <div className="text-sm font-bold text-green-600 dark:text-green-400">{user.accuracyImprovement}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Accuracy</div>
                </div>
                <div>
                  <Zap className="w-4 h-4 text-purple-500 mx-auto mb-1" />
                  <div className="text-sm font-bold text-purple-600 dark:text-purple-400">{user.engagement}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Engagement</div>
                </div>
                <div>
                  <TrendingUp className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                  <div className="text-sm font-bold text-gray-900 dark:text-white">{user.responseTime}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Response</div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Progress this month</span>
                <span>{user.growth}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: user.growth }}
                ></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}