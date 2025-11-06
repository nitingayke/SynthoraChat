// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Brain, Sparkles, Award, Zap } from "lucide-react";

export default function AIFeatures() {
  const aiFeatures = [
    {
      icon: Brain,
      title: "Smart Summarization",
      description: "AI summarizes all answers into concise insights",
      action: "Try Now",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Sparkles,
      title: "Best Answer Generation",
      description: "Get the most accurate answer from all responses",
      action: "Generate",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Award,
      title: "Answer Quality Score",
      description: "AI rates answers for accuracy and clarity",
      action: "View Scores",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Zap,
      title: "Instant Analysis",
      description: "Real-time AI analysis of ongoing discussions",
      action: "Analyze",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 md:p-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          AI-Powered Features
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Enhance your Q&A experience with intelligent AI tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group cursor-pointer"
          >
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 bg-gradient-to-r ${feature.color} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {feature.description}
                  </p>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
                    {feature.action}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          All AI features powered by advanced machine learning models
        </p>
      </div>
    </motion.div>
  );
}