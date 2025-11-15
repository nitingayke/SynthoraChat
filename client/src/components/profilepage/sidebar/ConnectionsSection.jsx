import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function ConnectionsSection({itemVariants}) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Connections</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Followers</span>
            <span className="text-sm text-blue-500 dark:text-[#07C5B9]">1,242</span>
          </div>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={`follower-${i}`} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border-2 border-white dark:border-[#161616]"></div>
            ))}
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 border-2 border-white dark:border-[#161616] flex items-center justify-center text-xs font-medium">
              +1.2K
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


ConnectionsSection.propTypes = {
  itemVariants: PropTypes.object,
};