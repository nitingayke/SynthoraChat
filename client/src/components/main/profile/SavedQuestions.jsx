import { useContext, useState, useMemo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import UIStateContext from "../../../context/UIStateContext";

import QuestionList from "./QuestionList";
import { filterQuestionsByQuery } from "../../../utils/questionUtils";
import { fetchSavedQuestions } from "../../../services/user.service";
import { enqueueSnackbar } from "notistack";

const PAGE_SIZE = 15;

export default function SavedQuestions({ userId, isOwnProfile = false }) {

    const { searchQuery } = useContext(UIStateContext);

    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);

    const loadSavedQuestions = useCallback(async () => {
        if (loading || (!hasMore && page !== 1)) return;

        try {
            setLoading(true);

            const res = await fetchSavedQuestions(userId, page, PAGE_SIZE);

            if (res?.success) {
                const newQuestions =
                    res?.data?.questions?.map((sq) => sq.question) ?? [];

                setQuestions((prev) => [...prev, ...newQuestions]);
                setHasMore(res?.pagination?.hasMore ?? false);
                setPage((prev) => prev + 1);
            }
        } catch (error) {
            enqueueSnackbar(
                error?.response?.data?.message || "Failed to load saved questions",
                { variant: "error" }
            );
        } finally {
            setLoading(false);
        }
    }, [userId, page, loading, hasMore]);

    useEffect(() => {
        setQuestions([]);
        setPage(1);
        setHasMore(false);
    }, [userId]);


    useEffect(() => {
        loadSavedQuestions();
    }, [loadSavedQuestions]);

    const filteredQuestions = useMemo(() => {
        return filterQuestionsByQuery(questions, searchQuery);
    }, [questions, searchQuery]);

    return (
        <>
            <div className="flex justify-between mt-6 my-4 md:mb-5 md:mt-0">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Saved Questions
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Questions you've bookmarked to revisit later
                    </p>
                </div>

                <button className="text-sm text-gray-500 dark:text-gray-400">
                    Filter
                </button>
            </div>

            {filteredQuestions.length === 0 && !loading ? (
                <div className="flex flex-col items-center justify-center py-16 text-center border-t border-gray-300 dark:border-[#202020]">
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        No saved questions
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {searchQuery
                            ? "Try changing your search keywords."
                            : isOwnProfile
                                ? "You haven't saved any questions yet."
                                : "This user has no public saved questions."}
                    </p>
                </div>
            ) : (
                <>
                    <QuestionList questions={filteredQuestions} />

                    {hasMore && (
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={loadSavedQuestions}
                                disabled={loading}
                                className="px-6 py-2 rounded-lg font-medium bg-orange-500 hover:bg-orange-600 dark:bg-[#07C5B9] dark:hover:bg-[#06b1a7] text-white transition"
                            >
                                {loading ? "Loading..." : "Load More"}
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

SavedQuestions.propTypes = {
    userId: PropTypes.string.isRequired,
    isOwnProfile: PropTypes.bool.isRequired,
};
