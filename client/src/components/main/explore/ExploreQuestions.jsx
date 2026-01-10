import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
    TrendingUp,
    ChevronRight,
    MessageSquare,
    ThumbsUp,
    Eye,
    Clock,
    Star
} from 'lucide-react';

import FilterTabs from './FilterTabs';
import AnalyticsContext from '../../../context/AnalyticsContext';
import QuestionContext from '../../../context/QuestionContext';

const ITEMS_PER_LOAD = 7;

const FILTER_META = {
    trending: {
        title: "Trending Questions",
        description: "Most active discussions in the last 30 days",
        icon: TrendingUp
    },
    recent: {
        title: "Recent Questions",
        description: "Freshly asked questions across the platform",
        icon: Clock
    }
};

export default function ExploreQuestions() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "trending";

    const { analytics, loading } = useContext(AnalyticsContext);
    const { newQuestions } = useContext(QuestionContext);

    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

    useEffect(() => {
        setVisibleCount(ITEMS_PER_LOAD);
    }, [query]);

    const questions = useMemo(() => {
        if (query === "recent") {
            return newQuestions || [];
        } else if (query === "trending" && analytics) {
            return analytics.trendingQuestions || [];
        }

        return [];

    }, [analytics, newQuestions, query]);

    const visibleQuestions = useMemo(
        () => questions.slice(0, visibleCount),
        [questions, visibleCount]
    );

    const meta = FILTER_META[query] || FILTER_META.trending;
    const HeaderIcon = meta.icon;

    return (
        <div className="bg-white dark:bg-[#161616] rounded-lg border border-gray-200 dark:border-gray-800">
            <FilterTabs />

            <div className="overflow-hidden shadow-sm">
                {/* HEADER */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-[#1a1a1a] dark:to-[#161616]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-100 dark:bg-[#07C5B9]/20 rounded-lg hidden sm:flex">
                                <HeaderIcon className="w-6 h-6 text-orange-500 dark:text-[#07C5B9]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                                    <span className="text-orange-500 dark:text-[#07C5B9]">
                                        {query.toUpperCase()}
                                    </span>{" "}
                                    Questions
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                    {meta.description}
                                </p>
                            </div>
                        </div>

                        <Link
                            to={`/main?filter=${query}`}
                            className="text-orange-500 dark:text-[#07C5B9]
                                       hover:underline font-medium text-sm
                                       flex items-center gap-1 group"
                        >
                            View All
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {loading && (
                        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                            Loading questions...
                        </div>
                    )}

                    {!loading && visibleQuestions.length === 0 && (
                        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                            No questions found for this filter.
                        </div>
                    )}

                    {!loading && visibleQuestions.map((question) => (
                        <div
                            key={question._id}
                            className="p-4 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <Link to={`/main/questions/${question._id}`}>
                                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-orange-500 dark:group-hover:text-[#07C5B9] group-hover:underline group-hover:translate-x-1 transition-transform">
                                            {question.title}
                                        </h3>
                                    </Link>

                                    {question.content && (
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                                            {question.content}
                                        </p>
                                    )}

                                    {/* TOPICS */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {(question.topics || []).map((topic, idx) => (
                                            <span
                                                key={idx * 0.2145}
                                                className="px-3 py-1 text-xs rounded-full bg-orange-100 dark:bg-[#07C5B9]/20 text-orange-500 dark:text-[#07C5B9] border border-orange-200 dark:border-[#07C5B9]/30"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>

                                    {/* STATS */}
                                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <MessageSquare className="w-3 h-3" />
                                            {question.answers?.length || 0} answers
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <ThumbsUp className="w-3 h-3" />
                                            {question.upvotes?.length || 0} upvotes
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-3 h-3" />
                                            {question.views || 0} views
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {!loading && visibleCount < questions.length && (
                    <div className="p-4 flex justify-center">
                        <button
                            onClick={() => setVisibleCount(prev => prev + ITEMS_PER_LOAD)}
                            className="px-6 py-2 rounded-md font-medium bg-orange-500 dark:bg-[#07C5B9] text-white hover:opacity-90 transition"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
