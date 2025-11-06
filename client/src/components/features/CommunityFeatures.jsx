import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Users, MessageSquare, Heart, TrendingUp, Shield, Globe } from 'lucide-react';

export default function CommunityFeatures() {
  const communityFeatures = [
    {
      icon: Users,
      title: "Expert Network",
      description: "Connect with verified experts across various domains and get authoritative answers to your questions.",
      stats: "10,000+ Experts"
    },
    {
      icon: MessageSquare,
      title: "Live Discussions",
      description: "Engage in real-time conversations with threaded comments and collaborative editing features.",
      stats: "50K+ Discussions"
    },
    {
      icon: Heart,
      title: "Gamification System",
      description: "Earn reputation points, badges, and recognition for your valuable contributions to the community.",
      stats: "1M+ Upvotes"
    },
    {
      icon: TrendingUp,
      title: "Trending Content",
      description: "Discover popular questions, rising discussions, and trending topics in your areas of interest.",
      stats: "500+ Daily Trends"
    },
    {
      icon: Shield,
      title: "Quality Moderation",
      description: "Community-driven moderation with AI assistance to maintain high-quality standards and respectful interactions.",
      stats: "99% Quality Score"
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Join a diverse, worldwide community of learners, experts, and knowledge enthusiasts.",
      stats: "100+ Countries"
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
            Vibrant Community Ecosystem
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Connect, collaborate, and grow with like-minded individuals worldwide
          </p>
        </motion.div>

        {/* Community Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {communityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="inline-flex p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400">
                <TrendingUp className="w-4 h-4" />
                {feature.stats}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}