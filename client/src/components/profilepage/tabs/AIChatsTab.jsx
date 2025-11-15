import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import PropTypes from "prop-types";
import {
  Brain,
} from 'lucide-react';

export default function AIChatsTab({ tabVariants }) {
  return (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="text-center py-12">
        <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Chat Sessions</h3>
        <p className="text-gray-600 dark:text-gray-400">Your AI conversations will appear here</p>
      </div>
    </motion.div>
  );
}

AIChatsTab.propTypes = {
  tabVariants: PropTypes.object
};
