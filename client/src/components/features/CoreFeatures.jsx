import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { MessageCircle, Users, Brain, Zap, Search, ThumbsUp, Star } from 'lucide-react';

export default function CoreFeatures() {
  const features = [
    {
      icon: MessageCircle,
      title: "Smart Q&A Platform",
      description: "Ask questions and get instant answers from both AI and community experts with intelligent response ranking.",
      highlights: ["AI-powered answers", "Community insights", "Real-time responses"]
    },
    {
      icon: Users,
      title: "Community Collaboration",
      description: "Connect with experts and enthusiasts. Share knowledge and learn from diverse perspectives in real-time discussions.",
      highlights: ["Expert network", "Live discussions", "Knowledge sharing"]
    },
    {
      icon: Brain,
      title: "AI Answer Generation",
      description: "Get accurate, context-aware answers powered by advanced language models that learn from community interactions.",
      highlights: ["Context-aware", "Learning system", "Accurate responses"]
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Experience lightning-fast responses with our optimized AI models and real-time collaboration features.",
      highlights: ["Instant answers", "Live updates", "Fast processing"]
    },
    {
      icon: Search,
      title: "Smart Search & Filters",
      description: "Find exactly what you need with natural language search and advanced filtering options.",
      highlights: ["Natural language", "Advanced filters", "Quick discovery"]
    },
    {
      icon: ThumbsUp,
      title: "Quality Rating System",
      description: "AI-powered answer rating ensures you get the most accurate and helpful responses every time.",
      highlights: ["AI rating", "Quality assurance", "Best answers first"]
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Core Platform Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need for intelligent question-answering and community collaboration
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="inline-flex p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2">
                {feature.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Star className="w-4 h-4 text-orange-500" />
                    {highlight}
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