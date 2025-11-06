import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { MessageCircle, ThumbsUp, Brain, Clock, Sparkles, MoveRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function QuestionsFeed() {
  const [selectedFilter, setSelectedFilter] = useState("latest");

  const filters = [
    { id: "latest", label: "Latest" },
    { id: "popular", label: "Popular" },
    { id: "unanswered", label: "Unanswered" },
    { id: "ai-answered", label: "AI Answered" }
  ];

  const questions = [
    {
      id: 1,
      title: "What's the best way to implement real-time features in React using FastAPI?",
      content: "I'm building a real-time chat application and want to know the best practices for integrating React with FastAPI WebSockets...",
      user: {
        name: "Sarah Chen",
        avatar: "👩‍💻",
        role: "Senior Frontend Dev"
      },
      tags: ["React", "FastAPI", "WebSockets", "Real-time"],
      answers: 24,
      likes: 156,
      timestamp: "2 hours ago",
      hasAIAnswer: true,
      isTrending: true
    },
    {
      id: 2,
      title: "How does LangChain improve AI response quality in Q&A systems?",
      content: "I've heard about LangChain for building AI applications. How does it specifically help in improving answer quality for Q&A platforms?",
      user: {
        name: "Mike Rodriguez",
        avatar: "👨‍🔬",
        role: "AI Researcher"
      },
      tags: ["AI", "LangChain", "Machine Learning", "NLP"],
      answers: 18,
      likes: 203,
      timestamp: "5 hours ago",
      hasAIAnswer: true,
      isTrending: true
    },
    {
      id: 3,
      title: "FastAPI vs Express.js for building scalable real-time applications?",
      content: "Comparing FastAPI and Express.js for a large-scale real-time application. What are the pros and cons of each?",
      user: {
        name: "Alex Thompson",
        avatar: "👨‍💼",
        role: "Full Stack Engineer"
      },
      tags: ["FastAPI", "Express.js", "Backend", "Performance"],
      answers: 31,
      likes: 189,
      timestamp: "1 day ago",
      hasAIAnswer: false,
      isTrending: false
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
            Recent Questions
          </h2>

          {/* Filters */}
          <div className="relative w-full overflow-hidden">

            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-100 dark:from-gray-800 to-transparent pointer-events-none z-10" />

            <div className="flex md:justify-end gap-2 w-full overflow-auto scrollbar-hide sm:px-5">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${selectedFilter === filter.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-100 dark:from-gray-800 to-transparent pointer-events-none z-10" />

          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {questions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200"
          >
            {/* Question Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{question.user.avatar}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {question.user.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {question.user.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{question.timestamp}</span>
              </div>
            </div>

            {/* Question Content */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {question.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                {question.content}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}

              {question.hasAIAnswer && (
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Answered
                </span>
              )}

              {question.isTrending && (
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                  🔥 Trending
                </span>
              )}

            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-between w-full sm:justify-start gap-4 sm:gap-6 text-sm text-gray-500 dark:text-gray-400">
                <button className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap">
                  <MessageCircle className="w-4 h-4" />
                  <p className="flex items-center gap-1">{question.answers} <span className="hidden sm:flex">answers</span></p>
                </button>

                <button className="flex items-center gap-2 hover:text-red-600 dark:hover:text-red-400 transition-colors whitespace-nowrap">
                  <ThumbsUp className="w-4 h-4" />
                  <p className="flex items-center gap-1">{question.likes} <span className="hidden sm:flex">likes</span></p>
                </button>

                {question.hasAIAnswer && (
                  <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md md:rounded-xl hover:shadow-lg transition-all duration-200">
                    <Brain className="w-4 h-4" />
                    <span className="hidden md:flex">Generate Best Answer</span>
                  </button>
                )}

                <Link to={'/chat-with'} className="sm:hidden gap-1- text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm">
                  <ArrowRight />
                </Link>
              </div>

              <Link to={'/chat-with'} className="hidden sm:flex gap-1 whitespace-nowrap text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm">
                View Discussion
                <ArrowRight />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700 text-center">
        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200">
          Load More Questions
        </button>
      </div>
    </motion.div>
  );
}