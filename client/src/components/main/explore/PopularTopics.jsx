import React, { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Target,
    ChevronRight,
    Brain,
    Globe,
    BarChart3,
    Smartphone,
    Rocket,
    Palette,
    BookOpen,
    Lightbulb,
    Code
} from "lucide-react";
import AnalyticsContext from "../../../context/AnalyticsContext";
import { slugify } from "../../../utils/helper";

const ICON_POOL = [
    Brain,
    Globe,
    BarChart3,
    Smartphone,
    Rocket,
    Palette,
    BookOpen,
    Lightbulb,
    Code,
    Target
];

const COLOR_POOL = [
    "bg-gradient-to-r from-purple-500 to-pink-500",
    "bg-gradient-to-r from-blue-500 to-cyan-500",
    "bg-gradient-to-r from-green-500 to-emerald-500",
    "bg-gradient-to-r from-orange-500 to-red-500",
    "bg-gradient-to-r from-indigo-500 to-purple-500",
    "bg-gradient-to-r from-pink-500 to-rose-500",
    "bg-gradient-to-r from-yellow-500 to-orange-500",
    "bg-gradient-to-r from-teal-500 to-cyan-500"
];

export default function PopularTopics() {
    const { analytics, loading } = useContext(AnalyticsContext);

    const [visibleCount, setVisibleCount] = useState(10);

    const getIndexFromString = (str = "", max) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash) % max;
    };

    const getTopicMeta = (topicName = "") => {
        const iconIndex = getIndexFromString(topicName, ICON_POOL.length);
        const colorIndex = getIndexFromString(topicName, COLOR_POOL.length);

        return {
            Icon: ICON_POOL?.[iconIndex],
            color: COLOR_POOL?.[colorIndex],
            path: `/main?topic=${slugify?.(topicName)}`
        };
    };

    const topics = useMemo(() => {
        return analytics?.trendingTopics ?? [];
    }, [analytics]);

    const visibleTopics = useMemo(() => {
        return topics?.slice?.(0, visibleCount) ?? [];
    }, [topics, visibleCount]);

    const canLoadMore = visibleCount < (topics?.length ?? 0);

    return (
        <div className="bg-white dark:bg-[#161616] rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 dark:bg-[#07C5B9]/20 rounded-lg">
                    <Target className="w-5 h-5 text-orange-500 dark:text-[#07C5B9]" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Popular Topics
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Explore what people are asking right now
                    </p>
                </div>
            </div>

            {/* Topics */}
            <div className="space-y-2">
                {visibleTopics?.map?.((topic, index) => {
                    const topicName = topic?._id ?? "";
                    const { Icon, color, path } = getTopicMeta(topicName);

                    if (!Icon) return null;

                    return (
                        <Link
                            key={`${topicName}-${index}`}
                            to={path}
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-[#202020] transition-all group hover:shadow-md"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center shadow-md`}
                                >
                                    <Icon className="w-6 h-6 text-white" />
                                </div>

                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-[#07C5B9] transition-colors">
                                        {topicName}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {topic?.count?.toLocaleString?.() ?? 0} questions
                                    </div>
                                </div>
                            </div>

                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 dark:group-hover:text-[#07C5B9] transition-all group-hover:translate-x-1" />
                        </Link>
                    );
                })}
            </div>

            {/* Load More */}
            {canLoadMore && !loading && (
                <button
                    onClick={() => setVisibleCount((prev) => prev + 10)}
                    className="mt-4 w-full text-sm font-medium text-orange-500 dark:text-[#07C5B9] hover:underline"
                >
                    Load more topics
                </button>
            )}

            {loading && (
                <p className="text-xs text-center mt-3 text-gray-400">
                    Updating trends...
                </p>
            )}
        </div>
    );
}
