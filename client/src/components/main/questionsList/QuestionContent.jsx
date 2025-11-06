import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function QuestionContent({ question }) {
    return (
        <div className="mb-3">
            <Link to={`/main/questions/${question?._id}`}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-[#07C5B9] transition-colors cursor-pointer line-clamp-2">
                    {question.title}
                </h3>
            </Link>

            {question.content && (
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm leading-relaxed line-clamp-10 whitespace-pre-wrap">
                    {question.content}
                </p>
            )}
        </div>
    );
}

QuestionContent.propTypes = {
    question: PropTypes.object.isRequired,
};