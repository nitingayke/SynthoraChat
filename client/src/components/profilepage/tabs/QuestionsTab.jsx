import React from "react";
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  MessageSquare
} from 'lucide-react';

export default function QuestionsTab({tabVariants}) {
  return (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="text-center py-12">
        <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Your Questions</h3>
        <p className="text-gray-600 dark:text-gray-400">Questions you've asked will appear here</p>
      </div>
    </motion.div>
  );
}

QuestionsTab.propTypes = {
  tabVariants: PropTypes.object.isRequired,
};

