import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import QuestionCard from './QuestionCard';
import QuestionContext from '../../../context/QuestionContext';
import QuestionFilterToggle from "../common/QuestionFilterToggle";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export default function QuestionList() {

    const navigate = useNavigate();
    const location = useLocation();

    const [searchParams] = useSearchParams();
    const filter = searchParams.get("filter");
    const topic = searchParams.get("topic");

    const { questions, setQuestions, newQuestions, setNewQuestions, setPage } = useContext(QuestionContext);

    const handleLoadNewQuestions = () => {
        navigate(location.pathname, { replace: true });
        setQuestions(prev => [...newQuestions, ...prev]);
        setNewQuestions([]);
        setPage(1)
    }

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

            {
                newQuestions.length > 3 && (
                    <button
                        onClick={handleLoadNewQuestions}
                        className="absolute top-15 z-50 flex items-center justify-center gap-1 bg-white text-orange-600 dark:bg-[#161616] dark:text-[#07C5B9] px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition shadow shadow-gray-500/40 dark:shadow-white/10"
                    >
                        <ArrowUp size={18} />
                        <span>New Questions</span>
                    </button>
                )
            }
        </>
    )
};