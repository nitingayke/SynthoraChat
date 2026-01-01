import { useContext, useState, useMemo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import UIStateContext from "../../../context/UIStateContext";

import AnswerCard from "./AnswerCard";
import { filterAnswersByQuery } from "../../../utils/answerUtils"
import { fetchUserAnswers } from "../../../services/user.service";
import { enqueueSnackbar } from "notistack";

const PAGE_SIZE = 15;

export default function UserAnswers({ userId, isOwnProfile }) {

    const { searchQuery } = useContext(UIStateContext);

    const [answers, setAnswers] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const loadAnswers = useCallback(async () => {
        if (loading || !hasMore) return;

        try {
            setLoading(true);

            const res = await fetchUserAnswers(userId, page, PAGE_SIZE);

            if (res?.success) {
                setAnswers((prev) => [
                    ...prev,
                    ...(res?.data?.answers ?? []),
                ]);
                setHasMore(res?.pagination?.hasMore ?? false);
                setPage((prev) => prev + 1);
            }
        } catch (error) {
            enqueueSnackbar(
                error?.response?.data?.message || "Failed to load answers",
                { variant: "error" }
            );
        } finally {
            setLoading(false);
        }
    }, [hasMore, loading, page, userId]);

    useEffect(() => {
        setAnswers([]);
        setPage(1);
        setHasMore(true);
    }, [userId]);

    useEffect(() => {
        loadAnswers();
    }, [userId, loadAnswers]);

    const searchedAnswers = useMemo(() => {
        return filterAnswersByQuery(answers, searchQuery);
    }, [answers, searchQuery]);


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

            {searchedAnswers.length > 0 ? (
                <div className="space-y-4">
                    {searchedAnswers.map((answer) => (
                        <AnswerCard key={answer?._id} answer={answer} />
                    ))}
                </div>
            ) : !loading ? (
                <div className="py-12 text-center text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-[#202020]">
                    {searchQuery
                        ? "No answers match your search."
                        : "No answers available yet."}
                </div>
            ) : null}

            {hasMore && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={loadAnswers}
                        disabled={loading}
                        className="px-6 py-2 rounded-lg font-medium bg-orange-500 hover:bg-orange-600 dark:bg-[#07C5B9] dark:hover:bg-[#06b1a7] text-white transition disabled:opacity-60"
                    >
                        {loading ? "Loading..." : "Load More"}
                    </button>
                </div>
            )}
        </>
    );
}

UserAnswers.propTypes = {
    userId: PropTypes.string.isRequired,
    isOwnProfile: PropTypes.bool.isRequired,
};
