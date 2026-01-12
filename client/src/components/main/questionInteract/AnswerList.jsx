import { Hash } from "lucide-react";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import AnswerCard from "./AnswerCard";
import { getAnswersByQuestionId } from "../../../services/answer.service";
import { useSnackbar } from "notistack";

const LIMIT = 10;

export default function AnswerList({ question }) {
  const { enqueueSnackbar } = useSnackbar();

  const [answers, setAnswers] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchAnswers = useCallback(
    async (currentSkip, isInitialLoading = false) => {
      if (loading) return;
      if (!question?._id) return;
      if (!isInitialLoading && !hasMore) return;

      try {
        setLoading(true);

        const res = await getAnswersByQuestionId(
          question._id,
          currentSkip,
          LIMIT
        );

        setAnswers((prev) =>
          isInitialLoading ? res.data.answers : [...prev, ...res.data.answers]
        );

        setHasMore(res.meta.hasMore);
        setSkip(currentSkip + LIMIT);
      } catch (error) {
        enqueueSnackbar(
          error?.response?.data?.message || "Failed to load answers",
          { variant: "error" }
        );
      } finally {
        setLoading(false);
      }
    },
    [loading, question?._id, hasMore, enqueueSnackbar]
  );

  useEffect(() => {
    if (!question?._id) return;

    setAnswers([]);
    setSkip(0);
    setHasMore(true);

    fetchAnswers(0, true);
  }, [question?._id]); // DO NOT add fetchAnswers here

  if (!answers.length && !loading) {
    return (
      <div className="px-4 py-7 text-gray-600 dark:text-gray-400 text-center">
        No answers yet — be the first to contribute!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div id="answers" className="pb-3 mb-0" />

      <a
        href="#answers"
        className="flex items-center gap-1 text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2"
      >
        <Hash size={20} /> Answers ({answers.length})
      </a>

      <div className="border-b border-gray-300 dark:border-[#2a2a2a]" />

      {answers.map((a) => (
        <AnswerCard
          key={a._id}
          answer={a}
          allowComments={question?.allowComments}
        />
      ))}

      {hasMore && (
        <div className="flex justify-center items-center mt-3">
          <button
            disabled={loading}
            onClick={() => fetchAnswers(skip, false)}
            className="text-sm rounded-md px-3 py-2 bg-gray-100 dark:bg-[#111] hover:bg-gray-200 dark:hover:bg-[#212121] disabled:opacity-60"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

AnswerList.propTypes = {
  question: PropTypes.object.isRequired,
};
