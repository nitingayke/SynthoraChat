import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ThumbsUp, MessageSquare, Bookmark, Share } from 'lucide-react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AuthContext from '../../../context/AuthContext';

export default function QuestionActions({ question }) {
    const [totalLikes, setTotalLikes] = useState([]);
    const [totalSaved, setTotalSaved] = useState([]);
    const { loginUser } = useContext(AuthContext);

    useEffect(() => {
        if (!question) return;

        setTotalLikes(question?.likes)
        setTotalSaved(question?.saves);
    }, [question]);

    const handleLike = () => {
        if (!loginUser) return;

        setTotalLikes(prev => {
            if (prev?.includes(loginUser?._id)) {
                return prev?.filter(id => id !== loginUser?._id);
            }

            return [...prev, loginUser?._id];
        });
    };

    const handleSave = () => {
        if (!loginUser) return;

        setTotalSaved(prev => {
            if (prev?.includes(loginUser?._id)) {
                return prev?.filter(id => id !== loginUser?._id);
            }

            return [...prev, loginUser?._id];
        });
    };

    const handleShare = () => {
        console.warn("Share Messages")
    };

    const isUserLiked = totalLikes?.includes(loginUser?._id);
    const isQuestionSaved = totalSaved?.includes(loginUser?._id);

    return (
        <div className="hidden sm:flex items-center gap-1 lg:gap-2">
            <button
                onClick={handleLike}
                disabled={!loginUser}
                className={`flex items-center gap-1 px-1.5 lg:px-3 py-1.5 rounded-md lg:rounded-lg text-sm font-medium transition-all ${isUserLiked
                    ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
                    : 'bg-gray-100 dark:bg-[#202020] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'
                    } ${!loginUser ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
                {isUserLiked ? <ThumbUpIcon className={`!w-4 !h-4`} /> : <ThumbsUp className={`w-4 h-4`} />}
                <span className='hidden md:flex'>Like</span>
            </button>

            {/* Answer Button */}
            <Link
                to={`/main/question/${question._id}`}
                className="flex items-center gap-1 px-1.5 lg:px-3 py-1.5 bg-gray-100 dark:bg-[#202020] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-md lg:rounded-lg text-sm font-medium transition-all"
            >
                <MessageSquare className="w-4 h-4" />
                <span className='hidden lg:flex'>Answer</span>
            </Link>

            {/* Save Button */}
            <button
                onClick={handleSave}
                disabled={!loginUser}
                className={`p-1.5 rounded-md lg:rounded-lg transition-all ${isQuestionSaved
                    ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400'
                    : 'bg-gray-100 dark:bg-[#202020] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'
                    } ${!loginUser ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
                <Bookmark className={`w-4 h-4 ${isQuestionSaved ? 'fill-current' : ''}`} />
            </button>

            {/* Share Button */}
            <button
                onClick={handleShare}
                className="p-1.5 bg-gray-100 dark:bg-[#202020] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-md lg:rounded-lg transition-all"
            >
                <Share className="w-4 h-4" />
            </button>
        </div>
    );
}

QuestionActions.propTypes = {
    question: PropTypes.object.isRequired,
};