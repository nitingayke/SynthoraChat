import { ThumbsUp, Eye, Share2, ArrowBigUp, MessageCircle, Pencil, Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import AuthContext from "../../../context/AuthContext";
import MediaDialog from "./MediaDialog"
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function AnswerCard({ answer }) {

  const { loginUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState({
    like: false,
    upvote: false,
    delete: false,
    edit: false,
  });
  const [visibleComments, setVisibleComments] = useState(10);
  const [showComments, setShowComments] = useState(false);


  const loadMore = () => {
    setVisibleComments((prev) => prev + 10);
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
              onClick={() => { }}
              disabled={isLoading.edit}
              className="p-2 rounded-md bg-gray-200 dark:bg-[#212121] hover:bg-gray-300 dark:hover:bg-[#2c2c2c] text-gray-800 dark:text-white"
            >
              {isLoading.edit ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Pencil size={16} />
              )}
            </button>

            <button
              onClick={() => { }}
              disabled={isLoading.delete}
              className="p-2 rounded-md  bg-gray-200 dark:bg-[#212121] hover:bg-red-200 dark:hover:bg-red-900/30 hover:text-red-500 text-gray-800 dark:text-white"
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

      <div className="mt-4 flex flex-wrap justify-between sm:justify-start items-center gap-5 text-xs text-gray-600 dark:text-gray-400">

        <button className="flex items-center gap-1 hover:text-red-500">
          <ThumbsUp size={16} />
          {answer?.likes?.length || 0}
        </button>

        {/* UPVOTE */}
        <button className="flex items-center gap-1 hover:text-green-500">
          <ArrowBigUp size={16} />
          {answer?.upvotes?.length || 0}
        </button>

        {/* VIEWS */}
        <span className="flex items-center gap-1">
          <Eye size={16} />
          {answer?.views || 0}
        </span>

        {/* SHARES */}
        <span className="flex items-center gap-1">
          <Share2 size={16} />
          {answer?.shares || 0}
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

        <button
          className="flex items-center gap-1 hover:text-[#07C5B9]"
          onClick={() => setShowComments((prev) => !prev)}
        >
          <MessageCircle size={16} />
          {answer?.comments?.length || 0}
          <span className="hidden sm:flex">Comments</span>
        </button>
      </div>

      <AnimatePresence>
        {showComments && answer?.comments?.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="mt-4 overflow-hidden space-y-4 border-t pt-3 border-gray-200 dark:border-[#222]"
          >
            {answer.comments.slice(0, visibleComments).map((comment, index) => (
              <div key={index * 0.12457}>

                <div className="relative flex gap-3">
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


                  <div className="absolute right-0 top-0 flex gap-3">
                    <button className="text-sm flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-green-500 px-2 py-1 rounded-md bg-[#212121]">
                      <ArrowBigUp size={16} />
                      {comment?.upvotes?.length || 0}
                    </button>

                    {loginUser?._id === comment?.author?._id && (
                      <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 px-2 py-1 rounded-md bg-[#212121]">
                        <Trash2 size={16} />
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
            ))}

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
