import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import PropTypes from "prop-types";

export default function AchievementCard ({ achievement }) {
  const IconComponent = achievement.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-[#161616] rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:shadow-lg transition-all"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${achievement.color} flex items-center justify-center`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white">{achievement.name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{achievement.description}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Progress</span>
          <span className="font-semibold text-gray-900 dark:text-white">{achievement.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full bg-gradient-to-r ${achievement.color} transition-all duration-1000`}
            style={{ width: `${achievement.progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

AchievementCard.propTypes = {
  achievement: PropTypes.object.isRequired
};