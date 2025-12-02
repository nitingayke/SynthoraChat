import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import QuestionContent from './QuestionContent';
import QuestionMedia from './QuestionMedia';
import QuestionStats from './QuestionStats';
import QuestionActions from './QuestionActions';
import Avatar from '@mui/material/Avatar';

export default function QuestionCard({ question }) {

    return (
        <div className="bg-white dark:bg-[#161616] rounded-xl border border-gray-200 dark:border-gray-800/50 p-4 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <Avatar
                        src={question.author?.profile?.profilePicture}
                        alt={question.author?.username}
                        className="!h-8 !w-8"
                    />
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {question.author?.profile?.firstName} {question.author?.profile?.lastName}
                            </span>
                            {question.author?.isVerified && (
                                <span className="text-blue-500 dark:text-[#07C5B9] text-xs">✓</span>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            @{question.author?.username}
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
                        <span
                            key={index * 0.2547}
                            className="px-2 py-1 bg-orange-100 dark:bg-[#07C5B9]/20 text-orange-500 dark:text-[#07C5B9] text-xs rounded-full"
                        >
                            {topic}
                        </span>
                    ))}
                    {question.topics.length > 5 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                            +{question.topics.length - 5}
                        </span>
                    )}
                </div>
            )}

            {/* Stats and Actions */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 gap-3">
                <QuestionStats question={question} />
                <QuestionActions question={question} />
            </div>
        </div>
    );
}

QuestionCard.propTypes = {
    question: PropTypes.object.isRequired,
};