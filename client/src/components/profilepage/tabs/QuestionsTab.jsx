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

// Sample questions data
const sampleQuestions = [
  {
    id: 1,
    title: "What are the key differences between supervised and unsupervised learning in machine learning?",
    content: "I'm trying to understand the fundamental differences between supervised and unsupervised learning. Could someone explain the key distinctions, use cases, and provide practical examples for each approach?",
    topics: ["Machine Learning", "AI", "Data Science"],
    answers: 12,
    upvotes: 47,
    views: 324,
    timestamp: "2 hours ago",
    isSolved: true,
    user: {
      name: "Sarah Chen",
      avatar: "SC"
    }
  },
  {
    id: 2,
    title: "How to implement authentication in React with JWT tokens?",
    content: "I'm building a React application and need to implement secure authentication using JWT tokens. What's the best practice for storing tokens, handling refresh tokens, and protecting routes?",
    topics: ["React", "JavaScript", "Web Development", "Authentication"],
    answers: 8,
    upvotes: 23,
    views: 156,
    timestamp: "1 day ago",
    isSolved: false,
    user: {
      name: "Mike Rodriguez",
      avatar: "MR"
    }
  },
  {
    id: 3,
    title: "What's the future of generative AI in creative industries?",
    content: "With the rapid advancement of generative AI models like GPT-4 and DALL-E, how do you see these technologies transforming creative fields such as writing, design, and music composition in the next 5 years?",
    topics: ["Generative AI", "AI Future", "Creative AI"],
    answers: 15,
    upvotes: 89,
    views: 542,
    timestamp: "3 days ago",
    isSolved: true,
    user: {
      name: "Emma Wilson",
      avatar: "EW"
    }
  },
  {
    id: 4,
    title: "Best practices for optimizing React application performance?",
    content: "My React app is getting slower as it grows. What are the most effective performance optimization techniques I should implement? Looking for both beginner and advanced strategies.",
    topics: ["React", "Performance", "Web Development"],
    answers: 6,
    upvotes: 34,
    views: 287,
    timestamp: "4 days ago",
    isSolved: false,
    user: {
      name: "Alex Kumar",
      avatar: "AK"
    }
  },
  {
    id: 5,
    title: "How does attention mechanism work in transformer models?",
    content: "I'm studying transformer architecture and having trouble understanding the attention mechanism. Can someone explain self-attention and multi-head attention in simple terms with examples?",
    topics: ["Transformers", "Neural Networks", "NLP"],
    answers: 9,
    upvotes: 41,
    views: 198,
    timestamp: "1 week ago",
    isSolved: true,
    user: {
      name: "David Park",
      avatar: "DP"
    }
  },
  {
    id: 6,
    title: "What are the ethical considerations when deploying AI systems?",
    content: "As we deploy more AI systems in production, what are the key ethical considerations we should address? Looking for insights on bias, transparency, accountability, and privacy concerns.",
    topics: ["AI Ethics", "Responsible AI", "AI Governance"],
    answers: 11,
    upvotes: 67,
    views: 423,
    timestamp: "1 week ago",
    isSolved: false,
    user: {
      name: "Lisa Thompson",
      avatar: "LT"
    }
  }
];

const QuestionCard = ({ question }) => {
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
          <Link to={`/users/${question?.questionUser?._id}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
              {question.user.avatar}
            </div>
          </Link>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{question.user.name}</p>
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