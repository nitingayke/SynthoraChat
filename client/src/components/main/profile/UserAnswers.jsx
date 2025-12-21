import { useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

import UIStateContext from "../../../context/UIStateContext";

import AnswerCard from "./AnswerCard";
import { filterAnswersByQuery } from "../../../utils/answerUtils"

const PAGE_SIZE = 15;

export default function UserAnswers({ userAnswers, isOwnProfile }) {

    const { searchQuery } = useContext(UIStateContext);

    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const searchedAnswers = useMemo(() => {
        return filterAnswersByQuery(userAnswers, searchQuery);
    }, [userAnswers, searchQuery]);

    const visibleAnswers = useMemo(() => {
        return searchedAnswers.slice(0, visibleCount);
    }, [searchedAnswers, visibleCount]);

    const hasMore = visibleCount < searchedAnswers.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + PAGE_SIZE);
    };

    return (
        <>
            <div className="flex justify-between mt-6 my-4 md:mb-5 md:mt-0">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {isOwnProfile ? "Answers by you" : "User's Answers"}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isOwnProfile
                            ? "Questions where you have contributed answers"
                            : "Public answers shared by this user"}
                    </p>
                </div>

                <button className="text-sm text-gray-500 dark:text-gray-400">
                    Filter
                </button>
            </div>

            {visibleAnswers.length > 0 ? (
                <div className="space-y-4">
                    {visibleAnswers.map((answer) => (
                        <AnswerCard key={answer._id} answer={answer} />
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-[#202020]">
                    {searchQuery
                        ? "No answers match your search."
                        : "No answers available yet."}
                </div>
            )}

            {hasMore && (
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
    );
}

UserAnswers.propTypes = {
    userAnswers: PropTypes.array.isRequired,
    isOwnProfile: PropTypes.bool.isRequired,
};
