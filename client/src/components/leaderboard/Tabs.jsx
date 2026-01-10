import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Trophy, Zap, Target, Users, Brain, Clock } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function Tabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get("tab") || "overall";

  const tabs = [
    { id: "overall", name: "Overall", icon: Trophy },
    { id: "accuracy", name: "Accuracy", icon: Target },
    { id: "speed", name: "Speed", icon: Zap },
    { id: "engagement", name: "Engagement", icon: Users },
    { id: "ai-collab", name: "AI Collab", icon: Brain },
    { id: "rising", name: "Rising", icon: Clock },
  ];

  const handleTabChange = (tabId) => {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("tab", tabId);
    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };

  return (
    <section className="w-full bg-gray-100 dark:bg-[#0f0f0f] border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Leaderboard Categories
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Explore top contributors by performance
          </p>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:overflow-visible scrollbar-hide py-1"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <motion.button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`min-w-[140px] sm:min-w-0 flex sm:flex-col items-center gap-2 px-4 py-4 rounded-xl border transition-all duration-200
                  ${
                    isActive
                      ? "border-orange-500 dark:border-[#07C5B9] bg-orange-50 dark:bg-[#07C5B9]/10 text-orange-600 dark:text-[#07C5B9]"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-[#161616] text-gray-600 dark:text-gray-400 hover:border-orange-400 dark:hover:border-[#07C5B9]/70"
                  }
                `}
              >
                <Icon
                  className={`w-6 h-6 ${
                    isActive
                      ? "text-orange-500 dark:text-[#07C5B9]"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                />
                <span className="text-sm font-semibold whitespace-nowrap">
                  {tab.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Tabs;
