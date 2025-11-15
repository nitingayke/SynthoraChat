import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, Clock, Star, Brain, MessageSquare } from 'lucide-react';

const filters = [
    { id: 'trending', label: 'Trending', icon: TrendingUp, path: "/main/explore?query=trending" },
    { id: 'recent', label: 'Recent', icon: Clock, path: "/main/explore?query=recent" },
    { id: 'popular', label: 'Popular', icon: Star, path: "/main/explore?query=popular" },
    { id: 'ai', label: 'AI Answers', icon: Brain, path: "/main/explore?query=ai" },
    { id: 'unanswered', label: 'Unanswered', icon: MessageSquare, path: "/main/explore?query=unanswered" }
];

export default function FilterTabs() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const activeFilter = searchParams.get("query");

    return (
        <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Browse Questions</h3>
            </div>
            <div className="flex flex-nowrap overflow-x-auto gap-2 scrollbar-hide">
                {filters.map((filter) => {
                    const IconComponent = filter.icon;
                    return (
                        <Link
                            key={filter.id}
                            to={filter.path}
                            className={`flex items-center whitespace-nowrap gap-3 px-3 py-1.5 rounded-md transition-all font-medium ${activeFilter === filter.id
                                    ? 'bg-[#07C5B9] text-white shadow-lg'
                                    : 'bg-gray-100 dark:bg-[#202020] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2a2a2a]'
                                }`}
                        >
                            <IconComponent className="w-4 h-4" />
                            <span>{filter.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}