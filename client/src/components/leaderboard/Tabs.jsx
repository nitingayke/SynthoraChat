import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Trophy, Zap, Target, Users, Brain, Clock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

function Tabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get('tab') || 'overall';

  const tabs = [
    {
      id: 'overall',
      name: 'Overall Leaders',
      icon: Trophy,
      description: 'Top contributors across all metrics'
    },
    {
      id: 'accuracy',
      name: 'AI Accuracy',
      icon: Target,
      description: 'Highest answer accuracy scores'
    },
    {
      id: 'speed',
      name: 'Quick Responders',
      icon: Zap,
      description: 'Fastest quality answers'
    },
    {
      id: 'engagement',
      name: 'Community Engagement',
      icon: Users,
      description: 'Most active in discussions'
    },
    {
      id: 'ai-collab',
      name: 'AI Collaboration',
      icon: Brain,
      description: 'Best AI-assisted answers'
    },
    {
      id: 'rising',
      name: 'Rising Stars',
      icon: Clock,
      description: 'Fastest growing contributors'
    }
  ];

  const handleTabChange = (tabId) => {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('tab', tabId);
    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };

  return (
    <section className="py-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Leaderboard Categories
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover top performers in different areas of expertise
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                activeTab === tab.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <tab.icon className={`w-6 h-6 ${
                  activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
                }`} />
                <span className="text-sm font-semibold text-center">{tab.name}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tabs;