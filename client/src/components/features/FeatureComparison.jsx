// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function FeatureComparison() {
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
          Feature Comparison
        </motion.h2>

        <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          See how our platform compares with traditional solutions.
        </p>

        {/* Table */}
        <div className="overflow-x-auto">
          <table
            className="min-w-full border border-gray-200 dark:border-gray-800
                       bg-white dark:bg-[#161616] rounded-xl overflow-hidden"
          >
            <thead className="bg-gray-50 dark:bg-[#1f1f1f]">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Feature
                </th>
                <th className="p-4 text-center text-sm font-semibold text-orange-500 dark:text-[#07C5B9]">
                  Our Platform
                </th>
                <th className="p-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Competitor
                </th>
              </tr>
            </thead>

            <tbody className="text-sm">
              <tr className="border-t border-gray-200 dark:border-gray-800">
                <td className="p-4 text-gray-900 dark:text-gray-100">
                  AI Answer Generation
                </td>
                <td className="p-4 text-center text-green-600">✅</td>
                <td className="p-4 text-center text-red-500">❌</td>
              </tr>

              <tr className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1a1a1a]">
                <td className="p-4 text-gray-900 dark:text-gray-100">
                  Community Collaboration
                </td>
                <td className="p-4 text-center text-green-600">✅</td>
                <td className="p-4 text-center text-green-600">✅</td>
              </tr>

              <tr className="border-t border-gray-200 dark:border-gray-800">
                <td className="p-4 text-gray-900 dark:text-gray-100">
                  Real-time Answers
                </td>
                <td className="p-4 text-center text-green-600">✅</td>
                <td className="p-4 text-center text-red-500">❌</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
