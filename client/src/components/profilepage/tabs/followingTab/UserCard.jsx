// User Card Component
import React, { useState } from "react";

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import PropTypes from "prop-types";
import {
  Users,
  UserPlus,
  UserMinus,
  MessageCircle,
  Calendar,
  MapPin,
  Briefcase,
  Star,
  Check
} from 'lucide-react';
import { Link } from "react-router-dom";

export default function UserCard({ user, onUnfollow, onMessage }) {
  const [setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#161616] rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <Link to={`/profile/${user.username}`}>
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-[#161616] shadow-lg"
            />
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Link to={`/profile/${user.username}`}>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {user.name}
                </h3>
              </Link>

              {user.isVerified && (
                <Check className="w-4 h-4 text-blue-500 dark:text-[#07C5B9]" />
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              @{user.username}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-2">
              {user.bio}
            </p>

            {/* User Details */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                <span>{user.profession}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Joined {new Date(user.joinedDate).getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mutual Badge */}
        {user.isMutual && (
          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400 text-xs rounded-full">
            <Users className="w-3 h-3" />
            <span>Mutual</span>
          </div>
        )}
      </div>

      {/* Expertise Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {user.expertise.slice(0, 4).map((skill, index) => (
          <span
            key={index * 0.5}
            className="px-2 py-1 bg-blue-100 dark:bg-[#07C5B9]/20 text-blue-800 dark:text-[#07C5B9] text-xs rounded-full border border-blue-200 dark:border-[#07C5B9]/30"
          >
            {skill}
          </span>
        ))}
        {user.expertise.length > 4 && (
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
            +{user.expertise.length - 4}
          </span>
        )}
      </div>

      {/* Stats and Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{user.followers} followers</span>
          </div>
          <div className="flex items-center gap-1">
            <UserPlus className="w-3 h-3" />
            <span>{user.following} following</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            <span>Last active: {user.lastActive}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMessage(user.id)}
            className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            Message
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onUnfollow(user.id)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            <UserMinus className="w-4 h-4" />
            Unfollow
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  onUnfollow: PropTypes.func.isRequired,
  onMessage: PropTypes.func.isRequired
};