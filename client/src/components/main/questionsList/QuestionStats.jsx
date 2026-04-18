import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    MessageSquareReply,
    Eye,
    ThumbsUp,
    Bookmark,
    Share2,
    CheckCircle,
    Clock,
    XCircle,
    Zap,
    Loader2,
} from "lucide-react";
import { useSnackbar } from "notistack";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AuthContext from "../../../context/AuthContext";
import { formatCount } from "../../../utils/formatCount";
import {
    toggleLikeQuestion,
    toggleSaveQuestion,
} from "../../../services/question.service";
import { shareContent } from "../../../services/share.service"
import UIStateContext from "../../../context/UIStateContext";

const baseBtn = "flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium border transition-colors duration-200";

const inactiveBtn = "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300 dark:bg-[#202020] dark:text-gray-300 dark:hover:bg-[#2a2a2a] dark:border-[#404040]";

const disabledBtn = "opacity-50 cursor-not-allowed";

export default function QuestionStats({ question }) {

    const { enqueueSnackbar } = useSnackbar();
    const { loginUser } = useContext(AuthContext);
    const { isAuthorize } = useContext(UIStateContext);

    const [totalLikes, setTotalLikes] = useState([]);
    const [totalSaved, setTotalSaved] = useState([]);

    const [loading, setLoading] = useState({
        like: false,
        save: false,
    });

    useEffect(() => {
        if (!question) return;
        setTotalLikes(question.likes || []);
        setTotalSaved(question.saves || []);
    }, [question]);

    const handleLike = async () => {
      
        if (!isAuthorize() || loading.like) return;

        const userId = loginUser._id;
        setLoading(prev => ({ ...prev, like: true }));

        try {
            const res = await toggleLikeQuestion(question._id);
            const liked = res?.data?.liked;

            setTotalLikes(prev =>
                liked ? [...prev, userId] : prev.filter(id => id !== userId)
            );

            enqueueSnackbar(res?.message || "Like updated", { variant: "success" });
        } catch (err) {
            enqueueSnackbar(
                err?.response?.data?.message || "Failed to like question",
                { variant: "error" }
            );
        } finally {
            setLoading(prev => ({ ...prev, like: false }));
        }
    };

    const handleSave = async () => {
        if (!isAuthorize() || loading.save) return;

        const userId = loginUser._id;
        setLoading(prev => ({ ...prev, save: true }));

        try {
            const res = await toggleSaveQuestion(question._id);
            const saved = res?.data?.saved;

            setTotalSaved(prev =>
                saved ? [...prev, userId] : prev.filter(id => id !== userId)
            );

            enqueueSnackbar(res?.message || "Save updated", { variant: "success" });
        } catch (err) {
            enqueueSnackbar(
                err?.response?.data?.message || "Failed to save question",
                { variant: "error" }
            );
        } finally {
            setLoading(prev => ({ ...prev, save: false }));
        }
    };

    const handleShare = async () => {
        await shareContent({
            title: question.title,
            text: question.content?.slice(0, 120) || "Check out this question",
            url: `${window.location.origin}/main/questions/${question._id}`,
        });
    };


    const isUserLiked = totalLikes.includes(loginUser?._id);
    const isQuestionSaved = totalSaved.includes(loginUser?._id);

    const getStatusIcon = status => {
        switch (status) {
            case "active":
                return { icon: Zap, color: "text-green-500", label: "Active" };
            case "closed":
                return { icon: CheckCircle, color: "text-blue-500", label: "Closed" };
            case "deleted":
                return { icon: XCircle, color: "text-red-500", label: "Deleted" };
            case "pending":
                return { icon: Clock, color: "text-yellow-500", label: "Pending" };
            default:
                return { icon: Zap, color: "text-gray-500", label: "Unknown" };
        }
    };

    const statusInfo = getStatusIcon(question.status);
    const StatusIcon = statusInfo.icon;

    return (
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800">

            {/* TOP ROW */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                    <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                    <span className={`text-xs font-medium ${statusInfo.color}`}>
                        {statusInfo.label}
                    </span>
                </div>

                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <Eye className="w-4 h-4" />
                    <span className="text-xs">{formatCount(question.views || 0)}</span>
                    <span className="hidden lg:inline text-xs">Views</span>
                </div>
            </div>

            {/* ACTION ROW */}
            <div className="flex items-center justify-between gap-2">

                {/* LIKE */}
                <button
                    onClick={handleLike}
                    disabled={loading.like}
                    className={`${baseBtn} ${isUserLiked
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-500/20"
                        : inactiveBtn
                        } ${loading.like && disabledBtn}`}
                >
                    {loading.like ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isUserLiked ? (
                        <ThumbUpIcon className="!w-4 !h-4" />
                    ) : (
                        <ThumbsUp className="w-4 h-4" />
                    )}
                    <span>{formatCount(totalLikes.length)}</span>
                    <span className="hidden lg:inline">Like</span>
                </button>

                {/* ANSWERS */}
                <Link
                    to={`/main/questions/${question._id}`}
                    className={`${baseBtn} ${inactiveBtn}`}
                >
                    <MessageSquareReply className="w-4 h-4" />
                    <span>{formatCount(question.answers?.length || 0)}</span>
                    <span className="hidden lg:inline">Answers</span>
                </Link>

                {/* SAVE */}
                <button
                    onClick={handleSave}
                    disabled={loading.save}
                    className={`${baseBtn} ${isQuestionSaved
                        ? "bg-purple-100 text-purple-600 dark:bg-purple-500/20"
                        : inactiveBtn
                        } ${loading.save && disabledBtn}`}
                >
                    {loading.save ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Bookmark className="w-4 h-4" />
                    )}
                    <span>{formatCount(totalSaved.length)}</span>
                    <span className="hidden lg:inline">Save</span>
                </button>

                <button
                    onClick={handleShare}
                    className={`${baseBtn} ${inactiveBtn}`}
                >
                    <Share2 className="w-4 h-4" />
                    <span>{formatCount(question.shares || 0)}</span>
                    <span className="hidden lg:inline">Share</span>
                </button>

            </div>
        </div>
    );
}

QuestionStats.propTypes = {
    question: PropTypes.object.isRequired,
};
