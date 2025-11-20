import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
  Filter,
  TrendingUp
} from 'lucide-react';

// Mock followers data
const followersData = {
  total: 1242,
  newThisWeek: 24,
  mutual: 89,
  users: [
    {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "Jennifer Lopez",
      username: "jenniferl",
      bio: "Data Scientist | Machine Learning Enthusiast",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: true,
      isFollowing: false,
      isMutual: false,
      location: "Los Angeles, CA",
      profession: "Data Scientist",
      followers: 567,
      following: 234,
      joinedDate: "2023-01-10",
      lastActive: "1 hour ago",
      expertise: ["Python", "SQL", "Machine Learning", "Data Analysis"],
      isNew: true
    },
    {
      id: "672bc14f5ed2c93a10f485v5",
      name: "Robert Kim",
      username: "robertk",
      bio: "DevOps Engineer | Cloud Infrastructure Specialist",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: false,
      isFollowing: true,
      isMutual: true,
      location: "Denver, CO",
      profession: "DevOps Engineer",
      followers: 789,
      following: 156,
      joinedDate: "2022-08-15",
      lastActive: "3 hours ago",
      expertise: ["AWS", "Docker", "Kubernetes", "Terraform"],
      isNew: false
    },
    {
      id: "672bc14f5ed2c93a10f485v5",
      name: "Dr. Maria Garcia",
      username: "mariag",
      bio: "AI Research Scientist | NLP Expert",
      avatar: "https://images.unsplash.com/photo-1489883671924-8d0d445b891d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: true,
      isFollowing: false,
      isMutual: false,
      location: "Seattle, WA",
      profession: "Research Scientist",
      followers: 1345,
      following: 89,
      joinedDate: "2021-11-20",
      lastActive: "5 hours ago",
      expertise: ["NLP", "Deep Learning", "Research", "Python"],
      isNew: true
    },
    {
      id: "672bc14f5ed2c93a10f485v5",
      name: "James Wilson",
      username: "jamesw",
      bio: "Mobile Developer | React Native & Flutter",
      avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: false,
      isFollowing: true,
      isMutual: true,
      location: "Miami, FL",
      profession: "Mobile Developer",
      followers: 923,
      following: 278,
      joinedDate: "2022-03-05",
      lastActive: "1 day ago",
      expertise: ["React Native", "Flutter", "iOS", "Android"],
      isNew: false
    },
    {
      id: "672bc14f5ed2c93a10f485v5",
      name: "Amanda Chen",
      username: "amandac",
      bio: "UX Designer | Product Design Specialist",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: true,
      isFollowing: false,
      isMutual: false,
      location: "Portland, OR",
      profession: "UX Designer",
      followers: 1567,
      following: 345,
      joinedDate: "2020-12-18",
      lastActive: "2 days ago",
      expertise: ["UX Design", "Figma", "User Research", "Prototyping"],
      isNew: false
    },
    {
      id: "672bc14f5ed2c93a10f485v5",
      name: "Daniel Brown",
      username: "danielb",
      bio: "Backend Engineer | System Architecture",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: false,
      isFollowing: true,
      isMutual: true,
      location: "Chicago, IL",
      profession: "Backend Engineer",
      followers: 1123,
      following: 189,
      joinedDate: "2021-07-22",
      lastActive: "6 hours ago",
      expertise: ["Java", "Spring Boot", "Microservices", "SQL"],
      isNew: true
    }
  ]
};

// Follower Card Component
const FollowerCard = ({ user, onFollow, onRemove, onMessage }) => {
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
              {user.isNew && (
                <span className="px-2 py-1 bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400 text-xs rounded-full">
                  New
                </span>
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
            <span>Active: {user.lastActive}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMessage(user.id)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            Message
          </motion.button>

          {user.isFollowing ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onRemove(user.id)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              <UserMinus className="w-4 h-4" />
              Unfollow
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onFollow(user.id)}
              className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              <UserPlus className="w-4 h-4" />
              Follow Back
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

FollowerCard.propTypes = {
  user: PropTypes.object.isRequired,
  onFollow: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onMessage: PropTypes.func.isRequired
};

export default function FollowersTab({ tabVariants }) {
  const [followers, setFollowers] = useState(followersData.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredUsers = followers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" ||
      (filter === "mutual" && user.isMutual) ||
      (filter === "verified" && user.isVerified) ||
      (filter === "new" && user.isNew) ||
      (filter === "following" && user.isFollowing);

    return matchesSearch && matchesFilter;
  });

  const handleFollow = (userId) => {
    setFollowers(prev => prev.map(user =>
      user.id === userId ? { ...user, isFollowing: true, isMutual: true } : user
    ));
  };

  const handleRemove = (userId) => {
    setFollowers(prev => prev.map(user =>
      user.id === userId ? { ...user, isFollowing: false, isMutual: false } : user
    ));
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="text-3xl font-bold">{followersData.total}</div>
          <div className="text-blue-100">Total Followers</div>
        </div>

        <div className="bg-white dark:bg-[#161616] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{followersData.newThisWeek}</div>
          <div className="text-gray-600 dark:text-gray-400">New This Week</div>
          <div className="text-green-600 dark:text-green-400 text-sm mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +12% growth
          </div>
        </div>

        <div className="bg-white dark:bg-[#161616] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{followersData.mutual}</div>
          <div className="text-gray-600 dark:text-gray-400">Mutual Follows</div>
          <div className="text-blue-600 dark:text-blue-400 text-sm mt-1">You follow back</div>
        </div>

        <div className="bg-white dark:bg-[#161616] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {followers.filter(f => f.isVerified).length}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Verified</div>
          <div className="text-purple-600 dark:text-purple-400 text-sm mt-1">Influential accounts</div>
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
                placeholder="Search followers..."
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
              <option value="all">All Followers</option>
              <option value="mutual">Mutual Only</option>
              <option value="verified">Verified</option>
              <option value="new">New Followers</option>
              <option value="following">You Follow Back</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <FollowerCard
              key={user.id}
              user={user}
              onFollow={handleFollow}
              onRemove={handleRemove}
              onMessage={handleMessage}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No followers found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm ? 'Try adjusting your search terms' : 'You dont have any followers yet'}
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

FollowersTab.propTypes = {
  tabVariants: PropTypes.object.isRequired,
};