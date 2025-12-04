import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Edit3,
  ThumbsUp,
  MessageCircle,
  Eye,
  Clock,
  User,
  Check,
  Bookmark,
  Share2,
  TrendingUp
} from 'lucide-react';

export default function AnswerCard ({ answer }) {
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
          <Link to={`/profile/${answer?.questionUser?.username}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
              {answer.questionUser.avatar}
            </div>
          </Link>
          <div>
            <Link to={`/profile/${answer?.questionUser?.username}`}>
              <p className="font-semibold text-gray-900 dark:text-white">{answer.questionUser.name}</p>
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3" />
              <span>{answer.timestamp}</span>
              {answer.accepted && (
                <span className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400 text-xs rounded-full">
                  <Check className="w-3 h-3" />
                  Accepted Answer
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

      {/* Original Question */}
      <div className="mb-4 p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-500" />
          Original Question
        </h3>
        <p className="text-gray-700 dark:text-gray-300 font-medium">
          {answer.questionTitle}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {answer.questionTopics.map((topic, index) => (
            <span
              key={index * 0.5}
              className="px-2 py-1 bg-blue-100 dark:bg-[#07C5B9]/20 text-blue-800 dark:text-[#07C5B9] text-xs rounded-full border border-blue-200 dark:border-[#07C5B9]/30"
            >
              #{topic}
            </span>
          ))}
        </div>
      </div>

      {/* Your Answer */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-semibold text-xs">
            You
          </div>
          <h4 className="font-semibold text-gray-900 dark:text-white">Your Answer</h4>
        </div>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed bg-blue-50 dark:bg-blue-500/10 p-4 rounded-xl border border-blue-100 dark:border-blue-500/20">
          {answer.answerContent}
        </p>
      </div>

      {/* Answer Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-[#1a1a1a] dark:to-blue-500/5 rounded-xl">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400 mb-1">
            <ThumbsUp className="w-4 h-4" />
            <span className="font-semibold">{answer.upvotes}</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Upvotes</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="font-semibold">{answer.answerMetrics.helpful}</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Found Helpful</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-purple-600 dark:text-purple-400 mb-1">
            <Edit3 className="w-4 h-4" />
            <span className="font-semibold">{answer.answerMetrics.clarity}/5</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Clarity</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
            <Eye className="w-4 h-4" />
            <span className="font-semibold">{answer.views}</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Views</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors text-sm">
            <MessageCircle className="w-4 h-4" />
            Follow-up
          </button>
        </div>

        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-sm">
          View Question
        </button>
      </div>
    </motion.div>
  );
};

AnswerCard.propTypes = {
  answer: PropTypes.object.isRequired
};