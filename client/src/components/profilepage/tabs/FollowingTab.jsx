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
  Check,
  Search,
  Filter
} from 'lucide-react';
import { Link } from "react-router-dom";

// Mock following data
const followingData = {
  total: 89,
  recentlyAdded: 12,
  mutual: 45,
  users: [
    {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "Sarah Chen",
      username: "sarahchen",
      bio: "Senior AI Researcher at Google | Machine Learning Expert",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: true,
      isFollowing: true,
      isMutual: true,
      location: "San Francisco, CA",
      profession: "AI Researcher",
      followers: 1247,
      following: 89,
      joinedDate: "2022-03-15",
      lastActive: "2 hours ago",
      expertise: ["Machine Learning", "Python", "TensorFlow", "AI Ethics"]
    },
    {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "Mike Rodriguez",
      username: "miker",
      bio: "Full-Stack Developer | React & Node.js Specialist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: false,
      isFollowing: true,
      isMutual: true,
      location: "New York, NY",
      profession: "Software Engineer",
      followers: 892,
      following: 156,
      joinedDate: "2021-11-08",
      lastActive: "1 day ago",
      expertise: ["React", "Node.js", "TypeScript", "AWS"]
    },
    {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "Dr. Emma Wilson",
      username: "emmaw",
      bio: "PhD in Computer Science | AI Ethics Researcher",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: true,
      isFollowing: true,
      isMutual: false,
      location: "Boston, MA",
      profession: "Research Scientist",
      followers: 2341,
      following: 67,
      joinedDate: "2020-07-22",
      lastActive: "3 hours ago",
      expertise: ["AI Ethics", "Research", "Data Science", "Python"]
    },
    {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "Alex Kumar",
      username: "alexk",
      bio: "Tech Lead | System Architecture & Cloud Computing",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: true,
      isFollowing: true,
      isMutual: true,
      location: "Seattle, WA",
      profession: "Tech Lead",
      followers: 1876,
      following: 234,
      joinedDate: "2019-05-14",
      lastActive: "5 hours ago",
      expertise: ["System Design", "Cloud", "Microservices", "DevOps"]
    },
    {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "David Park",
      username: "davidp",
      bio: "Frontend Architect | React & Vue.js Expert",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: false,
      isFollowing: true,
      isMutual: false,
      location: "Austin, TX",
      profession: "Frontend Architect",
      followers: 1567,
      following: 189,
      joinedDate: "2021-02-28",
      lastActive: "12 hours ago",
      expertise: ["React", "Vue.js", "JavaScript", "UI/UX"]
    },
    {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "Lisa Thompson",
      username: "lisat",
      bio: "Product Manager | AI Products & Strategy",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: true,
      isFollowing: true,
      isMutual: true,
      location: "Chicago, IL",
      profession: "Product Manager",
      followers: 2987,
      following: 145,
      joinedDate: "2020-09-11",
      lastActive: "1 day ago",
      expertise: ["Product Management", "AI Strategy", "UX Research", "Analytics"]
    }
  ]
};

// User Card Component
const UserCard = ({ user, onUnfollow, onMessage }) => {
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
          <Link to={`/users/${user?._id}`}>
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-[#161616] shadow-lg"
            />
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Link to={`/users/${user?._id}`}>
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

export default function FollowingTab({ tabVariants }) {
  const [following, setFollowing] = useState(followingData.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredUsers = following.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" ||
      (filter === "mutual" && user.isMutual) ||
      (filter === "verified" && user.isVerified) ||
      (filter === "recent" && user.lastActive.includes('hour'));

    return matchesSearch && matchesFilter;
  });

  const handleUnfollow = (userId) => {
    setFollowing(prev => prev.filter(user => user.id !== userId));
  };

  const handleMessage = (userId) => {
    // Handle message action
    console.log('Message user:', userId);
  };

  return (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="text-3xl font-bold">{followingData.total}</div>
          <div className="text-blue-100">Total Following</div>
        </div>

        <div className="bg-white dark:bg-[#161616] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{followingData.mutual}</div>
          <div className="text-gray-600 dark:text-gray-400">Mutual Follows</div>
          <div className="text-green-600 dark:text-green-400 text-sm mt-1">+5 this month</div>
        </div>

        <div className="bg-white dark:bg-[#161616] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{followingData.recentlyAdded}</div>
          <div className="text-gray-600 dark:text-gray-400">Recently Added</div>
          <div className="text-blue-600 dark:text-blue-400 text-sm mt-1">Active connections</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search following..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Following</option>
              <option value="mutual">Mutual Only</option>
              <option value="verified">Verified</option>
              <option value="recent">Recently Active</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user?.id}
              user={user}
              onUnfollow={handleUnfollow}
              onMessage={handleMessage}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No users found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm ? 'Try adjusting your search terms' : 'You are not following anyone yet'}
            </p>
          </div>
        )}
      </div>

      {/* Load More */}
      {filteredUsers.length > 0 && (
        <div className="text-center">
          <button className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all">
            Load More
          </button>
        </div>
      )}
    </motion.div>
  );
}

FollowingTab.propTypes = {
  tabVariants: PropTypes.object.isRequired,
};