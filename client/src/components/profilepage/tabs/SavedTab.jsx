import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import PropTypes from "prop-types";
import {
  Bookmark
} from 'lucide-react';
import SavedPostCard from "./savedTab/SavedPostCard";
import { sampleSavedPosts } from "../../../data/sampleSavedposts";
import PostDetailModal from "./savedTab/PostDetailModal";

export default function SavedTab({ tabVariants }) {
  const [savedPosts, setSavedPosts] = useState(sampleSavedPosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleUnsavePost = (postId) => {
    setSavedPosts(prev => prev.filter(post => post.id !== postId));
    if (selectedPost?.id === postId) {
      handleCloseModal();
    }
  };

  return (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Posts</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {savedPosts.length} posts saved for later
          </p>
        </div>

        {/* Filter Options */}
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Saved</option>
            <option>Recently Saved</option>
            <option>Most Popular</option>
            <option>By Topic</option>
          </select>
        </div>
      </div>

      {/* Saved Posts Grid */}
      {savedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedPosts.map((post) => (
            <SavedPostCard
              key={post?.id}
              post={post}
              onClick={handlePostClick}
              onUnsave={handleUnsavePost}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Saved Posts</h3>
          <p className="text-gray-600 dark:text-gray-400">Posts you save will appear here</p>
        </div>
      )}

      {/* Post Detail Modal */}
      <PostDetailModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUnsave={handleUnsavePost}
      />
    </motion.div>
  );
}

SavedTab.propTypes = {
  tabVariants: PropTypes.object.isRequired,
};