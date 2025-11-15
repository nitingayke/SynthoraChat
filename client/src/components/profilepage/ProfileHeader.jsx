// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Camera, Check, Edit3, Share2, Mail } from 'lucide-react';
import PropTypes from 'prop-types';

const ProfileHeader = ({ user, onEdit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-white dark:bg-[#161616] rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800"
    >
      {/* Cover Photo */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
        {user.coverPicture ? (
          <img
            src={user.coverPicture}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500" />
        )}

        {/* Verified Badge */}
        {user.isVerified && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-2 shadow-lg border border-white/20">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">Verified</span>
          </div>
        )}

        <button className="absolute top-4 right-20 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-all backdrop-blur-sm">
          <Camera className="w-4 h-4" />
        </button>
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-white dark:border-[#161616] bg-white dark:bg-[#161616] overflow-hidden shadow-2xl">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-2xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>

            <button className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all shadow-lg border border-gray-200 dark:border-gray-700">
              <Camera className="w-3 h-3" />
            </button>
          </div>

          {/* User Info and Actions */}
          <div className="flex-1 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-4 sm:mt-0">
            <div className="flex-1">
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {user.name}
                  </h1>
                  {user.isVerified && (
                    <div className="sm:hidden bg-green-500 text-white p-1 rounded-full">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-1">@{user.username}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {user.email}
                </p>
              </div>

              <p className="text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">
                {user.bio}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onEdit}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-[#202020] text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-all flex items-center gap-2 border border-gray-200 dark:border-gray-700"
              >
                <Share2 className="w-4 h-4" />
                Share
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-[#202020] text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-all flex items-center gap-2 border border-gray-200 dark:border-gray-700"
              >
                <Mail className="w-4 h-4" />
                Message
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

ProfileHeader.propTypes = {
  user: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default ProfileHeader;