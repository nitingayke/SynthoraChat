import PropTypes from "prop-types";
import { useState } from "react";
import { Send, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
function CommentSection({ comments = [], answerId, currentUserId }) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Handle comment submission
      console.log("Post comment:", newComment, "for answer:", answerId);
      setNewComment("");
    }
  };

  return (
    <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Comments</h4>

      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-[#07C5B9]"
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 dark:bg-[#07C5B9] dark:hover:bg-[#06b4a8] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment._id} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
            <div className="flex items-start justify-between mb-2">
              <Link
                to={`/main/profile/${comment.author?.username}`}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {comment.author?.profile?.firstName?.[0] || "U"}
                  </span>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                    {comment.author?.profile?.firstName} {comment.author?.profile?.lastName}
                  </h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>

              {comment.isAiGenerated && (
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  AI Generated
                </span>
              )}
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
              {comment.content}
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <button className="flex items-center gap-1 hover:text-orange-500 dark:hover:text-[#07C5B9]">
                <ThumbsUp size={12} />
                {comment.upvotes?.length || 0}
              </button>
              <button className="hover:text-orange-500 dark:hover:text-[#07C5B9]">
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

CommentSection.propTypes = {
  comments: PropTypes.array,
  answerId: PropTypes.string.isRequired,
  currentUserId: PropTypes.string
};

export default CommentSection;