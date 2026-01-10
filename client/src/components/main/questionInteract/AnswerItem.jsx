import PropTypes from "prop-types";
import { useState } from "react";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  CheckCircle,
  Eye,
  Save,
  X
} from "lucide-react";
import { Link } from "react-router-dom";
import MediaPreview from "./answerInteract/MediaPreview"; // Updated import
import CommentSection from "./CommentSection";
import AnswerMenu from "./answerInteract/AnswerMenu";
import ReadMoreText from "./answerInteract/ReadMoreText"; // New import
import { useSnackbar } from "notistack";

function AnswerItem({
  answer,
  currentUserId,
  onVote,
  onLike,
  onShare,
  onDelete,
  onUpdate,
  isDeleting = false
}) {
  const [showComments, setShowComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(answer.content);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(answer.upvotes.includes(currentUserId));
  const [isLiked, setIsLiked] = useState(answer.likes.includes(currentUserId));
  const [upvotesCount, setUpvotesCount] = useState(answer.upvotes.length);
  const [likesCount, setLikesCount] = useState(answer.likes.length);

  const { enqueueSnackbar } = useSnackbar();

  const handleUpvote = () => {
    if (!currentUserId) {
      enqueueSnackbar("Please login to vote", { variant: "warning" });
      return;
    }

    const newUpvoted = !isUpvoted;
    setIsUpvoted(newUpvoted);
    setUpvotesCount(prev => newUpvoted ? prev + 1 : prev - 1);

    if (onVote) {
      onVote(answer._id, "upvote");
    }
  };

  const handleLike = () => {
    if (!currentUserId) {
      enqueueSnackbar("Please login to like", { variant: "warning" });
      return;
    }

    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikesCount(prev => newLiked ? prev + 1 : prev - 1);

    if (onLike) {
      onLike(answer._id);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (!editedContent.trim()) {
      enqueueSnackbar("Answer content cannot be empty", { variant: "warning" });
      return;
    }

    setIsUpdating(true);
    try {
      if (onUpdate) {
        await onUpdate(answer._id, { content: editedContent.trim() });
        setIsEditing(false);
        enqueueSnackbar("Answer updated successfully", { variant: "success" });
      }
    } catch (error) {
      console.log(error)
      enqueueSnackbar("Failed to update answer", { variant: "error" });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedContent(answer.content);
    setIsEditing(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-4">
      {/* Answer Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Link
            to={`/main/profile/${answer.author?.username}`}
            className="flex items-center gap-2 hover:opacity-80"
          >
            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-[#07C5B9]/20 flex items-center justify-center">
              <span className="font-semibold text-orange-500 dark:text-[#07C5B9]">
                {answer.author?.profile?.firstName?.[0] || "U"}
              </span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                {answer.author?.profile?.firstName} {answer.author?.profile?.lastName}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(answer.createdAt)}
                {answer.updatedAt > answer.createdAt && " · Edited"}
              </p>
            </div>
          </Link>

          {answer.aiAccuracy >= 80 && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs">
              <CheckCircle size={12} />
              AI Verified ({answer.aiAccuracy}%)
            </span>
          )}
        </div>

        {/* Menu Button */}
        {currentUserId && (
          <AnswerMenu
            answerId={answer._id}
            authorId={answer.author?._id}
            currentUserId={currentUserId}
            onDelete={onDelete}
            onEdit={handleEdit}
            isDeleting={isDeleting}
          />
        )}
      </div>

      {/* Answer Content - Edit Mode */}
      {isEditing ? (
        <div className="mb-4">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-[#07C5B9] resize-none min-h-[150px]"
            rows="5"
            disabled={isUpdating}
          />

          {answer.media && answer.media.length > 0 && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Media files (editing media not supported yet):
              </p>
              <MediaPreview media={answer.media} />
            </div>
          )}

          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={handleSaveEdit}
              disabled={isUpdating || !editedContent.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 dark:bg-[#07C5B9] dark:hover:bg-[#06b4a8] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>

            <button
              onClick={handleCancelEdit}
              disabled={isUpdating}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        /* Answer Content - View Mode */
        <div className="mb-4 min-h-[120px]">
          <ReadMoreText
            text={answer.content}
            maxLength={500}
          />

          <MediaPreview media={answer.media} />
        </div>
      )}

      {/* Answer Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Eye size={14} />
            {answer.views || 0} views
          </div>
          {answer.shares > 0 && (
            <div className="flex items-center gap-1">
              <Share2 size={14} />
              {answer.shares} shares
            </div>
          )}
        </div>
      </div>

      {/* Answer Actions */}
      {!isEditing && (
        <div className="flex items-center gap-2 border-t border-gray-200 dark:border-gray-700 pt-3">
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isUpvoted
                ? "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
          >
            <ThumbsUp size={18} fill={isUpvoted ? "currentColor" : "none"} />
            {upvotesCount}
          </button>

          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isLiked
                ? "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
          >
            <ThumbsUp size={18} fill={isLiked ? "currentColor" : "none"} />
            {likesCount}
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <MessageCircle size={18} />
            {answer.comments?.length || 0} Comments
          </button>

          <button
            onClick={() => onShare && onShare(answer._id)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ml-auto"
          >
            <Share2 size={18} />
            Share
          </button>
        </div>
      )}

      {/* Comments Section */}
      {showComments && answer.comments && (
        <CommentSection
          comments={answer.comments}
          answerId={answer._id}
          currentUserId={currentUserId}
        />
      )}
    </div>
  );
}

AnswerItem.propTypes = {
  answer: PropTypes.object.isRequired,
  currentUserId: PropTypes.string,
  onVote: PropTypes.func,
  onLike: PropTypes.func,
  onShare: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool
};

export default AnswerItem;