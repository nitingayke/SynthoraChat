import { useContext, useState, useMemo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import UIStateContext from "../../../context/UIStateContext";

import QuestionList from "./QuestionList";
import { filterQuestionsByQuery } from "../../../utils/questionUtils";
import { fetchUserQuestions } from "../../../services/user.service";
import { enqueueSnackbar } from "notistack";

const PAGE_SIZE = 15;

export default function UserQuestions({ userId, isOwnProfile = false }) {

    const { searchQuery } = useContext(UIStateContext);

    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);


    const loadQuestions = useCallback(async () => {
        if (loading || !hasMore) return;

        try {
            setLoading(true);
            const res = await fetchUserQuestions(userId, page, PAGE_SIZE);

            if (res.success) {
                setQuestions((prev) => [...prev, ...(res?.data?.questions ?? [])]);
                setHasMore(res?.pagination?.hasMore ?? false);
                setPage((prev) => prev + 1);
            }
        } catch (error) {
            enqueueSnackbar(error?.response?.data?.message || "", { variant: "error" });
        } finally {
            setLoading(false);
        }
    }, [hasMore, loading, page, userId]);

    useEffect(() => {
        setQuestions([]);
        setPage(1);
        setHasMore(false);
        loadQuestions();
    }, [userId, loadQuestions]);

    const filteredQuestions = useMemo(() => {
        return filterQuestionsByQuery(questions, searchQuery);
    }, [questions, searchQuery]);


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

            {filteredQuestions?.length === 0 && !loading ? (
                <div className="flex flex-col items-center justify-center py-16 text-center border-t border-gray-300 dark:border-[#202020]">
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        No questions found
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {searchQuery ? "Try changing your search keywords." : "User hasn't asked any public questions."}
                    </p>
                </div>
            ) : (
                <>
                    <QuestionList questions={filteredQuestions} userQuestion={true} />

                    {hasMore && (
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={loadQuestions}
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

UserQuestions.propTypes = {
    userId: PropTypes.string.isRequired,
    isOwnProfile: PropTypes.bool.isRequired
};
