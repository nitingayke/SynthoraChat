import { useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

import QuestionContext from "../../../context/QuestionContext";
import UIStateContext from "../../../context/UIStateContext";

import QuestionList from "./QuestionList";
import {
    filterQuestionsByQuery,
    filterUserQuestions
} from "../../../utils/questionUtils";

const PAGE_SIZE = 15;

export default function UserQuestions({ userQuestions = [], isOwnProfile = false }) {

    const { questions, loadingQuestions } = useContext(QuestionContext);
    const { searchQuery } = useContext(UIStateContext);

    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const userOnlyQuestions = useMemo(() => {
        return filterUserQuestions(questions, userQuestions);
    }, [questions, userQuestions]);

    const searchedQuestions = useMemo(() => {
        return filterQuestionsByQuery(userOnlyQuestions, searchQuery);
    }, [userOnlyQuestions, searchQuery]);

    const visibleQuestions = useMemo(() => {
        return searchedQuestions.slice(0, visibleCount);
    }, [searchedQuestions, visibleCount]);

    const hasMoreQuestions = visibleCount < searchedQuestions.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + PAGE_SIZE);
    };

    if (loadingQuestions) {
        return (
            <div className="text-[15px] flex justify-center px-2 space-x-2 py-20">
                <div className="animate-spin rounded-full border-3 border-x-0 w-7 h-7"></div>
                <span className="text-lg">Loading...</span>
            </div>
        );
    }

    return (
        <>
            <div className="flex justify-between mt-6 my-4 md:mb-5 md:mt-0">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {isOwnProfile ? "Questions created by you" : "User's Questions"}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isOwnProfile
                            ? "All questions you've asked so far"
                            : "Public questions asked by this user"}
                    </p>
                </div>
                <button>Filter</button>
            </div>

            {searchedQuestions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center border-t border-gray-300 dark:border-[#202020]">
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        No questions found
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {searchQuery
                            ? "Try changing your search keywords."
                            : isOwnProfile ? "You haven't asked any questions yet." : "This user hasn't asked any public questions."}
                    </p>
                </div>
            ) : (
                <>
                    <QuestionList
                        questions={visibleQuestions}
                        userQuestion={true}
                    />

                    {hasMoreQuestions && (
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handleLoadMore}
                                className="px-6 py-2 rounded-lg font-medium bg-orange-500 hover:bg-orange-600 dark:bg-[#07C5B9] dark:hover:bg-[#06b1a7] text-white transition"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

UserQuestions.propTypes = {
    userQuestions: PropTypes.array.isRequired,
    isOwnProfile: PropTypes.bool.isRequired
};
