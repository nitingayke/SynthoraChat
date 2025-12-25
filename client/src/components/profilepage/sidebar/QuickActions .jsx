// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Edit3, Shield, Trophy, Eye } from 'lucide-react';
import PropTypes from 'prop-types';

const QuickActions = ({itemVariants}) => {
  return (
    <motion.div
      variants={itemVariants}
      className="md:w-1/2 bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm md:mb-5"
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
      <div className="space-y-2">
        {[
          { icon: Edit3, label: 'Edit Profile', action: () => { } },
          { icon: Shield, label: 'Manage Credentials', action: () => { } },
          { icon: Trophy, label: 'View Badges', action: () => { } },
          { icon: Eye, label: 'View Analytics', action: () => { } },
        ].map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button
              key={index * 0.5}
              onClick={item.action}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#202020] transition-colors"
            >
              <IconComponent className="w-4 h-4" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

QuickActions.propTypes = {
  itemVariants: PropTypes.object.isRequired,
};

export default QuickActions;