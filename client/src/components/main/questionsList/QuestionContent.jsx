import React from 'react';
import PropTypes from 'prop-types';
import { Link, useSearchParams } from 'react-router-dom';
import ExpandableText from '../common/ExpandableText';

export default function QuestionContent({ question }) {

    const [searchParams] = useSearchParams();

    const filter = searchParams.get("filter");
    const topic = searchParams.get("topic");

    const params = new URLSearchParams();

    if (filter) params.set("filter", filter);
    if (topic) params.set("topic", topic);

    const query = params.toString() ? `?${params.toString()}` : "";

    return (
        <div className="mb-3">
            <Link to={`/main/questions/${question?._id}${query}`}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-[#07C5B9] transition-colors cursor-pointer line-clamp-2">
                    {question.title}
                </h3>
            </Link>

            {question?.content && (
                <ExpandableText text={question.content} lines={8} />
            )}
        </div>
    );
}

QuestionContent.propTypes = {
    question: PropTypes.object.isRequired,
};