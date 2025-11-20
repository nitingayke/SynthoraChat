// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  MapPin,
  Globe,
  Calendar,
  Clock,
  Shield
} from 'lucide-react';
import PropTypes from 'prop-types';
import InfoItem from '../shared/InfoItem';
import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';

const OverviewTab = ({ user }) => {

  const {loginUser} = useContext(AuthContext)

  const tabVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      {/* About Section */}
      <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem icon={MapPin} label="Location" value={loginUser?.profile?.location} />
          <InfoItem icon={Globe} label="Website" value={loginUser?.profile?.website} />
          <InfoItem icon={Calendar} label="Joined" value={new Date(loginUser?.joinDate).toLocaleDateString()} />
          <InfoItem icon={Clock} label="Last Active" value={new Date(loginUser?.lastActive).toLocaleDateString()} />
        </div>
      </div>

      {/* Expertise & Interests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {loginUser?.knowsAbout.map((skill, index) => (
              <span
                key={`expertise-${skill}-${index}`}
                className="px-3 py-1 bg-blue-100 dark:bg-[#07C5B9]/20 text-blue-800 dark:text-[#07C5B9] text-sm rounded-full border border-blue-200 dark:border-[#07C5B9]/30"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {loginUser?.topicsOfInterest.map((interest, index) => (
              <span
                key={`interest-${interest}-${index}`}
                className="px-3 py-1 bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-400 text-sm rounded-full border border-purple-200 dark:border-purple-500/30"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Credentials */}
      <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Credentials</h3>
        <div className="space-y-3">
          {loginUser?.credentials.map((cred, index) => (
            <div key={index * 0.5} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
              <Shield className="w-5 h-5 text-blue-500 dark:text-[#07C5B9]" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">{cred}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{cred.institution}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {user.achievements.map((achievement) => {
            const IconComponent = achievement.icon;
            return (
              <motion.div
                key={`achievement-${achievement.id}`}
                whileHover={{ scale: 1.05 }}
                className="text-center group cursor-pointer relative"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">
                  {achievement.name}
                </div>
                <div className="hidden group-hover:block absolute bg-gray-900 text-white text-xs rounded py-1 px-2 mt-2 z-10 -translate-x-1/2 left-1/2 whitespace-nowrap">
                  {achievement.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

OverviewTab.propTypes = {
  user: PropTypes.object.isRequired
};

export default OverviewTab;