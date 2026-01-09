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
    },
    {
      icon: Sparkles,
      title: "Best Answer Generation",
      description: "Get the most accurate answer from all responses",
      action: "Generate",
    },
    {
      icon: Award,
      title: "Answer Quality Score",
      description: "AI rates answers for accuracy and clarity",
      action: "View Scores",
    },
    {
      icon: Zap,
      title: "Instant Analysis",
      description: "Real-time AI analysis of ongoing discussions",
      action: "Analyze",
    },
  ];

  return (
    <section className="w-full bg-gray-100 dark:bg-[#0f0f0f]">
        <div
          className="bg-white dark:bg-[#161616] border border-gray-200 dark:border-white/10 rounded-xl p-4 md:p-6"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              AI-Powered Features
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Enhance your Q&A experience with intelligent AI tools
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-lg p-5 transition hover:bg-gray-100 dark:hover:bg-[#1f1f1f]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-orange-100 dark:bg-[#07C5B9]/15">
                    <feature.icon className="w-6 h-6 text-orange-500 dark:text-[#07C5B9]" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {feature.description}
                    </p>

                    <button
                      className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-orange-500 dark:bg-[#07C5B9] text-white hover:opacity-90 transition"
                    >
                      {feature.action}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              All AI features are powered by advanced machine learning models
            </p>
          </div>
        </div>
    </section>
  );
}
