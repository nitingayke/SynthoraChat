import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThumbsUp, Eye, Share2, ArrowBigUp, MessageCircle, Pencil, Trash2, Hash, Loader2 } from "lucide-react";
import Avatar from "@mui/material/Avatar";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useSnackbar } from "notistack";

import AuthContext from "../../../context/AuthContext";
import UIStateContext from "../../../context/UIStateContext";
import MediaDialog from "./MediaDialog"
import ExpandableText from "../common/ExpandableText";
import AnswerComment from "./AnswerComment";

import {
  toggleLikeAnswerService,
  toggleUpvoteAnswerService,
  deleteAnswerService,
  editAnswerService,
  addAnswerCommentService,
} from "../../../services/answer.service";
import { formatCount } from "../../../utils/formatCount";
import { shareContent } from "../../../services/share.service";
import { timeAgo } from "../../../utils/date";

export default function AnswerCard({ answer, allowComments }) {

  const { loginUser } = useContext(AuthContext);
  const { isAuthorize } = useContext(UIStateContext);
  const { enqueueSnackbar } = useSnackbar();

  const [likes, setLikes] = useState(answer.likes || []);
  const [upvotes, setUpvotes] = useState(answer.upvotes || []);
  const [comments, setComments] = useState(answer.comments || []);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(answer.content || "");

  const [isLoading, setIsLoading] = useState({
    like: false,
    upvote: false,
    delete: false,
    edit: false,
    comment: false,
  });

  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    setLikes(answer?.likes || []);
    setUpvotes(answer?.upvotes || []);
    setComments(answer?.comments || []);

    setEditedContent(answer?.content || "");
  }, [answer]);

  const userId = loginUser?._id;
  const author = answer?.author || {};
  const isOwner = loginUser?._id === author?._id;
  const fullName =
    author?.profile?.firstName || author?.profile?.lastName
      ? `${author?.profile?.firstName || ""} ${author?.profile?.lastName || ""
        }`.trim()
      : author?.username || "Unknown User";

  const isEdited =
    answer?.updatedAt &&
    answer?.createdAt &&
    new Date(answer.updatedAt).getTime() >
    new Date(answer.createdAt).getTime();


  const isLiked = userId ? likes.includes(userId) : false;
  const isUpvoted = userId ? upvotes.includes(userId) : false;

  const handleLikeAnswer = async () => {

    if (!isAuthorize()) return;

    try {
      setIsLoading((p) => ({ ...p, like: true }));

      await toggleLikeAnswerService(answer._id);
    } catch {
      enqueueSnackbar("Failed to like answer", { variant: "error" });
    } finally {
      setIsLoading((p) => ({ ...p, like: false }));
    }
  };

  const handleUpvoteAnswer = async () => {
    if (!isAuthorize()) return;

    try {
      setIsLoading((p) => ({ ...p, upvote: true }));
      await toggleUpvoteAnswerService(answer._id);
    } catch {
      enqueueSnackbar("Failed to upvote answer", { variant: "error" });
    } finally {
      setIsLoading((p) => ({ ...p, upvote: false }));
    }
  };

  const handleDeleteAnswer = async () => {
    if (!isAuthorize()) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this answer?\n\n" +
      "⚠️ This action is permanent. All likes and upvotes on this answer will be lost."
    );
    if (!confirmDelete) return;

    try {
      setIsLoading(p => ({ ...p, delete: true }));

      await deleteAnswerService(answer._id);

      enqueueSnackbar("Answer deleted", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || "Failed to delete answer", { variant: "error" });
    } finally {
      setIsLoading(p => ({ ...p, delete: false }));
    }
  };

  const handleSaveEdit = async () => {
    if (!isAuthorize()) return;

    const newContent = editedContent.trim();
    const oldContent = answer.content.trim();

    if (newContent.length === 0) {
      enqueueSnackbar("Answer cannot be empty", { variant: "error" });
      return;
    }

    if (newContent === oldContent) {
      enqueueSnackbar("No changes detected", { variant: "info" });
      setIsEditing(false);
      return;
    }

    try {
      setIsLoading(p => ({ ...p, edit: true }));

      await editAnswerService(answer._id, {
        content: newContent,
      });

      enqueueSnackbar("Answer updated successfully", { variant: "success" });
      setIsEditing(false);
    } catch {
      enqueueSnackbar("Failed to update answer", { variant: "error" });
    } finally {
      setIsLoading(p => ({ ...p, edit: false }));
    }
  };

  const handleCancelEdit = () => {
    setEditedContent(answer.content);
    setIsEditing(false);
  };

  const handleShareAnswer = async () => {
    await shareContent({
      title: "Question Answer",
      text: answer.content?.slice(0, 120) || "Check out this question",
      url: `${window.location}/answer/${answer._id}`,
    });
  };

  const handleSubmitComment = async () => {

    if (!isAuthorize()) return;

    const text = commentInput.trim();
    if (!text) return;

    if (text.length > 1000) {
      enqueueSnackbar("Comment should be less than 1000 characters.", { variant: 'error' });
      return;
    }

    try {
      setIsLoading(prev => ({ ...prev, comment: true }));

      await addAnswerCommentService(answer?._id, {
        content: text
      });
      setCommentInput("");
      enqueueSnackbar("Comment added", { variant: "success" });
    } catch {
      enqueueSnackbar("Failed to add comment", { variant: "error" });
    } finally {
      setIsLoading(p => ({ ...p, comment: false }));
    }
  }

  return (
    <div className="rounded-xl border p-3 sm:p-4 bg-gray-100 dark:bg-[#111] border-gray-200 dark:border-[#222] shadow-sm">

      <div className="flex items-start gap-4">
        <Avatar
          alt={fullName}
          src={author?.profile?.profilePicture || ""}
          sx={{ width: 45, height: 45 }}
        />

        <div className="flex-1">
          <Link
            to={`/main/profile/${author?.username}`}
            className="font-semibold text-sm text-gray-900 dark:text-gray-100 hover:text-[#07C5B9]"
          >
            {fullName}
          </Link>

          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <span>{timeAgo(answer?.createdAt)}</span>

            {isEdited && (
              <span className="italic text-gray-400 dark:text-gray-500">
                (edited)
              </span>
            )}
          </div>
        </div>

        {isOwner && (
          <div className="flex items-center gap-2">
            {!isEditing && <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-md bg-gray-200 dark:bg-[#212121] text-gray-800 dark:text-white hover:bg-gray-300/80 dark:hover:bg-[#272727]"
            >
              <Pencil size={16} />
            </button>}

            <button
              onClick={handleDeleteAnswer}
              disabled={isLoading.delete}
              className="p-2 rounded-md bg-gray-200 dark:bg-[#212121] text-gray-800 dark:text-white hover:bg-gray-300/80 dark:hover:bg-[#272727] hover:text-red-500"
            >
              {isLoading.delete ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Trash2 size={16} />
              )}
            </button>
          </div>
        )}
      </div>

      <hr className="my-2 text-gray-300/50 dark:text-[#191919]" />

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full min-h-[120px] p-2 rounded-md border border-gray-300 dark:border-[#222] bg-white dark:bg-[#191919] text-gray-900 dark:text-gray-100 focus:outline-none"
          />

          <div className="flex gap-2 justify-end text-sm">
            <button
              onClick={handleCancelEdit}
              className="px-3 py-1 rounded-md bg-gray-200 dark:bg-[#202020] hover:bg-gray-300/80 dark:hover:bg-[#272727]"
            >
              Cancel
            </button>

            <button
              onClick={handleSaveEdit}
              disabled={isLoading.edit}
              className="px-3 py-1 rounded-md bg-orange-500 dark:bg-[#07C5B9] text-white disabled:opacity-50 flex items-center gap-2 hover:opacity-80"
            >
              {isLoading.edit ? <Loader2 size={16} className="animate-spin" /> : "Save"}
            </button>
          </div>
        </div>
      ) : (
        <ExpandableText text={answer?.content} lines={6} />
      )}

      {answer?.media?.length > 0 && (
        <div className="mt-3">
          <MediaDialog media={answer.media} />
        </div>
      )}

      <div className="mt-4 flex flex-wrap justify-between sm:justify-start items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
        <button
          onClick={handleLikeAnswer}
          disabled={isLoading.like}
          className={`flex items-center gap-1 px-2 py-1.5 rounded-md ${isLiked ? "text-red-500 bg-red-500/10 border-red-500/50" : "bg-gray-200 dark:bg-[#202020] text-gray-600 dark:text-gray-400 hover:bg-gray-300/80 dark:hover:bg-[#272727]"} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isLoading.like
            ? <Loader2 size={16} className="animate-spin" />
            : <ThumbsUp size={16} />}
          <span className="mt-0.5">{formatCount(likes?.length || 0)}</span>
        </button>

        <button
          onClick={handleUpvoteAnswer}
          disabled={isLoading.upvote}
          className={`flex items-center gap-1 px-2 py-1.5 rounded-md ${isUpvoted ? "text-green-500 bg-green-500/10 border-green-500/50" : "bg-gray-200 dark:bg-[#202020] text-gray-600 dark:text-gray-400 hover:bg-gray-300/80 dark:hover:bg-[#272727]"} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isLoading.upvote
            ? <Loader2 size={16} className="animate-spin" />
            : <ArrowBigUp size={16} />}
          <span className="mt-0.5">{(upvotes?.length || 0)}</span>
        </button>

        <button
          onClick={handleShareAnswer}
          className="flex items-center gap-1 px-2 py-1.5 rounded-md bg-gray-200 dark:bg-[#202020]  hover:bg-gray-300/80 dark:hover:bg-[#272727] disabled:opacity-50"
        >
          <Share2 size={16} />
          <span className="mt-0.5">{formatCount(answer?.shares || 0)}</span>
        </button>

        {/* VIEWS */}
        <span className="flex items-center gap-1">
          <Eye size={16} />
          <span>{formatCount(answer?.views || 0)}</span>
        </span>

        {/* AI ACCURACY */}
        <span
          className={`
            flex items-center gap-1 font-semibold 
            ${answer.aiAccuracy >= 0 ? "" : "hidden"}
            dark:text-[#07C5B9] 
            text-orange-500
          `}
        >
          <span className="hidden sm:flex">AI Accuracy:</span> {answer?.aiAccuracy}%
        </span>

        {allowComments && <button
          className="flex items-center gap-1 hover:text-[#07C5B9]"
          onClick={() => setShowComments((prev) => !prev)}
        >
          <MessageCircle size={14} />
          {formatCount(comments?.length || 0)}
          <span className="hidden sm:flex">Comments</span>
        </button>}
      </div>

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="mt-4 overflow-hidden space-y-4 border-t pt-3 border-gray-200 dark:border-[#222]"
          >
            <h1 className="my-2 flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white cursor-pointer font-semibold w-fit"><Hash size={20} />COMMENTS <span>({comments?.length || 0})</span></h1>

            <div className="flex-1">
              <textarea
                value={commentInput}
                disabled={isLoading.comment}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Write a comment..."
                maxLength={1000}
                className="w-full min-h-[70px] p-2 rounded-md border border-gray-300 dark:border-[#222] bg-white dark:bg-[#191919] text-gray-900 dark:text-gray-100 focus:outline-none disabled:cursor-not-allowed"
              />

              <div className="flex justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {commentInput.length}/1000
                </span>

                <button
                  onClick={handleSubmitComment}
                  disabled={commentInput.trim().length === 0 || isLoading.comment}
                  className="px-3 py-1 text-sm rounded-md bg-orange-500 dark:bg-[#07C5B9]  hover:opacity-80 text-white disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                >
                  {isLoading.comment ? (
                    <Loader2 size={16} className="animate-spin m-0.5" />
                  ) : (
                    "Post"
                  )}
                </button>
              </div>
            </div>

            <hr className="opacity-10" />

            <AnswerComment answerId={answer?._id} comments={answer?.comments || []} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

AnswerCard.propTypes = {
  answer: PropTypes.object.isRequired,
  allowComments: PropTypes.bool.isRequired
};
