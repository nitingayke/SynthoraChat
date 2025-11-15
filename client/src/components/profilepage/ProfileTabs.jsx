// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { User, MessageSquare, Edit3, Brain, Bookmark, TrendingUp } from 'lucide-react';
import PropTypes from 'prop-types';
import ProfileTabContent from './ProfileTabContent';

const ProfileTabs = ({ activeTab, onTabChange, user }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'questions', label: 'Questions', icon: MessageSquare },
    { id: 'answers', label: 'Answers', icon: Edit3 },
    { id: 'ai-chats', label: 'AI Chats', icon: Brain },
    { id: 'saved', label: 'Saved Posts', icon: Bookmark },
    { id: 'activity', label: 'Activity', icon: TrendingUp }
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
    >
      <div className="flex flex-wrap gap-3 border-b border-gray-200 dark:border-gray-800 pb-4">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={`tab-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#202020]'
                }`}
            >
              <IconComponent className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <ProfileTabContent activeTab={activeTab} user={user} />
      </div>
    </motion.div>
  );
};

ProfileTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default ProfileTabs;