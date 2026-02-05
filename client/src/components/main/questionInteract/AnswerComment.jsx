import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import AuthContext from "../../../context/AuthContext";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { ArrowBigUp, ChevronDown, Loader2, Trash2 } from "lucide-react";
import { timeAgo } from "../../../utils/date";
import UIStateContext from "../../../context/UIStateContext";
import { deleteCommentService, toggleUpvoteCommentService } from "../../../services/answer.service";
import FollowActionButton from "../common/FollowActionButton";

export default function AnswerComment({ answerId, comments }) {

    const { enqueueSnackbar } = useSnackbar();
    const { loginUser, isOnline } = useContext(AuthContext);
    const { isAuthorize } = useContext(UIStateContext);

    const [deletingCommentId, setDeletingCommentId] = useState(null);
    const [upvotingCommentId, setUpvotingCommentId] = useState(null);

    const [visibleComments, setVisibleComments] = useState(10);

    const loadMore = () => {
        setVisibleComments((prev) => prev + 10);
    };

    const handleDeleteComment = async (commentId) => {

        if (!isAuthorize() || deletingCommentId) return;

        const confirmDelete = window.confirm(
            "Delete this comment?\n\n⚠️ Upvotes on this comment will be lost."
        );
        if (!confirmDelete) return;

        try {
            setDeletingCommentId(commentId);

            await deleteCommentService(answerId, commentId);
            enqueueSnackbar("Comment deleted", { variant: "success" });
        } catch (err) {
            enqueueSnackbar(err?.response?.data?.message || "Failed to delete comment. Please try again.", { variant: "error" });
        } finally {
            setDeletingCommentId(null);
        }
    };

    const handleUpvoteComment = async (commentId) => {

        if (!isAuthorize() || upvotingCommentId) return;

        try {
            setUpvotingCommentId(commentId);

            await toggleUpvoteCommentService(answerId, commentId);
        } catch (err) {
            enqueueSnackbar(err?.response?.data?.message || "Failed to upvote comment. Try again.", { variant: "error" });
        } finally {
            setUpvotingCommentId(null);
        }
    };

    return (
        <>
            {comments.length === 0 && (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
                    No comments yet — start the conversation!
                </p>
            )}

            {comments.slice(0, visibleComments).map((comment, index) => {
                const hasUpvoted = comment?.upvotes?.includes(loginUser?._id);
                const authorOnline = isOnline(comment?.author?._id);

                return (
                    <div key={index * 0.12457}>

                        <div className="relative gap-3 flex items-center">
                            <Link to={`/main/u/profile/${comment?.author?.username}`}>
                                <div
                                    title={authorOnline ? "User is online" : "User is offline"}
                                    className={`relative rounded-full p-[1.8px] ${authorOnline ? "bg-green-500" : "bg-transparent"}`}
                                >
                                    <Avatar
                                        sx={{ width: 35, height: 35 }}
                                        src={comment?.author?.profile?.profilePicture || ""}
                                        className="border-2 border-transparent bg-white dark:bg-[#111]"
                                    />
                                </div>
                            </Link>

                            <div>
                                <div className="flex items-center gap-2">
                                    <Link
                                        to={`/main/u/profile/${comment?.author?.username}`}
                                        className="font-semibold text-sm text-gray-900 dark:text-gray-100 hover:text-[#07C5B9]"
                                    >
                                        {comment?.author?.profile?.firstName
                                            ? `${comment.author.profile.firstName} ${comment.author.profile.lastName}`
                                            : comment?.author?.username || "User"}
                                    </Link>
                                    <FollowActionButton targetUserId={comment?.author?._id} size="xs" />
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {timeAgo(comment.createdAt)}
                                </div>
                            </div>

                            <div className="absolute right-0 top-0 flex gap-1">
                                <button
                                    onClick={() => handleUpvoteComment(comment?._id)}
                                    disabled={!!upvotingCommentId}
                                    className="text-sm flex items-center gap-1 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-md bg-gray-200 dark:bg-[#212121] hover:bg-gray-300/80 dark:hover:bg-[#272727] disabled:cursor-not-allowed"
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
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 hover:bg-gray-300/80 dark:hover:bg-[#272727] px-2 py-1 rounded-md bg-gray-200 dark:bg-[#212121]"
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

            {(visibleComments < comments?.length) && (
                <div className="flex justify-center">
                    <button
                        onClick={loadMore}
                        className="flex items-center gap-1 text-sm mt-2 border rounded-lg px-2 py-1.5 bg-white dark:bg-[#191919] border-gray-300 dark:border-[#252525] hover:opacity-80 shadow mb-1"
                    >
                       <ChevronDown size={18} /> 
                       <span>Load More</span>
                    </button>
                </div>
            )}
        </>
    )
}

AnswerComment.propTypes = {
    answerId: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,

            upvotes: PropTypes.arrayOf(PropTypes.string),

            author: PropTypes.shape({
                _id: PropTypes.string.isRequired,
                username: PropTypes.string,

                profile: PropTypes.shape({
                    firstName: PropTypes.string,
                    lastName: PropTypes.string,
                    profilePicture: PropTypes.string,
                }),
            }).isRequired,
        })
    ).isRequired,
};
