import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import PropTypes from "prop-types";
import {
  Edit3,
} from 'lucide-react';

export default function AnswersTab({tabVariants}) {
  return (
      <motion.div
        variants={tabVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="text-center py-12">
          <Edit3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Your Answers</h3>
          <p className="text-gray-600 dark:text-gray-400">Answers you've provided will appear here</p>
        </div>
      </motion.div>
      
    );

}
AnswersTab.propTypes = {
  tabVariants: PropTypes.object.isRequired,
};
