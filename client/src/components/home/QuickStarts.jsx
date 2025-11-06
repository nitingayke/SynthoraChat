// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Users, MessageCircle, Brain, Zap, TrendingUp } from "lucide-react";

export default function QuickStats() {
  const stats = [
    {
      icon: Users,
      number: "10.2K",
      label: "Active Community",
      change: "+12%",
      trending: true
    },
    {
      icon: MessageCircle,
      number: "48.7K",
      label: "Questions Answered",
      change: "+8%",
      trending: true
    },
    {
      icon: Brain,
      number: "94%",
      label: "AI Accuracy",
      change: "+2%",
      trending: true
    },
    {
      icon: Zap,
      number: "1.8s",
      label: "Avg Response Time",
      change: "-0.3s",
      trending: true
    }
  ];

  return (
    <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                {stat.trending && (
                  <div className="flex items-center gap-1 text-green-500 text-sm">
                    <TrendingUp className="w-3 h-3" />
                    <span>{stat.change}</span>
                  </div>
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.number}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}