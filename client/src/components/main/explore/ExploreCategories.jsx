import React from 'react';
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

const exploreSections = [
    {
        id: 'recommended',
        title: "Recommended For You",
        description: "AI-powered personalized suggestions based on your interests",
        icon: Sparkles,
        color: "text-orange-500",
        bgColor: "from-orange-400 to-orange-600",
        count: "1.2K",
        path: "/main?filter=recommended"
    },
    {
        id: 'trending',
        title: "Trending Questions",
        description: "Most active and rapidly growing discussions",
        icon: Flame,
        color: "text-red-500",
        bgColor: "from-red-400 to-red-600",
        count: "856",
        path: "/main?filter=trending"
    },
    {
        id: 'ai-assisted',
        title: "AI-Assisted Posts",
        description: "Questions enhanced and refined using AI",
        icon: Brain,
        color: "text-blue-500",
        bgColor: "from-blue-400 to-blue-600",
        count: "432",
        path: "/main?filter=ai-assisted"
    },
    {
        id: 'popular',
        title: "Popular This Week",
        description: "Top rated answers and heavily engaged posts",
        icon: Star,
        color: "text-yellow-500",
        bgColor: "from-yellow-400 to-yellow-600",
        count: "2.1K",
        path: "/main?filter=popular"
    },
    {
        id: 'recent',
        title: "Recent Questions",
        description: "Freshly asked questions across all categories",
        icon: Clock,
        color: "text-green-500",
        bgColor: "from-green-400 to-green-600",
        count: "324",
        path: "/main?filter=recent"
    },
    {
        id: 'ai-discover',
        title: "AI Discover",
        description: "Explore topics generated completely by AI",
        icon: Wand2,
        color: "text-purple-500",
        bgColor: "from-purple-400 to-purple-600",
        count: "189",
        path: "/main?filter=ai-discover"
    },
    {
        id: 'topic-explorer',
        title: "Topic Explorer",
        description: "Find posts from categories you love",
        icon: Compass,
        color: "text-teal-500",
        bgColor: "from-teal-400 to-teal-600",
        count: "1.5K",
        path: "/main/topics"
    },
    {
        id: 'top-contributors',
        title: "Top Accuracy Contributors",
        description: "Creators with highest AI-verified accuracy score",
        icon: TrendingUp,
        color: "text-pink-500",
        bgColor: "from-pink-400 to-pink-600",
        count: "156",
        path: "/leaderboard"
    }
];

export default function ExploreCategories() {
    return (
        <div className="mb-6 sm:mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Explore Categories</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {exploreSections.map((section) => {
                    const IconComponent = section.icon;
                    return (
                        <Link
                            key={section.id}
                            to={section.path}
                            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 border-gray-200 dark:border-gray-800 dark:hover:border-gray-700 bg-white dark:bg-[#161616] hover:shadow-md group block`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-gradient-to-r ${section.bgColor}`}>
                                    <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                                    {section.count}
                                </span>
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-blue-500 dark:group-hover:text-[#07C5B9] transition-colors">
                                {section.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {section.description}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}