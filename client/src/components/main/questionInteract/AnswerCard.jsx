import { ThumbsUp, Eye, Share2, ArrowBigUp, MessageCircle, Pencil, Trash2, Hash, Loader2 } from "lucide-react";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import AuthContext from "../../../context/AuthContext";
import MediaDialog from "./MediaDialog"
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useSnackbar } from "notistack";

export default function AnswerCard({ answer, allowComments }) {

  const { loginUser } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState({
    like: false,
    upvote: false,
    delete: false,
    edit: false,
    share: false,
    comment: false,
  });

  const [visibleComments, setVisibleComments] = useState(10);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const [upvotingCommentId, setUpvotingCommentId] = useState(null);


  const loadMore = () => {
    setVisibleComments((prev) => prev + 10);
  };

  const handleLikeAnswer = (id) => {
    setIsLoading(prev => ({ ...prev, like: true }));

    setTimeout(() => {
      setIsLoading(prev => ({ ...prev, like: false }));
    }, 1200);
  };

  const handleUpvoteAnswer = (id) => {
    setIsLoading(prev => ({ ...prev, upvote: true }));

    setTimeout(() => {
      setIsLoading(prev => ({ ...prev, upvote: false }));
    }, 1200);
  };

  const handleEditAnswer = (id) => {
    setIsLoading(prev => ({ ...prev, edit: true }));

    setTimeout(() => {
      setIsLoading(prev => ({ ...prev, edit: false }));
    }, 1200);
  };

  const handleDeleteAnswer = (id) => {
    setIsLoading(prev => ({ ...prev, delete: true }));

    setTimeout(() => {
      setIsLoading(prev => ({ ...prev, delete: false }));
    }, 1200);
  };

  const handleShareAnswer = (id) => {
    setIsLoading(prev => ({ ...prev, share: true }));

    setTimeout(() => {
      if (navigator.share) {
        navigator.share({
          title: "Answer",
          text: "Check out this answer!",
          url: window.location.href
        }).catch(() => { });
      } else {
        navigator.clipboard.writeText(window.location.href);
      }

      setIsLoading(prev => ({ ...prev, share: false }));
    }, 1000);
  };

  const handleSubmitComment = () => {
    if (commentInput.trim().length === 0) return;

    if (commentInput.length > 1000) {
      enqueueSnackbar("Comment should be less than 1000 characters.", { variant: 'error' });
      return;
    }

    setIsLoading(prev => ({ ...prev, comment: true }));

    setTimeout(() => {
      enqueueSnackbar("Comment posted successfully!", { variant: "success" });
      setCommentInput("");
      setIsLoading(prev => ({ ...prev, comment: false }));
    }, 3000);
  }

  const handleDeleteComment = async (commentId) => {
    if (!commentId) return;

    if (deletingCommentId) return;

    setDeletingCommentId(commentId);

    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));

      answer.comments = answer.comments.filter(c => c._id !== commentId);

      enqueueSnackbar("Comment deleted", { variant: "success" });
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Failed to delete comment. Please try again.", { variant: "error" });
    } finally {
      setDeletingCommentId(null);
    }
  };

  const handleUpvoteComment = async (commentId) => {

    if (!commentId) return;

    if (upvotingCommentId) return;

    setUpvotingCommentId(commentId);

    const idx = answer.comments.findIndex(c => c._id === commentId);
    if (idx === -1) {
      setUpvotingCommentId(null);
      return;
    }

    const comment = answer.comments[idx];
    const prevUpvotes = comment.upvotes ? [...comment.upvotes] : [];

    const hasUpvoted = comment.upvotes?.includes(loginUser?._id);
    if (hasUpvoted) {
      comment.upvotes = comment.upvotes.filter(id => id !== loginUser._id);
    } else {
      comment.upvotes = [...(comment.upvotes || []), loginUser._id];
    }

    try {
      await new Promise((r) => setTimeout(r, 1000));
    } catch (err) {
      comment.upvotes = prevUpvotes;
      console.log(err)
      enqueueSnackbar("Failed to upvote comment. Try again.", { variant: "error" });
    } finally {
      setUpvotingCommentId(null);
    }
  };


  const author = answer?.author || {};
  const isOwner = loginUser?._id === author?._id;
  const fullName =
    author?.profile?.firstName || author?.profile?.lastName
      ? `${author?.profile?.firstName || ""} ${author?.profile?.lastName || ""
        }`.trim()
      : author?.username || "Unknown User";

  return (
    <div className="rounded-xl border p-3 sm:p-5 bg-gray-100 dark:bg-[#111] border-gray-200 dark:border-[#222] shadow-sm">

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

          <div className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(answer?.createdAt).toLocaleString()}
          </div>
        </div>

        {isOwner && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleEditAnswer(answer?._id)}
              disabled={isLoading.edit}
              className="p-2 rounded-md bg-gray-200 dark:bg-[#212121] hover:bg-blue-800/30 text-gray-800 dark:text-white hover:text-blue-500"
            >
              {isLoading.edit ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Pencil size={16} />
              )}
            </button>

            <button
              onClick={() => handleDeleteAnswer(answer?._id)}
              disabled={isLoading.delete}
              className="p-2 rounded-md bg-gray-200 dark:bg-[#212121] hover:bg-red-200 dark:hover:bg-red-900/30 hover:text-red-500 text-gray-800 dark:text-white"
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

      <div className="mt-3 text-sm text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
        {answer?.content}
      </div>

      {answer?.media?.length > 0 && (
        <div className="mt-3">
          <MediaDialog media={answer.media} />
        </div>
      )}

      <div className="mt-4 flex flex-wrap justify-between sm:justify-start items-center gap-3 text-xs text-gray-600 dark:text-gray-400">

        <button
          onClick={() => handleLikeAnswer(answer?._id)}
          disabled={isLoading.like}
          className="flex items-center gap-1 px-2 py-1.5 rounded-md bg-gray-200 dark:bg-[#202020] hover:text-red-500 disabled:opacity-50"
        >
          {isLoading.like
            ? <Loader2 size={16} className="animate-spin" />
            : <ThumbsUp size={16} />}
          <span className="mt-0.5">{answer?.likes?.length || 0}</span>
        </button>

        <button
          onClick={() => handleUpvoteAnswer(answer?._id)}
          disabled={isLoading.upvote}
          className="flex items-center gap-1 px-2 py-1.5 rounded-md bg-gray-200 dark:bg-[#202020] hover:text-green-500 disabled:opacity-50"
        >
          {isLoading.upvote
            ? <Loader2 size={16} className="animate-spin" />
            : <ArrowBigUp size={16} />}
          <span className="mt-0.5">{answer?.upvotes?.length || 0}</span>
        </button>

        <button
          onClick={() => handleShareAnswer(answer?._id)}
          disabled={isLoading.share}
          className="flex items-center gap-1 px-2 py-1.5 rounded-md bg-gray-200 dark:bg-[#202020] hover:text-blue-500 disabled:opacity-50"
        >
          {isLoading.share
            ? <Loader2 size={16} className="animate-spin" />
            : <Share2 size={16} />}
          <span className="mt-0.5">{answer?.shares || 0}</span>
        </button>

        {/* VIEWS */}
        <span className="flex items-center gap-1">
          <Eye size={16} />
          <span>{answer?.views || 0}</span>
        </span>

        {/* AI ACCURACY */}
        <span
          className={`
            flex items-center gap-1 font-semibold 
            ${answer.aiAccuracy > 0 ? "" : "hidden"}
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
          <MessageCircle size={16} />
          {answer?.comments?.length || 0}
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
            <h1 className="my-2 flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white cursor-pointer font-semibold w-fit"><Hash size={20} />COMMENTS <span>({answer?.comments?.length || 0})</span></h1>

            <div className="flex-1">
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Write a comment..."
                maxLength={1000}
                className="w-full min-h-[70px] p-2 rounded-md border border-gray-300 dark:border-[#222] bg-white dark:bg-[#191919] text-gray-900 dark:text-gray-100 focus:outline-none"
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

            {answer.comments.length === 0 && (
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
                No comments yet — start the conversation!
              </p>
            )}

            {answer.comments.slice(0, visibleComments).map((comment, index) => {
              const hasUpvoted = comment?.upvotes?.includes(loginUser?._id);

              return (
                <div key={index * 0.12457}>

                  <div className="relative gap-3 flex items-center">
                    <Avatar
                      sx={{ width: 35, height: 35 }}
                      src={comment?.author?.profile?.profilePicture || ""}
                    />

                    <div>
                      <Link
                        to={`/main/profile/${author?.username}`}
                        className="font-semibold text-sm text-gray-900 dark:text-gray-100 hover:text-[#07C5B9]"
                      >
                        {comment?.author?.profile?.firstName
                          ? `${comment.author.profile.firstName} ${comment.author.profile.lastName}`
                          : comment?.author?.username || "User"}
                      </Link>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(comment.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="absolute right-0 top-0 flex gap-1">
                      <button
                        onClick={() => handleUpvoteComment(comment?._id)}
                        disabled={!!upvotingCommentId}
                        className="text-sm flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-green-500 px-2 py-1 rounded-md bg-gray-200 dark:bg-[#212121] disabled:cursor-not-allowed"
                      >
                        {upvotingCommentId === comment?._id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <ArrowBigUp size={16} fill={hasUpvoted ? "currentColor" : "none"} className={hasUpvoted && "text-green-500"} />
                        )}
                        <span>{comment?.upvotes?.length || 0}</span>
                      </button>

                      {loginUser?._id === comment?.author?._id && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          disabled={deletingCommentId}
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 px-2 py-1 rounded-md bg-gray-200 dark:bg-[#212121]"
                        >
                          {
                            deletingCommentId === comment._id ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <Trash2 size={16} />
                            )
                          }
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="sm:ps-10">
                    <div className="text-sm mt-1 text-gray-700 dark:text-gray-300 whitespace-pre-wrap bg-gray-200/50 dark:bg-[#1e1e1e] p-2 rounded-sm">
                      {comment?.content}
                    </div>
                  </div>
                </div>
              )
            })}

            {(visibleComments < answer.comments.length) && (
              <div className="flex justify-center">
                <button
                  onClick={loadMore}
                  className="text-sm text-[#07C5B9] hover:underline mt-2"
                >
                  Load more comments...
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

AnswerCard.propTypes = {
  answer: PropTypes.object.isRequired,
};
