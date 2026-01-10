import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import QuestionCard from './QuestionCard';
import QuestionContext from '../../../context/QuestionContext';
import QuestionFilterToggle from "../common/QuestionFilterToggle";
// import { useSearchParams } from 'react-router-dom';

export default function QuestionList() {

    // const [searchParams] = useSearchParams();
    // const filter = searchParams.get("filter");
    // const topic = searchParams.get("topic");

    const { questions } = useContext(QuestionContext);

    if (!questions || questions.length === 0) {
        return (
            <div className="flex-1 text-center py-12">
                <div className="text-gray-400 dark:text-gray-600 text-lg">
                    No questions found
                </div>
                <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                    Be the first to ask a question!
                </p>
            </div>
        );
    }

    return (
        <>
            <QuestionFilterToggle />

            <div className='space-y-4'>
                {questions.map((question) => (
                    <QuestionCard key={question?._id} question={question} />
                ))}
            </div>
        </>
    )
};