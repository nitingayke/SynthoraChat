import React, { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import QuestionCard from './QuestionCard';
import QuestionContext from '../../../context/QuestionContext';
import QuestionFilterToggle from "../common/QuestionFilterToggle";
import AuthContext from '../../../context/AuthContext';
import LoaderComponent from "../../../components/loader/LoaderComponent";

export default function QuestionList() {

    const [searchParams] = useSearchParams();

    const filter = searchParams.get("filter");
    const topic = searchParams.get("topic");

    const { loginUser } = useContext(AuthContext);
    const {
        questions,
        loadingQuestions,
        loadingMore,
        setQuestions,
        newQuestions,
        setNewQuestions,
        hasMore,
        loadQuestions,
    } = useContext(QuestionContext);

    useEffect(() => {

        if (filter === "recommended" && !loginUser?._id) {
            return;
        }

        const fetchData = async () => {
            await loadQuestions(filter, topic, true, loginUser?._id);
        };

        fetchData();

    }, [filter, topic, loginUser?._id]);

    const handleLoadMore = () => {
        loadQuestions(filter, topic, false, loginUser?._id);
    }

    const handleLoadNewQuestions = () => {
        setQuestions(prev => {
            const map = new Map();

            [...newQuestions, ...prev].forEach(q => {
                map.set(q._id, q);
            });

            return Array.from(map.values());
        });

        setNewQuestions([]);
    };

    if (loadingQuestions && questions.length === 0) {
        return (
            <div className="rounded-xl bg-white dark:bg-[#191919] p-6 border border-gray-200 dark:border-[#222222] flex items-center justify-center">
                <LoaderComponent />
            </div>
        );
    }

    return (
        <>
            <QuestionFilterToggle />

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

            <div className='space-y-4'>
                {questions.map((question) => (
                    <QuestionCard key={question?._id} question={question} />
                ))}
            </div>

            {
                hasMore && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleLoadMore}
                            disabled={loadingMore}
                            className="px-5 py-2 flex items-center gap-1 bg-orange-500 dark:bg-[#07C5B9] text-white rounded-lg"
                        >
                            {loadingMore ? (
                                <>
                                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                                    <span>Loading...</span>
                                </>
                            ) : (
                                "Load More"
                            )}
                        </button>
                    </div>
                )
            }

        </>
    )
};