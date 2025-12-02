import React from 'react';
import PropTypes from 'prop-types';
import { Link, useSearchParams } from 'react-router-dom';

export default function QuestionContent({ question }) {

    const [searchParams] = useSearchParams();
    const filter = searchParams.get("filter");
    const topic = searchParams.get("topic");
    let query = "";

    if (filter) {
        query = `?filter=${filter}`;
    } else if (topic) {
        query = `?topic=${topic}`;
    }

    return (
        <div className="mb-3">
            <Link to={`/main/questions/${question?._id}${query}`}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-[#07C5B9] transition-colors cursor-pointer line-clamp-2">
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