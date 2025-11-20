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

// Sample answers data
const sampleAnswers = [
  {
    id: 1,
    questionTitle: "What's the best way to learn machine learning in 2024?",
    answerContent: "Based on my experience, I recommend starting with Python fundamentals, then moving to scikit-learn for practical implementation. Focus on understanding core concepts like cross-validation and feature engineering before diving into deep learning. Build projects early - they're the best way to learn.",
    questionTopics: ["Machine Learning", "Education", "Python"],
    upvotes: 24,
    accepted: true,
    views: 156,
    timestamp: "3 hours ago",
    questionUser: {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "Learning Student",
      avatar: "LS"
    },
    answerMetrics: {
      helpful: 18,
      clarity: 4.8
    }
  },
  {
    id: 2,
    questionTitle: "How to handle state management in large React applications?",
    answerContent: "For large React apps, I suggest using Redux Toolkit with RTK Query. It provides excellent TypeScript support and reduces boilerplate. Combine this with React Context for local state and consider Zustand for simpler cases. Remember to normalize your state shape for better performance.",
    questionTopics: ["React", "State Management", "Redux"],
    upvotes: 15,
    accepted: false,
    views: 89,
    timestamp: "1 day ago",
    questionUser: {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "React Developer",
      avatar: "RD"
    },
    answerMetrics: {
      helpful: 12,
      clarity: 4.5
    }
  },
  {
    id: 3,
    questionTitle: "What are the ethical implications of using AI in healthcare?",
    answerContent: "AI in healthcare raises important ethical considerations: data privacy, algorithmic bias, and accountability. We must ensure diverse training data to prevent bias, implement robust security measures, and maintain human oversight for critical decisions. Transparency in AI decision-making is crucial for patient trust.",
    questionTopics: ["AI Ethics", "Healthcare", "Responsible AI"],
    upvotes: 42,
    accepted: true,
    views: 234,
    timestamp: "2 days ago",
    questionUser: {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "Healthcare Professional",
      avatar: "HP"
    },
    answerMetrics: {
      helpful: 35,
      clarity: 4.9
    }
  },
  {
    id: 4,
    questionTitle: "Best practices for REST API design in Node.js",
    answerContent: "Here are key practices I follow: Use consistent naming conventions, implement proper status codes, add rate limiting, include comprehensive error handling, and version your APIs from the start. Also, consider using OpenAPI specification for documentation and input validation with Joi or Zod.",
    questionTopics: ["Node.js", "API Design", "Backend"],
    upvotes: 18,
    accepted: false,
    views: 127,
    timestamp: "3 days ago",
    questionUser: {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "Backend Engineer",
      avatar: "BE"
    },
    answerMetrics: {
      helpful: 14,
      clarity: 4.6
    }
  },
  {
    id: 5,
    questionTitle: "How does gradient descent work in neural networks?",
    answerContent: "Gradient descent optimizes neural networks by iteratively adjusting weights to minimize loss. Think of it like descending a mountain: at each step, you move in the direction of steepest descent. The learning rate controls step size - too large and you might overshoot, too small and convergence is slow.",
    questionTopics: ["Neural Networks", "Deep Learning", "Optimization"],
    upvotes: 31,
    accepted: true,
    views: 198,
    timestamp: "1 week ago",
    questionUser: {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "AI Enthusiast",
      avatar: "AE"
    },
    answerMetrics: {
      helpful: 28,
      clarity: 4.7
    }
  },
  {
    id: 6,
    questionTitle: "What's the difference between microservices and monolith architecture?",
    answerContent: "Monoliths are single, unified applications while microservices break functionality into independent, loosely coupled services. Microservices offer better scalability and team autonomy but add complexity in deployment and inter-service communication. Start with monolith and extract services as needed.",
    questionTopics: ["Architecture", "Microservices", "System Design"],
    upvotes: 22,
    accepted: false,
    views: 167,
    timestamp: "1 week ago",
    questionUser: {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "System Architect",
      avatar: "SA"
    },
    answerMetrics: {
      helpful: 19,
      clarity: 4.8
    }
  }
];

const AnswerCard = ({ answer }) => {
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
          <Link to={`/users/${answer?.questionUser?._id}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
              {answer.questionUser.avatar}
            </div>
          </Link>
          <div>
            <Link to={`/users/${answer?.questionUser?._id}`}>
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
              <div className="text-2xl font-bold">{stats.totalAnswers}</div>
              <div className="text-blue-200 text-sm">Total Answers</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.acceptedAnswers}</div>
              <div className="text-blue-200 text-sm">Accepted</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.totalUpvotes}</div>
              <div className="text-blue-200 text-sm">Upvotes</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.helpfulScore}</div>
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