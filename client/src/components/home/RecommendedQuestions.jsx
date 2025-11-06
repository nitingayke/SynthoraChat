// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, MessageCircle, TrendingUp } from "lucide-react";

export default function RecommendedQuestions() {
  const recommendedQuestions = [
    {
      id: 1,
      title: "React Hooks best practices for large applications",
      answers: 15,
      category: "React",
      trending: true,
      tags: ["React", "Hooks", "Best Practices"]
    },
    {
      id: 2,
      title: "How to optimize FastAPI for high traffic?",
      answers: 8,
      category: "FastAPI",
      trending: false,
      tags: ["FastAPI", "Performance", "Backend"]
    },
    {
      id: 3,
      title: "Machine Learning model deployment strategies",
      answers: 12,
      category: "AI/ML",
      trending: true,
      tags: ["ML", "Deployment", "AWS"]
    },
    {
      id: 4,
      title: "Tailwind CSS vs Styled Components in 2024",
      answers: 22,
      category: "CSS",
      trending: true,
      tags: ["CSS", "Tailwind", "Styled Components"]
    },
    {
      id: 5,
      title: "Building real-time chat with Socket.io and React",
      answers: 18,
      category: "Web Development",
      trending: false,
      tags: ["Socket.io", "React", "Real-time"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-orange-500" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Recommended For You
          </h3>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <TrendingUp className="w-4 h-4" />
          <span>Based on your interests</span>
        </div>
      </div>

      <div className="space-y-4">
        {recommendedQuestions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-200 border border-transparent hover:border-gray-300 dark:hover:border-gray-500"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {question.title}
                  </h4>
                </div>
                {question.trending && (
                  <span className="ml-2 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs font-medium">
                    🔥
                  </span>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                  {question.category}
                </span>
                {question.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-3 h-3" />
                  <span>{question.answers} answers</span>
                </div>
                <div className="flex items-center gap-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 text-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm border border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200">
        View All Recommendations
      </button>
    </motion.div>
  );
}