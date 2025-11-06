import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    MessageSquareReply,
    Eye,
    ThumbsUp,
    Bookmark,
    Share2,
    CheckCircle,
    Clock,
    XCircle,
    Zap
} from 'lucide-react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AuthContext from '../../../context/AuthContext';

export default function QuestionStats({ question }) {
    
    const { loginUser } = useContext(AuthContext);
    const [totalLikes, setTotalLikes] = useState([]);
    const [totalSaved, setTotalSaved] = useState([]);

    useEffect(() => {
        if (!question) return;
        setTotalLikes(question?.likes);
        setTotalSaved(question?.saves);
    }, [question]);

    const handleLike = () => {
        if (!loginUser) return;

        setTotalLikes(prev =>
            prev.includes(loginUser?._id)
                ? prev.filter(id => id !== loginUser?._id)
                : [...prev, loginUser?._id]
        );
    };

    const handleSave = () => {
        if (!loginUser) return;

        setTotalSaved(prev =>
            prev.includes(loginUser?._id)
                ? prev.filter(id => id !== loginUser?._id)
                : [...prev, loginUser?._id]
        );
    };

    const handleShare = () => {
        console.warn("Share Clicked");
    };

    const isUserLiked = totalLikes?.includes(loginUser?._id);
    const isQuestionSaved = totalSaved?.includes(loginUser?._id);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active': return { icon: Zap, color: 'text-green-500 dark:text-green-400', label: 'Active' };
            case 'closed': return { icon: CheckCircle, color: 'text-blue-500 dark:text-blue-400', label: 'Closed' };
            case 'deleted': return { icon: XCircle, color: 'text-red-500 dark:text-red-400', label: 'Deleted' };
            case 'pending': return { icon: Clock, color: 'text-yellow-500 dark:text-yellow-400', label: 'Pending' };
            default: return { icon: Zap, color: 'text-gray-500 dark:text-gray-400', label: 'Unknown' };
        }
    };

    const statusInfo = getStatusIcon(question.status);
    const StatusIcon = statusInfo.icon;

    const stats = [
        { icon: MessageSquareReply, count: question.answers?.length || 0, color: 'text-blue-500 dark:text-blue-400', label: 'Answers' },
        { icon: ThumbsUp, count: totalLikes?.length || 0, color: 'text-green-500 dark:text-green-400', label: 'Likes' },
        { icon: Eye, count: question.views || 0, color: 'text-gray-500 dark:text-gray-400', label: 'Views' },
        { icon: Bookmark, count: totalSaved?.length || 0, color: 'text-purple-500 dark:text-purple-400', label: 'Saves' },
        { icon: Share2, count: question.shares || 0, color: 'text-orange-500 dark:text-orange-400', label: 'Shares' }
    ];

    const formatCount = (count) =>
        count >= 1000000 ? (count / 1000000).toFixed(1) + 'M'
        : count >= 1000 ? (count / 1000).toFixed(1) + 'K'
        : count;

    return (
        <>
            {/* ✅ Desktop View - only stats (NOT clickable) */}
            <div className="hidden sm:flex items-center justify-between gap-3 lg:gap-4">
                <div className="flex items-center gap-1 group" title={`Status: ${statusInfo.label}`}>
                    <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                    <span className={`hidden lg:inline text-xs font-medium ${statusInfo.color}`}>
                        {statusInfo.label}
                    </span>
                </div>

                {stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-1">
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                            {formatCount(stat.count)}
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex sm:hidden items-center justify-between flex-1 mt-2 gap-2">

                <button onClick={handleLike} disabled={!loginUser}
                    className={`px-3 py-2 rounded-lg flex items-center gap-1 text-xs font-medium transition-all
                        ${isUserLiked
                            ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
                            : 'bg-gray-100 dark:bg-[#202020] text-gray-600 dark:text-gray-300'}
                        ${!loginUser ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                >
                    {isUserLiked ? <ThumbUpIcon className="!w-4 !h-4" /> : <ThumbsUp className="w-4 h-4" />}
                    {formatCount(totalLikes?.length)}
                </button>

                <Link to={`/main/questions/${question?._id}`}
                    className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-[#202020] text-gray-600 dark:text-gray-300 flex items-center gap-1 text-xs"
                >
                    <MessageSquareReply className="w-4 h-4" />
                    {formatCount(question?.answers?.length)}
                </Link>

                <button onClick={handleSave} disabled={!loginUser}
                    className={`p-2 rounded-lg transition-all
                        ${isQuestionSaved
                            ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400'
                            : 'bg-gray-100 dark:bg-[#202020] text-gray-600 dark:text-gray-300'}
                        ${!loginUser ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                >
                    <Bookmark className="w-4 h-4" />
                </button>

                <button onClick={handleShare}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-[#202020] text-gray-600 dark:text-gray-300"
                >
                    <Share2 className="w-4 h-4" />
                </button>
            </div>
        </>
    );
}

QuestionStats.propTypes = {
    question: PropTypes.object.isRequired,
};
