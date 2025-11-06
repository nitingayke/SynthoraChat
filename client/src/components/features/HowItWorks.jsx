// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    "Sign up and create your profile",
    "Ask questions or browse existing posts",
    "Get instant AI-generated answers and community responses",
    "Rate, upvote, and interact with answers",
    "Track your contributions and reputation"
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
        >
          How It Works
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          A step-by-step guide to leveraging our AI and community platform.
        </p>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index * 0.2456}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <span className="text-orange-500 font-bold mr-2">{index + 1}.</span>
              <span className="text-gray-900 dark:text-white font-medium">{step}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
