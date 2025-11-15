import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Brain } from "lucide-react";

export default function AISummaryCard({itemVariants}) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl"
    >
      <div className="flex items-center gap-3 mb-3">
        <Brain className="w-6 h-6" />
        <h3 className="font-bold">AI Summary</h3>
      </div>
      <p className="text-blue-100 text-sm leading-relaxed">
        You've contributed 80+ helpful answers with 95% accuracy. Your expertise in AI and machine learning has helped 1,200+ learners.
      </p>
    </motion.div>
  );
}

AISummaryCard.propTypes = {
  itemVariants: PropTypes.object,
};