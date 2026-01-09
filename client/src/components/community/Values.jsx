import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Heart, Users, Shield, Globe, Award, Zap } from "lucide-react";

export default function Values() {
  const values = [
    {
      icon: Heart,
      title: "Kindness First",
      description:
        "We believe every interaction should be rooted in kindness and empathy. No question is too small, no helper is too busy.",
      principle: "Treat others as you want to be treated",
    },
    {
      icon: Users,
      title: "Inclusive by Design",
      description:
        "Everyone is welcome here regardless of background, experience level, or location. Diversity makes us stronger.",
      principle: "Different perspectives, one community",
    },
    {
      icon: Shield,
      title: "Safe Space",
      description:
        "We maintain a judgment-free zone where people can ask freely, learn safely, and grow confidently.",
      principle: "Learn without fear of judgment",
    },
    {
      icon: Globe,
      title: "Global Family",
      description:
        "With members from 100+ countries, we celebrate cultural differences and learn from worldwide perspectives.",
      principle: "One world, many voices",
    },
    {
      icon: Award,
      title: "Generosity Matters",
      description:
        "The best gift is shared knowledge. Our members generously give their time and expertise to help others succeed.",
      principle: "Knowledge grows when shared",
    },
    {
      icon: Zap,
      title: "Continuous Growth",
      description:
        "We're all lifelong learners here. Every day is an opportunity to learn something new and help someone else.",
      principle: "Always learning, always growing",
    },
  ];

  return (
    <section className="py-16 sm:py-20">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Our Community Values
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The principles that guide our interactions and make us who we are
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="bg-white dark:bg-[#161616] rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-orange-500/40 dark:hover:border-[#07C5B9]/40 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              >
                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-orange-100 dark:bg-[#07C5B9]/10"
                >
                  <Icon className="w-6 h-6 text-orange-500 dark:text-[#07C5B9]" />
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed flex-grow">
                  {value.description}
                </p>

                {/* Principle */}
                <div
                  className="mt-auto px-4 py-2 rounded-lg text-center text-xs sm:text-sm font-medium bg-orange-50 dark:bg-[#07C5B9]/10 text-orange-700 dark:text-[#07C5B9] border border-orange-200 dark:border-[#07C5B9]/30"
                >
                  {value.principle}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
