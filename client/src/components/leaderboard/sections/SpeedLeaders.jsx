import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Zap, Clock, CheckCircle, Award } from 'lucide-react';

export default  function SpeedLeaders() {
  const leaders = [
    {
      rank: 1,
      name: "Marcus Rodriguez",
      role: "Senior Developer",
      avgResponse: "1.8min",
      quickAnswers: 567,
      qualityScore: 94,
      consistency: 96,
      avatar: "👨‍💻",
      specialty: "Web Development"
    },
    {
      rank: 2,
      name: "Priya Patel",
      role: "UX Designer",
      avgResponse: "2.3min",
      quickAnswers: 423,
      qualityScore: 92,
      consistency: 94,
      avatar: "👩‍🎨",
      specialty: "Design Systems"
    },
    {
      rank: 3,
      name: "James Wilson",
      role: "DevOps Engineer",
      avgResponse: "2.5min",
      quickAnswers: 389,
      qualityScore: 91,
      consistency: 93,
      avatar: "👨‍🔧",
      specialty: "Cloud Infrastructure"
    }
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Quick Responders
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Fastest contributors who maintain high quality standards
        </p>
      </div>

      <div className="space-y-6">
        {leaders.map((user, index) => (
          <motion.div
            key={user.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left Section */}
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                  {user.rank}
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{user.avatar}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{user.role}</p>
                    <span className="inline-block mt-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-semibold rounded-full">
                      {user.specialty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Center - Speed Metric */}
              <div className="text-center">
                <div className="flex items-center gap-2 justify-center mb-2">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{user.avgResponse}</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Average Response Time</div>
              </div>

              {/* Right - Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Clock className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{user.quickAnswers}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Quick Answers</div>
                </div>
                <div>
                  <CheckCircle className="w-5 h-5 text-green-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">{user.qualityScore}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Quality</div>
                </div>
                <div>
                  <Award className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{user.consistency}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Consistency</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}