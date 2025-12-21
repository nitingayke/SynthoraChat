import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    MessageCircle,
    ThumbsUp,
    Heart,
    Bookmark,
    Eye,
    Share2,
    Clock,
    Tag,
    ArrowBigUp,
} from "lucide-react";
import Avatar from '@mui/material/Avatar';
import { timeAgo } from "../../../utils/date";

export default function QuestionList({ questions, userQuestion }) {

    if (!questions || questions.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                No questions found.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {questions.map((question) => {
                const {
                    _id,
                    author,
                    title,
                    content,
                    topics = [],
                    allowComments,
                    answers = [],
                    likes = [],
                    upvotes = [],
                    saves = [],
                    views = 0,
                    createdAt,
                } = question;

                return (
                    <div
                        key={_id}
                        className="group rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#191919] p-4 space-y-4"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                {!userQuestion && <Link to={`/profile/${author?.username}`}>
                                    <Avatar
                                        alt={author?.profile?.firstName}
                                        src={author?.profile?.profilePicture}
                                    />
                                </Link>}

                                <div>
                                    {!userQuestion && <Link
                                        to={`/profile/${author?.username}`}
                                        className="font-medium text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-[#07C5B9]"
                                    >
                                        {author?.profile?.firstName} {author?.profile?.lastName}
                                    </Link>}

                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                        <Clock size={12} />
                                        {createdAt ? timeAgo(createdAt) : "---"}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                <button className="hover:text-orange-500 dark:hover:text-[#07C5B9] p-1.5 rounded-lg bg-gray-100 dark:bg-[#202020]">
                                    <Bookmark size={18} />
                                </button>
                                <button className="hover:text-orange-500 dark:hover:text-[#07C5B9] p-1.5 rounded-lg bg-gray-100 dark:bg-[#202020]">
                                    <Share2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Link to={`/main/questions/${_id}`} className="group-hover:text-orange-500 dark:group-hover:text-[#07C5B9] group-hover:underline text-lg font-semibold text-gray-900 dark:text-white ">
                                {title}
                            </Link>

                            {content && (
                                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                                    {content}
                                </p>
                            )}
                        </div>

                        {topics.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {topics.map((topic, idx) => (
                                    <span
                                        key={idx * 0.25487}
                                        className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-500 dark:bg-[#07C5B9]/10 dark:text-[#07C5B9]"
                                    >
                                        <Tag size={12} />
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-100 dark:border-[#2a2a2a]">
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                {allowComments && (
                                    <span className="flex items-center gap-1">
                                        <MessageCircle size={16} />
                                        {answers.length}
                                    </span>
                                )}

                                <span className="flex items-center gap-1">
                                    <ThumbsUp size={16} />
                                    {likes?.length}
                                </span>

                                <span className="flex items-center gap-1">
                                    <ArrowBigUp size={16} />
                                    {upvotes?.length}
                                </span>

                                <span className="flex items-center gap-1">
                                    <Bookmark size={16} />
                                    {saves.length}
                                </span>

                                <span className="flex items-center gap-1">
                                    <Eye size={16} />
                                    {views}
                                </span>
                            </div>

                            {/* View Details */}
                            <Link
                                to={`/main/questions/${_id}`}
                                className="text-sm font-medium text-orange-600 dark:text-[#07C5B9] hover:underline"
                            >
                                View Details →
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

QuestionList.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            content: PropTypes.string,
            topics: PropTypes.array,
            allowComments: PropTypes.bool,
            answers: PropTypes.array,
            likes: PropTypes.array,
            upvotes: PropTypes.array,
            saves: PropTypes.array,
            views: PropTypes.number,
            createdAt: PropTypes.string,
            author: PropTypes.shape({
                username: PropTypes.string,
                profile: PropTypes.shape({
                    firstName: PropTypes.string,
                    lastName: PropTypes.string,
                    profilePicture: PropTypes.string,
                }),
            }),
        })
    ).isRequired,
    userQuestion: PropTypes.bool
};
