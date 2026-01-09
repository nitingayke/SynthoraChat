import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  FileText,
  Target,
  Zap,
  Award
} from "lucide-react";

export default function AIFeatures() {
  const aiFeatures = [
    {
      icon: Brain,
      title: "Smart Summarization",
      description:
        "AI automatically summarizes all answers into concise, easy-to-understand overviews with multiple format options.",
      capabilities: ["Multi-format summaries", "Key insights extraction", "Consensus detection"],
    },
    {
      icon: Sparkles,
      title: "Answer Generation",
      description:
        "Generate accurate, context-aware answers using advanced language models trained on expert knowledge.",
      capabilities: ["Context-aware responses", "Expert-level insights", "Real-time generation"],
    },
    {
      icon: FileText,
      title: "Content Enhancement",
      description:
        "AI suggests improvements to questions and answers for better clarity, accuracy, and engagement.",
      capabilities: ["Clarity suggestions", "Accuracy improvements", "Engagement optimization"],
    },
    {
      icon: Target,
      title: "Smart Recommendations",
      description:
        "Personalized content recommendations based on your interests, behavior, and expertise areas.",
      capabilities: ["Personalized feed", "Trending content", "Expert matching"],
    },
    {
      icon: Zap,
      title: "Real-time Analysis",
      description:
        "Instant analysis of answers for quality, accuracy, and relevance with confidence scoring.",
      capabilities: ["Quality scoring", "Confidence metrics", "Relevance analysis"],
    },
    {
      icon: Award,
      title: "Gamification & Rewards",
      description:
        "AI-powered reputation system that rewards quality contributions and helpful interactions.",
      capabilities: ["Reputation scoring", "Badge system", "Leaderboards"],
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-gray-100 dark:bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Advanced AI Capabilities
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Powered by intelligent systems that enhance accuracy, speed, and collaboration
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="
                bg-white dark:bg-[#161616]
                border border-gray-200 dark:border-white/10
                rounded-2xl
                p-5 sm:p-6
                shadow-sm
                md:hover:-translate-y-1 md:hover:shadow-lg
                transition-all duration-300
              "
            >
              {/* Icon */}
              <div
                className="
                  inline-flex p-3 rounded-xl mb-4
                  bg-orange-100 dark:bg-[#07C5B9]/10
                "
              >
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 dark:text-[#07C5B9]" />
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* Capabilities */}
              <div className="space-y-2">
                {feature.capabilities.map((capability, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400"
                  >
                    <Sparkles className="w-4 h-4 text-orange-500 dark:text-[#07C5B9]" />
                    {capability}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
