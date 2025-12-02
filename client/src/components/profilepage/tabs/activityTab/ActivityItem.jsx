// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import PropTypes from "prop-types";

export default function ActivityItem({ activity }) {
  const IconComponent = activity.icon;

  const colorClasses = {
    blue: "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400",
    green: "bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400",
    yellow: "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
    purple: "bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400",
    pink: "bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all group"
    >

      <div className={`p-2 rounded-lg ${colorClasses[activity.color] || colorClasses.pink}`}>
        <IconComponent className="w-4 h-4" />
      </div>

      <div className="flex-1">
        <p className="text-gray-900 dark:text-white font-medium">
          {activity.title}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {activity.action} • {activity.timestamp}
        </p>
      </div>

      <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400 font-semibold">
        <span>+{activity.points}</span>
      </div>
    </motion.div>
  );
};

ActivityItem.propTypes = {
  activity: PropTypes.object.isRequired
};