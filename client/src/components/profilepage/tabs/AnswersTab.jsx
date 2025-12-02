import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import PropTypes from "prop-types";
import { sampleAnswers } from "../../../data/mockUserData";
import AnswerCard from "./answersTab/AnswerCard";


export default function AnswersTab({ tabVariants }) {
  const stats = {
    totalAnswers: sampleAnswers.length,
    acceptedAnswers: sampleAnswers.filter(a => a.accepted).length,
    totalUpvotes: sampleAnswers.reduce((sum, a) => sum + a.upvotes, 0),
    helpfulScore: sampleAnswers.reduce((sum, a) => sum + a.answerMetrics.helpful, 0)
  };

  return (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Your Answers</h2>
            <p className="text-blue-100">Contributions you've made to help others</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold">{stats?.totalAnswers}</div>
              <div className="text-blue-200 text-sm">Total Answers</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats?.acceptedAnswers}</div>
              <div className="text-blue-200 text-sm">Accepted</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats?.totalUpvotes}</div>
              <div className="text-blue-200 text-sm">Upvotes</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats?.helpfulScore}</div>
              <div className="text-blue-200 text-sm">Helpful Votes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Options */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Answers</option>
            <option>Accepted Answers</option>
            <option>Most Upvoted</option>
            <option>Recent</option>
          </select>
          <select className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Topics</option>
            <option>AI & Machine Learning</option>
            <option>Web Development</option>
            <option>System Design</option>
          </select>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {sampleAnswers.length} answers
        </div>
      </div>

      {/* Answers Grid */}
      <div className="grid gap-6">
        {sampleAnswers.map((answer) => (
          <AnswerCard key={answer.id} answer={answer} />
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center pt-6">
        <button className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all">
          Load More Answers
        </button>
      </div>
    </motion.div>
  );
}

AnswersTab.propTypes = {
  tabVariants: PropTypes.object.isRequired,
};