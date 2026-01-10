import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Clock,
  MessageCircle,
  ThumbsUp,
  Eye,
  ArrowRight,
} from "lucide-react";

import AnalyticsContext from "../../context/AnalyticsContext";
import QuestionContext from "../../context/QuestionContext";

const ITEMS_PER_LOAD = 6;

const FILTER_META = {
  trending: {
    label: "Trending",
    icon: TrendingUp,
    description: "Most active discussions right now",
  },
  latest: {
    label: "Latest",
    icon: Clock,
    description: "Recently asked questions",
  },
};

export default function QuestionsFeed() {
  const [activeFilter, setActiveFilter] = useState("trending");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const { analytics, loading } = useContext(AnalyticsContext);
  const { newQuestions } = useContext(QuestionContext);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [activeFilter]);

  /* -------------------- DATA SOURCE -------------------- */
  const questions = useMemo(() => {
    if (activeFilter === "latest") return newQuestions ?? [];
    if (activeFilter === "trending")
      return analytics?.trendingQuestions ?? [];
    return [];
  }, [activeFilter, analytics, newQuestions]);

  const visibleQuestions = useMemo(
    () => questions.slice(0, visibleCount),
    [questions, visibleCount]
  );

  const HeaderIcon = FILTER_META[activeFilter].icon;

  return (
    <section className="w-full">
      <div
        className="bg-white dark:bg-[#161616] border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden"
      >
        {/* -------------------- HEADER -------------------- */}
        <div className="p-4 border-b border-gray-200 dark:border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-orange-100 dark:bg-[#07C5B9]/10 hidden sm:flex">
                <HeaderIcon className="w-5 h-5 text-orange-500 dark:text-[#07C5B9]" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {FILTER_META[activeFilter].label} Questions
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {FILTER_META[activeFilter].description}
                </p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              {Object.keys(FILTER_META).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition
                      ${activeFilter === key
                      ? "bg-orange-500 dark:bg-[#07C5B9] text-white"
                      : "bg-gray-100 dark:bg-[#1f1f1f] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#262626]"
                    }
                    `}
                >
                  {FILTER_META[key].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {loading && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              Loading questions...
            </div>
          )}

          {!loading && visibleQuestions.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              No questions found.
            </div>
          )}

          {!loading &&
            visibleQuestions.map((question) => (
              <div
                key={question?._id}
                className="group p-4 rounded-xl bg-gray-100 dark:bg-[#1a1a1a] border border-transparent hover:border-gray-200 dark:hover:border-white/10 hover:bg-gray-200/60 dark:hover:bg-[#1f1f1f] transition"
              >
                <Link to={`/main/questions/${question?._id}`}>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2 line-clamp-2 group-hover:text-orange-500 dark:group-hover:text-[#07C5B9] group-hover:underline">
                    {question?.title}
                  </h3>
                </Link>

                {question?.content && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {question.content}
                  </p>
                )}

                {/* Topics */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {(question?.topics ?? []).slice(0, 4).map((topic, idx) => (
                    <span
                      key={`${topic}-${idx}`}
                      className="px-2 py-1 text-xs rounded-full bg-orange-100 dark:bg-[#07C5B9]/10 text-orange-700 dark:text-[#07C5B9]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {question?.answers?.length ?? 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      {question?.upvotes?.length ?? 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {question?.views ?? 0}
                    </span>
                  </div>

                  <Link
                    to={`/main/questions/${question?._id}`}
                    className="flex items-center gap-1 hover:text-orange-500 dark:hover:text-[#07C5B9]"
                  >
                    View
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
        </div>

        {!loading && visibleCount < questions.length && (
          <div className="p-4 border-t border-gray-200 dark:border-white/10">
            <button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_LOAD)}
              className="w-full py-2.5 rounded-xl font-medium bg-orange-500 dark:bg-[#07C5B9] text-white hover:opacity-90 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
