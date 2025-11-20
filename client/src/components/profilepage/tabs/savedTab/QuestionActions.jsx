import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Bookmark,
  Share2,
  MoreHorizontal,
  Copy,
  Download,
  Flag,
  Link,
  MessageCircle,
  Send,
  Check
} from 'lucide-react';

// Share Options Dialog Component
const ShareDialog = ({ isOpen, onClose, post }) => {
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    {
      icon: Copy,
      label: "Copy Link",
      action: () => {
        const postUrl = `${window.location.origin}/post/${post.id}`;
        navigator.clipboard.writeText(postUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    },
    {
      icon: Send,
      label: "Share via Email",
      action: () => {
        const subject = `Check out this post: ${post.title}`;
        const body = `I thought you might be interested in this: ${post.title}\n\n${window.location.origin}/post/${post.id}`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        onClose();
      }
    },
    {
      icon: MessageCircle,
      label: "Share to Messages",
      action: () => {
        const text = `Check out this post: ${post.title} - ${window.location.origin}/post/${post.id}`;
        if (navigator.share) {
          navigator.share({
            title: post.title,
            text: post.content.substring(0, 100),
            url: `${window.location.origin}/post/${post.id}`,
          });
        } else {
          navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
        onClose();
      }
    },
    {
      icon: Download,
      label: "Download as Image",
      action: () => {
        // In a real app, you would generate and download an image of the post
        console.log("Downloading post as image:", post.id);
        onClose();
      }
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 w-64 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Share Post</h3>

        <div className="space-y-2">
          {shareOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className="w-full flex items-center gap-3 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <option.icon className="w-4 h-4" />
              <span className="text-sm">{option.label}</span>
            </button>
          ))}
        </div>

        {copied && (
          <div className="mt-3 p-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm flex items-center gap-2">
            <Check className="w-4 h-4" />
            Link copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
};

ShareDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

// More Options Dialog Component
const MoreOptionsDialog = ({ isOpen, onClose, post, onUnsave }) => {
  const [showUnsaveConfirm, setShowUnsaveConfirm] = useState(false);

  const options = [
    {
      icon: Flag,
      label: "Report Post",
      action: () => {
        console.log("Reporting post:", post.id);
        // Implement report functionality
        onClose();
      },
      color: "text-red-600 dark:text-red-400"
    },
    {
      icon: Download,
      label: "Save to Bookmarks",
      action: () => {
        console.log("Saving to bookmarks:", post.id);
        onClose();
      },
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Link,
      label: "Copy Post ID",
      action: () => {
        navigator.clipboard.writeText(post.id.toString());
        onClose();
      },
      color: "text-gray-600 dark:text-gray-400"
    }
  ];

  const handleUnsaveConfirm = () => {
    onUnsave(post.id);
    setShowUnsaveConfirm(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 w-64 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {!showUnsaveConfirm ? (
          <>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">More Options</h3>

            <div className="space-y-2">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={option.action}
                  className={`w-full flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ${option.color}`}
                >
                  <option.icon className="w-4 h-4" />
                  <span className="text-sm">{option.label}</span>
                </button>
              ))}

              <button
                onClick={() => setShowUnsaveConfirm(true)}
                className="w-full flex items-center gap-3 p-2 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/20 rounded-lg transition-colors"
              >
                <Bookmark className="w-4 h-4 fill-current" />
                <span className="text-sm">Remove from Saved</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Remove from Saved?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Are you sure you want to remove this post from your saved items?
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setShowUnsaveConfirm(false)}
                className="flex-1 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleUnsaveConfirm}
                className="flex-1 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
              >
                Remove
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

MoreOptionsDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  onUnsave: PropTypes.func.isRequired
};

// Confirmation Dialog Component
const UnsaveConfirmationDialog = ({ isOpen, onClose, onConfirm, post }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 w-80 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Remove from Saved?</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Are you sure you want to remove "<span className="font-medium text-gray-900 dark:text-white">{post.title}</span>" from your saved items?
        </p>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

UnsaveConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

// Main QuestionActions Component
export default function QuestionActions({ question, onUnsave }) {
  const [showUnsaveConfirm, setShowUnsaveConfirm] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showMoreDialog, setShowMoreDialog] = useState(false);

  const handleUnsaveClick = (e) => {
    e.stopPropagation();
    setShowUnsaveConfirm(true);
  };

  const handleUnsaveConfirm = () => {
    onUnsave(question.id);
    setShowUnsaveConfirm(false);
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    setShowShareDialog(true);
  };

  const handleMoreClick = (e) => {
    e.stopPropagation();
    setShowMoreDialog(true);
  };

  return (
    <>
      <div className="flex items-center gap-1">
        {/* Save/Unsave Button */}
        <button
          onClick={handleUnsaveClick}
          className="p-1.5 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/20 rounded-lg transition-colors group relative"
          title="Remove from saved"
        >
          <Bookmark className="w-3.5 h-3.5 fill-current" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
            <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs py-1 px-2 rounded-lg whitespace-nowrap">
              Remove from saved
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
            </div>
          </div>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShareClick}
          className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group relative"
          title="Share post"
        >
          <Share2 className="w-3.5 h-3.5" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
            <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs py-1 px-2 rounded-lg whitespace-nowrap">
              Share this post
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
            </div>
          </div>
        </button>

        {/* More Options Button */}
        <button
          onClick={handleMoreClick}
          className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group relative"
          title="More options"
        >
          <MoreHorizontal className="w-3.5 h-3.5" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
            <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs py-1 px-2 rounded-lg whitespace-nowrap">
              More options
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
            </div>
          </div>
        </button>
      </div>

      {/* Dialogs */}
      <UnsaveConfirmationDialog
        isOpen={showUnsaveConfirm}
        onClose={() => setShowUnsaveConfirm(false)}
        onConfirm={handleUnsaveConfirm}
        post={question}
      />

      <ShareDialog
        isOpen={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        post={question}
      />

      <MoreOptionsDialog
        isOpen={showMoreDialog}
        onClose={() => setShowMoreDialog(false)}
        post={question}
        onUnsave={onUnsave}
      />
    </>
  );
}

QuestionActions.propTypes = {
  question: PropTypes.object.isRequired,
  onUnsave: PropTypes.func.isRequired
};