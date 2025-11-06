// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function FeatureComparison() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Feature Comparison
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-100 mb-12">
          See how we stack up against the competition.
        </p>

        <div className="overflow-x-auto dark:text-white">
          <table className="min-w-full text-left border-collapse border border-gray-300 dark:border-gray-600">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-4 border border-gray-300 dark:border-gray-600">Feature</th>
                <th className="p-4 border border-gray-300 dark:border-gray-600">Our Platform</th>
                <th className="p-4 border border-gray-300 dark:border-gray-600">Competitor</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white dark:bg-gray-800">
                <td className="p-4 border border-gray-300 dark:border-gray-600">AI Answer Generation</td>
                <td className="p-4 border border-gray-300 dark:border-gray-600">✅</td>
                <td className="p-4 border border-gray-300 dark:border-gray-600">❌</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <td className="p-4 border border-gray-300 dark:border-gray-600">Community Collaboration</td>
                <td className="p-4 border border-gray-300 dark:border-gray-600">✅</td>
                <td className="p-4 border border-gray-300 dark:border-gray-600">✅</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <td className="p-4 border border-gray-300 dark:border-gray-600">Real-time Answers</td>
                <td className="p-4 border border-gray-300 dark:border-gray-600">✅</td>
                <td className="p-4 border border-gray-300 dark:border-gray-600">❌</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}