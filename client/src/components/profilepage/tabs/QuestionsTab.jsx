import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { sampleQuestions } from "../../../data/mockUserData";
import QuestionCard from './questionsTab/QuestionCard';


export default function QuestionsTab({ tabVariants }) {
  return (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Questions</h2>
          <p className="text-gray-600 dark:text-gray-400">Questions you've asked in the community</p>
        </div>

        {/* Filter Options */}
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Questions</option>
            <option>Solved</option>
            <option>Unsolved</option>
            <option>Most Popular</option>
          </select>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="grid gap-6">
        {sampleQuestions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center pt-6">
        <button className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all">
          Load More Questions
        </button>
      </div>
    </motion.div>
  );
}

QuestionsTab.propTypes = {
  tabVariants: PropTypes.object.isRequired,
};