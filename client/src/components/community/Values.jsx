import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Heart, Users, Shield, Globe, Award, Zap } from 'lucide-react';

export default function Values() {
  const values = [
    {
      icon: Heart,
      title: "Kindness First",
      description: "We believe every interaction should be rooted in kindness and empathy. No question is too small, no helper is too busy.",
      principle: "Treat others as you want to be treated"
    },
    {
      icon: Users,
      title: "Inclusive by Design",
      description: "Everyone is welcome here regardless of background, experience level, or location. Diversity makes us stronger.",
      principle: "Different perspectives, one community"
    },
    {
      icon: Shield,
      title: "Safe Space",
      description: "We maintain a judgment-free zone where people can ask freely, learn safely, and grow confidently.",
      principle: "Learn without fear of judgment"
    },
    {
      icon: Globe,
      title: "Global Family",
      description: "With members from 100+ countries, we celebrate cultural differences and learn from worldwide perspectives.",
      principle: "One world, many voices"
    },
    {
      icon: Award,
      title: "Generosity Matters",
      description: "The best gift is shared knowledge. Our members generously give their time and expertise to help others succeed.",
      principle: "Knowledge grows when shared"
    },
    {
      icon: Zap,
      title: "Continuous Growth",
      description: "We're all lifelong learners here. Every day is an opportunity to learn something new and help someone else.",
      principle: "Always learning, always growing"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Community Values
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The principles that guide our interactions and make us who we are
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="inline-flex p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
                <value.icon className="w-6 h-6 text-white" />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {value.description}
              </p>

              {/* Principle */}
              <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 text-center">
                  {value.principle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}