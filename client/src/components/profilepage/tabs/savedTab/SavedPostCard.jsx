import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import PropTypes from "prop-types";
import {
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import QuestionMedia from "./QuestionMedia";
import QuestionStats from "./QuestionStats";
import QuestionActions from "./QuestionActions";
import {Link, useNavigate} from "react-router-dom";

// Avatar Component
export const Avatar = ({ src, alt, className = "" }) => {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`rounded-full object-cover ${className}`}
      />
    );
  }

  // Fallback to initials
  const initials = alt?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  return (
    <div className={`rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold ${className}`}>
      {initials}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string
};

export default function SavedPostCard ({ post, onClick, onUnsave }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate()

  const handleExpandClick = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-[#161616] rounded-xl border border-gray-200 dark:border-gray-800/50 p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col h-full min-h-[280px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Avatar
            src={post.author?.profile?.profilePicture}
            alt={`${post.author?.profile?.firstName} ${post.author?.profile?.lastName}`}
            className="!h-8 !w-8"
            onClick={() => navigate(`/users/${post?.author?._id}`)}
          />

          <Link
            to={`/users/${post?.author?._id}`}
            aria-label={`Open post by ${post?.author?.profile?.firstName} ${post?.author?.profile?.lastName}`}
            className="text-left p-0 m-0 bg-transparent border-0 focus:outline-none"
          >
            <div className="cursor-pointer">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {post?.author?.profile?.firstName} {post?.author?.profile?.lastName}
                </span>
                {post?.author?.isVerified && (
                  <span className="text-blue-500 dark:text-[#07C5B9] text-xs">✓</span>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                @{post?.author?.username}
              </p>
            </div>
          </Link>

        </div>

        <div className="text-xs text-gray-400 dark:text-gray-500">
          {new Date(post?.createdAt || Date.now()).toLocaleDateString()}
        </div>
      </div>

      {/* Content Area - Flexible */}
      <div className="flex-1 flex flex-col">
        {/* Question Content */}
        <button
          type="button"
          className="mb-3 flex-1 text-left cursor-pointer"
          onClick={() => onClick(post)}
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-500 dark:group-hover:text-[#07C5B9] transition-colors">
            {post.title}
          </h3>

          <p className={`text-sm text-gray-600 dark:text-gray-300 ${isExpanded ? '' : 'line-clamp-3'}`}>
            {post.content}
          </p>
        </button>


        {/* Media Preview */}
        {post.media && post.media.length > 0 && (
          <div className="mb-3 flex-shrink-0">
            <QuestionMedia media={post?.media} />
          </div>
        )}

        {/* Topics */}
        {post.topics && post.topics.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2 mb-3 flex-shrink-0">
            {post.topics.slice(0, 5).map((topic, index) => (
              <span
                key={index * 0.5}
                className="px-2 py-1 bg-blue-100 dark:bg-[#07C5B9]/20 text-blue-800 dark:text-[#07C5B9] text-xs rounded-full"
              >
                {topic}
              </span>
            ))}
            {post.topics.length > 5 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                +{post.topics.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Expand Button - Only show if content is long enough */}
        {post.content.length > 150 && (
          <div className="flex justify-center mb-3 flex-shrink-0">
            <button
              onClick={handleExpandClick}
              className="flex items-center gap-1 px-3 py-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 group/expand"
            >
              {isExpanded ? (
                <>
                  <span>Show less</span>
                  <ChevronUp className="w-3 h-3 group-hover/expand:translate-y-[-1px] transition-transform" />
                </>
              ) : (
                <>
                  <span>Read more</span>
                  <ChevronDown className="w-3 h-3 group-hover/expand:translate-y-[1px] transition-transform" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Stats and Actions - Always at bottom */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-800 gap-3 flex-shrink-0">
        <QuestionStats question={post} />
        <QuestionActions question={post} onUnsave={onUnsave} />
      </div>
    </motion.div>
  );
};

SavedPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onUnsave: PropTypes.func.isRequired
};