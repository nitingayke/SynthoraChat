import React from "react";
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  Eye,
  ThumbsUp,
  Clock,
  MessageCircle,
  Bookmark,
  Share2
} from 'lucide-react';
import { Link } from "react-router-dom";

export default function QuestionCard({ question }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all duration-300 group"
    >
      {/* Question Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${question?.questionUser?.username}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
              {question.user.avatar}
            </div>
          </Link>
          <div>
            <Link to={`/profile/${question?.questionUser?.username}`}>
              <p className="font-semibold text-gray-900 dark:text-white">{question.user.name}</p>
            </Link>

            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3" />
              <span>{question.timestamp}</span>
              {question.isSolved && (
                <span className="px-2 py-1 bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400 text-xs rounded-full">
                  Solved
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 text-gray-400 hover:text-blue-500 dark:hover:text-[#07C5B9] transition-colors">
            <Bookmark className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-blue-500 dark:hover:text-[#07C5B9] transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Question Content */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-500 dark:group-hover:text-[#07C5B9] transition-colors cursor-pointer">
          {question.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {question.content}
        </p>
      </div>

      {/* Topics */}
      <div className="flex flex-wrap gap-2 mb-4">
        {question.topics.map((topic, index) => (
          <span
            key={index * 0.5}
            className="px-3 py-1 bg-blue-100 dark:bg-[#07C5B9]/20 text-blue-800 dark:text-[#07C5B9] text-xs rounded-full border border-blue-200 dark:border-[#07C5B9]/30 hover:bg-blue-200 dark:hover:bg-[#07C5B9]/30 transition-colors cursor-pointer"
          >
            #{topic}
          </span>
        ))}
      </div>

      {/* Stats and Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{question.answers} answers</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            <span>{question.upvotes} upvotes</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{question.views} views</span>
          </div>
        </div>

        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-sm">
          View Answers
        </button>
      </div>
    </motion.div>
  );
};

QuestionCard.propTypes = {
  question: PropTypes.object.isRequired
};