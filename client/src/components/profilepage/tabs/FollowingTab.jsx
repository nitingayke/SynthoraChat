import React, { useState } from "react";

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import PropTypes from "prop-types";
import { followingData } from "../../../data/mockUserData";
import {
  Users,
  Search,
  Filter
} from 'lucide-react';
import UserCard from "./followingTab/UserCard";

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