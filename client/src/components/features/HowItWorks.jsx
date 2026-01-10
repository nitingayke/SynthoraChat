// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    "Sign up and create your profile",
    "Ask questions or browse existing posts",
    "Get instant AI-generated answers and community responses",
    "Rate, upvote, and interact with answers",
    "Track your contributions and reputation",
  ];

  return (
    <section className="py-14 sm:py-20 bg-gray-100 dark:bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          How It Works
        </motion.h2>

        <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          A simple step-by-step guide to using our AI-powered community platform.
        </p>

        {/* Steps */}
        <div className="space-y-4 text-left max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="flex items-start gap-3 bg-white dark:bg-[#161616]
                         border border-gray-200 dark:border-gray-800
                         rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-lg
                               bg-orange-500/10 dark:bg-[#07C5B9]/10
                               text-orange-500 dark:text-[#07C5B9]
                               font-semibold flex items-center justify-center">
                {index + 1}
              </span>

              <p className="text-gray-900 dark:text-gray-100 font-medium">
                {step}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
