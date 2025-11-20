// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from "prop-types";
import {
  Bookmark,
  X,
  Eye,
  ThumbsUp,
  MessageCircle,
  Share2,
  Check
} from 'lucide-react'; 
import { Avatar } from './SavedPostCard';

export default function PostDetailModal ({ post, isOpen, onClose, onUnsave }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-[#161616] rounded-2xl w-full max-w-2xl mx-auto shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col"
          style={{ maxHeight: '90vh' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Fixed */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161616] flex-shrink-0">
            <div className="flex items-center gap-3">
              <Avatar
                src={post.author?.profile?.profilePicture}
                alt={`${post.author?.profile?.firstName} ${post.author?.profile?.lastName}`}
                className="!h-10 !w-10"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                    {post.author?.profile?.firstName} {post.author?.profile?.lastName}
                  </h3>
                  {post.author?.isVerified && (
                    <Check className="w-4 h-4 text-blue-500 dark:text-[#07C5B9] flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  @{post.author?.username} • {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onUnsave(post.id)}
                className="p-2 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/20 rounded-lg transition-colors"
                title="Remove from saved"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {post.title}
              </h1>

              <div className="prose dark:prose-invert max-w-none mb-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {post.content}
                </p>
              </div>

              {/* Media */}
              {post.media && post.media.length > 0 && (
                <div className="mb-6">
                  <div className="grid grid-cols-1 gap-4">
                    {post.media.map((item, index) => (
                      <div key={index} className="relative rounded-xl overflow-hidden">
                        {item.type === 'image' && (
                          <img
                            src={item.url}
                            alt={item.alt}
                            className="w-full h-48 object-cover"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Topics */}
              {post.topics && post.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-[#07C5B9]/20 text-blue-800 dark:text-[#07C5B9] text-sm rounded-full border border-blue-200 dark:border-[#07C5B9]/30"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
                    <Eye className="w-4 h-4" />
                    <span className="font-semibold text-sm">{post.stats.views}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Views</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400 mb-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="font-semibold text-sm">{post.stats.upvotes}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Upvotes</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400 mb-1">
                    <MessageCircle className="w-4 h-4" />
                    <span className="font-semibold text-sm">{post.stats.answers}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Answers</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
                    <Bookmark className="w-4 h-4" />
                    <span className="font-semibold text-sm">{post.stats.saves}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Saves</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Fixed */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161616] flex-shrink-0">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm flex-1 justify-center">
                <ThumbsUp className="w-4 h-4" />
                Upvote ({post.stats.upvotes})
              </button>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors text-sm flex-1 justify-center">
                <MessageCircle className="w-4 h-4" />
                Answer
              </button>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors text-sm flex-1 justify-center">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

PostDetailModal.propTypes = {
  post: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUnsave: PropTypes.func.isRequired
};