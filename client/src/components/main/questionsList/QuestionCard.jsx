import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import QuestionContent from './QuestionContent';
import QuestionMedia from './QuestionMedia';
import QuestionStats from './QuestionStats';
import Avatar from '@mui/material/Avatar';
import { slugify } from '../../../utils/helper';
import FollowActionButton from '../common/FollowActionButton';
import AuthContext from '../../../context/AuthContext';

export default function QuestionCard({ question }) {

    const { isOnline } = useContext(AuthContext);

    const authorOnline = isOnline(question?.author?._id);

    return (
        <div className="bg-white dark:bg-[#161616] rounded-xl border border-gray-200 dark:border-gray-800/50 p-4 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <Link to={`/main/u/profile/${question?.author?.username}`}>
                        <div
                            title={authorOnline ? "User is online" : "User is offline"}
                            className={`relative rounded-full p-[2px] ${authorOnline ? "bg-green-500" : "bg-transparent" }`}
                        >
                            <Avatar
                                src={question.author?.profile?.profilePicture}
                                alt={question.author?.username}
                                className="!h-9 !w-9 bg-white dark:bg-[#161616] border-3 border-transparent"
                            />
                        </div>
                    </Link>

                    <div>
                        <div className="flex items-center gap-2">
                            <Link to={`/main/u/profile/${question?.author?.username}`} className='flex items-center gap-2 group' >
                                <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-orange-500 group-hover:dark:text-[#07C5B9]">
                                    {question.author?.profile?.firstName} {question.author?.profile?.lastName}
                                </span>
                                {question.author?.isVerified && (
                                    <span className="text-orange-500 dark:text-[#07C5B9] text-xs" title='user verified'>✓</span>
                                )}
                            </Link>
                            <FollowActionButton targetUserId={question?.author?._id} size='xs' />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            <Link to={`/main/u/profile/${question?.author?.username}`} >
                                @{question?.author?.username}
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(question?.createdAt || Date.now()).toLocaleDateString()}
                </div>
            </div>

            {/* Question Content */}
            <QuestionContent question={question} />

            {/* Media Preview */}
            {question.media && question.media.length > 0 && (
                <QuestionMedia media={question.media} questionId={question?._id} />
            )}

            {/* Topics */}
            {question.topics && question.topics.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                    {question.topics.slice(0, 5).map((topic, index) => (
                        <Link
                            key={index * 0.2547}
                            to={`/main?topic=${slugify(topic)}`}
                            className="px-2 py-1 bg-orange-100 dark:bg-[#07C5B9]/20 text-orange-500 dark:text-[#07C5B9] text-xs rounded-full"
                        >
                            {topic}
                        </Link>
                    ))}
                    {question.topics.length > 5 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                            +{question.topics.length - 5}
                        </span>
                    )}
                </div>
            )}

            {/* Stats and Actions */}
            <QuestionStats question={question} />
        </div>
    );
}

QuestionCard.propTypes = {
    question: PropTypes.object.isRequired,
};