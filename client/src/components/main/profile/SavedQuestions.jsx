import { useContext, useState, useMemo, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { enqueueSnackbar } from "notistack";

import UIStateContext from "../../../context/UIStateContext";

import QuestionList from "./QuestionList";
import { filterQuestionsByQuery } from "../../../utils/questionUtils";
import { fetchSavedQuestions } from "../../../services/user.service";

const PAGE_SIZE = 10;

export default function SavedQuestions({ userId, isOwnProfile = false }) {

    const { debouncedSearchQuery } = useContext(UIStateContext);

    const [questions, setQuestions] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    const isInitialFetch = useRef(false);

    const loadSavedQuestions = useCallback(async () => {
        if (loading || !hasMore) return;

        try {
            setLoading(true);

            const res = await fetchSavedQuestions(userId, cursor, PAGE_SIZE);

            if (res?.success) {
                const newQuestions = res.data.questions.map(sq => ({
                    ...sq.question,
                    savedAt: sq.savedAt,
                }));

                setQuestions(prev => {
                    const map = new Map(prev.map(q => [q?._id, q]));
                    newQuestions.forEach(q => map.set(q?._id, q));
                    return Array.from(map.values());
                });

                setHasMore(res.pagination.hasMore);
                setCursor(res.pagination.nextCursor);
            }
        } catch (error) {
            enqueueSnackbar(
                error?.response?.data?.message || "Failed to load saved questions",
                { variant: "error" }
            );
        } finally {
            setLoading(false);
            setInitialLoading(false);
        }
    }, [userId, cursor, loading, hasMore]);

    useEffect(() => {
        setQuestions([]);
        setCursor(null);
        setHasMore(true);
        setInitialLoading(true);
        isInitialFetch.current = false;
    }, [userId]);

    useEffect(() => {
        if (isInitialFetch.current) return;
        isInitialFetch.current = true;
        loadSavedQuestions();
    }, [loadSavedQuestions]);

    const filteredQuestions = useMemo(() => {
        return filterQuestionsByQuery(questions, debouncedSearchQuery);
    }, [questions, debouncedSearchQuery]);

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
            </div>

            {initialLoading && (
                <div className="py-16 text-center text-gray-500">
                    Loading saved questions...
                </div>
            )}

            {!initialLoading && filteredQuestions.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center border-t border-gray-300 dark:border-[#202020]">
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        No saved questions
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {debouncedSearchQuery
                            ? "Try changing your search keywords."
                            : isOwnProfile
                                ? "You haven't saved any questions yet."
                                : "This user has no public saved questions."}
                    </p>
                </div>
            )}

            {filteredQuestions.length > 0 && (
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
