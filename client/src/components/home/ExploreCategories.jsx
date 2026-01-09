// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Brain,
  Code,
  Database,
  Cloud,
  Smartphone,
  Palette,
  Server,
  Zap
} from "lucide-react";
import { useContext, useMemo, useState } from "react";
import AnalyticsContext from "../../context/AnalyticsContext";
import { Link } from "react-router-dom";
import { slugify } from "../../utils/helper";

/* ----------------------------------
  ICON + COLOR MAPPING (STATIC)
---------------------------------- */
const ICON_MAP = {
  ai: Brain,
  ml: Brain,
  react: Code,
  frontend: Code,
  backend: Server,
  database: Database,
  devops: Cloud,
  cloud: Cloud,
  mobile: Smartphone,
  ui: Palette,
  ux: Palette,
  design: Palette,
};

const COLOR_POOL = [
  "from-orange-500 to-[#07C5B9]",
  "from-purple-500 to-pink-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-indigo-500 to-purple-500",
  "from-pink-500 to-rose-500",
  "from-gray-500 to-gray-700",
  "from-yellow-500 to-orange-500",
];

const getIconForTopic = (topic) => {
  const key = topic.toLowerCase();
  return ICON_MAP[key] || Zap;
};

const ITEMS_PER_LOAD = 6;

export default function ExploreCategories() {
  const { analytics, loading } = useContext(AnalyticsContext);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  /* ----------------------------------
    BUILD CATEGORIES DYNAMICALLY
  ---------------------------------- */
  const categories = useMemo(() => {
    if (!analytics?.trendingTopics) return [];
    return analytics.trendingTopics.map((topic, index) => ({
      name: topic._id,
      count: topic.count.toLocaleString(),
      icon: getIconForTopic(topic._id),
      color: COLOR_POOL[index % COLOR_POOL.length],
    }));
  }, [analytics]);

  const visibleCategories = useMemo(
    () => categories.slice(0, visibleCount),
    [categories, visibleCount]
  );

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#0f0f0f] rounded-lg p-6 text-center text-gray-500 dark:text-gray-400 max-w-6xl mx-auto">
        Loading categories...
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#0f0f0f] rounded-lg shadow-sm border border-gray-200 dark:border-white/10 p-4 max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Explore Topics
        </h3>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {categories.length} trending
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-3">
        {visibleCategories.map((category) => (
          <Link
            key={category.name}
            to={`/main?topic=${slugify(category.name)}`}
            className="group flex items-center gap-4 p-4 bg-gray-100 dark:bg-[#161616] rounded-lg hover:shadow-md transition-all duration-200 border border-transparent hover:border-orange-400 dark:hover:border-[#07C5B9]"
          >
            <div
              className={`p-3 bg-gradient-to-r ${category.color} rounded-lg group-hover:scale-105 transition-transform duration-300`}
            >
              <category.icon className="w-5 h-5 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 dark:text-white line-clamp-1 group-hover:text-orange-500 dark:group-hover:text-[#07C5B9]">
                  {category.name}
                </h4>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {category.count}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More */}
      {visibleCount < categories.length && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_LOAD)}
            className="px-6 py-2 rounded-md font-medium bg-orange-500 dark:bg-[#07C5B9] text-white hover:opacity-90 transition"
          >
            Load More
          </button>
        </div>
      )}

      {/* Browse All */}
      <Link
        to="/main?topic=all"
        className="block w-full mt-4 py-3 text-center text-orange-500 dark:text-[#07C5B9] hover:text-orange-600 dark:hover:text-[#07C5B9] font-medium text-sm border border-gray-200 dark:border-gray-600 rounded-lg hover:border-orange-400 dark:hover:border-[#07C5B9] transition-all duration-200"
      >
        Browse All Topics
      </Link>
    </motion.section>
  );
}
