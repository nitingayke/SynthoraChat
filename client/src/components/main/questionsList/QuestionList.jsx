import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import QuestionCard from './QuestionCard';
import QuestionContext from '../../../context/QuestionContext';
import QuestionFilterDropdown from "../common/QuestionFilterDropdown"
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';

export default function QuestionList() {

    const [searchParams] = useSearchParams();
    const filter = searchParams.get("filter");
    const topic = searchParams.get("topic");

    const { filteredQuestions } = useContext(QuestionContext);

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    if (!filteredQuestions || filteredQuestions.length === 0) {
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
            <>
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className='z-50 absolute top-18 right-0 sm:right-6 h-8 w-10 sm:w-8 flex justify-center items-center rounded-s-full border border-e-0 border-gray-300/50 dark:border-gray-600/50 sm:rounded-full bg-white/90 dark:bg-[#161616]/90 backdrop-blur-sm shadow-sm hover:bg-orange-500 dark:hover:bg-[#07C5B9] hover:shadow-lg hover:shadow-[#07C5B9]/25 transition-all duration-300 group'>
                    <Filter className='!h-4 !w-4 text-gray-500 dark:text-gray-400 group-hover:text-white transition-colors duration-300' />
                </button>
                <QuestionFilterDropdown isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} />
            </>

            <div className='space-y-4'>
                {filteredQuestions.map((question) => (
                    <QuestionCard key={question?._id} question={question} />
                ))}
            </div>
        </>
    )
};