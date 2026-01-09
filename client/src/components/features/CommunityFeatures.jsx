import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  Heart,
  TrendingUp,
  Shield,
  Globe,
} from "lucide-react";

export default function CommunityFeatures() {
  const communityFeatures = [
    {
      icon: Users,
      title: "Expert Network",
      description:
        "Connect with verified experts across various domains and get authoritative answers to your questions.",
      stats: "10,000+ Experts",
    },
    {
      icon: MessageSquare,
      title: "Live Discussions",
      description:
        "Engage in real-time conversations with threaded comments and collaborative editing features.",
      stats: "50K+ Discussions",
    },
    {
      icon: Heart,
      title: "Gamification System",
      description:
        "Earn reputation points, badges, and recognition for your valuable contributions to the community.",
      stats: "1M+ Upvotes",
    },
    {
      icon: TrendingUp,
      title: "Trending Content",
      description:
        "Discover popular questions, rising discussions, and trending topics in your areas of interest.",
      stats: "500+ Daily Trends",
    },
    {
      icon: Shield,
      title: "Quality Moderation",
      description:
        "Community-driven moderation with AI assistance to maintain high-quality standards and respectful interactions.",
      stats: "99% Quality Score",
    },
    {
      icon: Globe,
      title: "Global Community",
      description:
        "Join a diverse, worldwide community of learners, experts, and knowledge enthusiasts.",
      stats: "100+ Countries",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-gray-100 dark:bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Vibrant Community Ecosystem
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Connect, collaborate, and grow with like-minded individuals worldwide
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {communityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="bg-white dark:bg-[#161616] border border-gray-200 dark:border-gray-800
                         rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              {/* Icon */}
              <div className="inline-flex p-3 rounded-lg bg-orange-500/10 dark:bg-[#07C5B9]/10 mb-4">
                <feature.icon className="w-6 h-6 text-orange-500 dark:text-[#07C5B9]" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-2 text-sm font-medium text-orange-500 dark:text-[#07C5B9]">
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
