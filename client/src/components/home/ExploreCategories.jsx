// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Brain, Code, Database, Cloud, Smartphone, Palette, Server, Zap } from "lucide-react";

export default function ExploreCategories() {
  const categories = [
    {
      name: "AI & Machine Learning",
      icon: Brain,
      count: "2.3K",
      color: "from-purple-500 to-pink-500",
      description: "Neural networks, NLP, deep learning"
    },
    {
      name: "Web Development",
      icon: Code,
      count: "4.1K",
      color: "from-blue-500 to-cyan-500",
      description: "Frontend, backend, full stack"
    },
    {
      name: "Mobile Development",
      icon: Smartphone,
      count: "1.2K",
      color: "from-green-500 to-emerald-500",
      description: "iOS, Android, React Native"
    },
    {
      name: "Data Science",
      icon: Database,
      count: "1.8K",
      color: "from-orange-500 to-red-500",
      description: "Analytics, visualization, ML"
    },
    {
      name: "Cloud & DevOps",
      icon: Cloud,
      count: "1.5K",
      color: "from-indigo-500 to-purple-500",
      description: "AWS, Docker, Kubernetes"
    },
    {
      name: "UI/UX Design",
      icon: Palette,
      count: "0.9K",
      color: "from-pink-500 to-rose-500",
      description: "Design systems, prototyping"
    },
    {
      name: "Backend Development",
      icon: Server,
      count: "2.7K",
      color: "from-gray-500 to-gray-700",
      description: "APIs, databases, architecture Create a homepage with three short explainer videos for a Generative AI Q&A platform."
    },
    {
      name: "Emerging Tech",
      icon: Zap,
      count: "0.8K",
      color: "from-yellow-500 to-orange-500",
      description: "Blockchain, IoT, AR/VR"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Explore Categories
        </h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {categories.length} topics
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:max-h-100 overflow-y-auto custom-scrollbar lg:pr-2">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`p-3 bg-gradient-to-r ${category.color} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                      {category.name}
                    </h4>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {category.count}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex-1 line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 text-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm border border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200">
        Browse All Categories
      </button>
    </motion.div>
  );
}