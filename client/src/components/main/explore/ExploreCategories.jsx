import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    Sparkles,
    Flame,
    Brain,
    Star,
    Clock,
    Wand2,
    Compass,
    TrendingUp
} from 'lucide-react';
import AnalyticsContext from '../../../context/AnalyticsContext';

export default function ExploreCategories() {
    const { analytics, loading } = useContext(AnalyticsContext);

    const metrics = useMemo(() => {
        if (!analytics) return {};

        return {
            trendingQuestionsCount: analytics.trendingQuestions?.length || 0,
            aiSessionsCount: analytics.ai?.totalSessions || 0,
            trendingTopicsCount: analytics.trendingTopics?.length || 0,
        };
    }, [analytics]);

    const exploreSections = [
        {
            id: 'recommended',
            title: "Recommended For You",
            description: "AI-powered personalized suggestions based on your interests",
            icon: Sparkles,
            bgColor: "from-orange-400 to-orange-600",
            path: "/main?filter=recommended",
            showCount: false
        },
        {
            id: 'trending',
            title: "Trending Questions",
            description: "Most active discussions in the last 30 days",
            icon: Flame,
            bgColor: "from-red-400 to-red-600",
            path: "/main?filter=trending",
            showCount: true,
            count: metrics.trendingQuestionsCount
        },
        {
            id: 'ai-assisted',
            title: "AI-Assisted Posts",
            description: "Questions and answers powered by AI sessions",
            icon: Brain,
            bgColor: "from-blue-400 to-blue-600",
            path: "/main?filter=ai-assisted",
            showCount: true,
            count: metrics.aiSessionsCount
        },
        {
            id: 'popular',
            title: "Popular This Month",
            description: "Highly engaged posts based on answers & activity",
            icon: Star,
            bgColor: "from-yellow-400 to-yellow-600",
            path: "/main?filter=popular",
            showCount: false
        },
        {
            id: 'recent',
            title: "Recent Questions",
            description: "Freshly asked questions across all topics",
            icon: Clock,
            bgColor: "from-green-400 to-green-600",
            path: "/main?filter=recent",
            showCount: false
        },
        {
            id: 'ai-discover',
            title: "AI Discover",
            description: "Explore conversations generated with AI",
            icon: Wand2,
            bgColor: "from-purple-400 to-purple-600",
            path: "/main?filter=ai-discover",
            showCount: true,
            count: metrics.aiSessionsCount
        },
        {
            id: 'topic-explorer',
            title: "Topic Explorer",
            description: "Discover trending topics people are discussing",
            icon: Compass,
            bgColor: "from-teal-400 to-teal-600",
            path: "/main/topics",
            showCount: true,
            count: metrics.trendingTopicsCount
        },
        {
            id: 'top-contributors',
            title: "Top Accuracy Contributors",
            description: "Creators with highest AI-verified accuracy",
            icon: TrendingUp,
            bgColor: "from-pink-400 to-pink-600",
            path: "/leaderboard",
            showCount: false
        }
    ];

    if (loading) {
        return (
            <div className="mb-6 max-w-6xl w-full mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Explore Categories
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i * 0.2547}
                            className="h-36 rounded-lg bg-gray-200 dark:bg-[#191919] animate-pulse"
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mb-6 max-w-6xl w-full mx-auto">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Explore Categories
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {exploreSections.map((section) => {
                    const IconComponent = section.icon;

                    return (
                        <Link
                            key={section.id}
                            to={section.path}
                            className="p-4 rounded-lg cursor-pointer transition-all duration-300 border border-gray-200 dark:border-gray-800 dark:hover:border-gray-700 bg-white dark:bg-[#161616] hover:shadow-md group block"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg bg-gradient-to-r ${section.bgColor}`}>
                                    <IconComponent className="w-6 h-6 text-white" />
                                </div>

                                {section.showCount && (
                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                                        {section.count}
                                    </span>
                                )}
                            </div>

                            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-orange-500 dark:group-hover:text-[#07C5B9] transition-colors">
                                {section.title}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                                {section.description}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
