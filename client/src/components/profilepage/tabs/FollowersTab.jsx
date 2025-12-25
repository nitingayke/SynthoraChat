import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import PropTypes from "prop-types";
import { followersData } from "../../../data/mockUserData";
import {
  Users,
  Search,
  Filter,
  TrendingUp
} from 'lucide-react';
import FollowerCard from "./followersTab/FollowerCard";


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