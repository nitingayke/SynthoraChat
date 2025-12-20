import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    MessageCircle,
    ThumbsUp,
    Eye,
    ArrowBigUp,
    Clock,
    Brain,
} from "lucide-react";
import { timeAgo } from "../../../utils/date";

export default function AnswerCard({ answer }) {
    const {
        questionId,
        content,
        upvotes = [],
        likes = [],
        comments = [],
        aiAccuracy = 0,
        views = 0,
        createdAt,
    } = answer;

    return (
        <div className="rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#191919] p-4 space-y-4">

            {/* Top Row */}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {createdAt ? timeAgo(createdAt) : "---"}
                </div>

                <Link
                    to={`/main/questions/${questionId}`}
                    className="text-orange-500 dark:text-[#07C5B9] hover:underline font-medium"
                >
                    View Question →
                </Link>
            </div>

            {/* Answer Content */}
            <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed line-clamp-4">
                {content}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-5 pt-3 border-t border-gray-100 dark:border-[#2a2a2a] text-sm text-gray-600 dark:text-gray-400">

                <span className="flex items-center gap-1">
                    <ArrowBigUp size={16} />
                    {upvotes?.length}
                </span>

                <span className="flex items-center gap-1">
                    <ThumbsUp size={16} />
                    {likes?.length}
                </span>

                <span className="flex items-center gap-1">
                    <MessageCircle size={16} />
                    {comments?.length}
                </span>

                <span className="flex items-center gap-1">
                    <Eye size={16} />
                    {views}
                </span>

                <span className="flex items-center gap-1 text-orange-500 dark:text-[#07C5B9]">
                    <Brain size={16} />
                    {aiAccuracy}%
                </span>
            </div>
        </div>
    );
}

AnswerCard.propTypes = {
    answer: PropTypes.shape({
        questionId: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        upvotes: PropTypes.array,
        likes: PropTypes.array,
        comments: PropTypes.array,
        aiAccuracy: PropTypes.number,
        views: PropTypes.number,
        createdAt: PropTypes.string,
    }).isRequired,
};
