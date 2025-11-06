import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Brain, Sparkles, FileText, Target, Zap, Award } from 'lucide-react';

export default function AIFeatures() {
  const aiFeatures = [
    {
      icon: Brain,
      title: "Smart Summarization",
      description: "AI automatically summarizes all answers into concise, easy-to-understand overviews with multiple format options.",
      capabilities: ["Multi-format summaries", "Key insights extraction", "Consensus detection"]
    },
    {
      icon: Sparkles,
      title: "Answer Generation",
      description: "Generate accurate, context-aware answers using advanced language models trained on expert knowledge.",
      capabilities: ["Context-aware responses", "Expert-level insights", "Real-time generation"]
    },
    {
      icon: FileText,
      title: "Content Enhancement",
      description: "AI suggests improvements to questions and answers for better clarity, accuracy, and engagement.",
      capabilities: ["Clarity suggestions", "Accuracy improvements", "Engagement optimization"]
    },
    {
      icon: Target,
      title: "Smart Recommendations",
      description: "Personalized content recommendations based on your interests, behavior, and expertise areas.",
      capabilities: ["Personalized feed", "Trending content", "Expert matching"]
    },
    {
      icon: Zap,
      title: "Real-time Analysis",
      description: "Instant analysis of answers for quality, accuracy, and relevance with confidence scoring.",
      capabilities: ["Quality scoring", "Confidence metrics", "Relevance analysis"]
    },
    {
      icon: Award,
      title: "Gamification & Rewards",
      description: "AI-powered reputation system that rewards quality contributions and helpful interactions.",
      capabilities: ["Reputation scoring", "Badge system", "Leaderboards"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Advanced AI Capabilities
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Powered by cutting-edge artificial intelligence for smarter interactions
          </p>
        </motion.div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="inline-flex p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl shadow-lg mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* Capabilities */}
              <div className="space-y-2">
                {feature.capabilities.map((capability, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
                    <Sparkles className="w-4 h-4" />
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