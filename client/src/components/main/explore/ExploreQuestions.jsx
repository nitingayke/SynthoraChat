import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { TrendingUp, ChevronRight, MessageSquare, ThumbsUp, Eye } from 'lucide-react';
import FilterTabs from './FilterTabs';

const trendingQuestions = [
    {
        _id: "1",
        title: "How to implement React Server Components in Next.js 14?",
        content: "Looking for best practices and real-world examples of RSC implementation. I'm particularly interested in performance optimization...",
        topics: ["React", "Next.js", "Web Development", "Performance"],
        answers: 24,
        upvotes: 156,
        views: 1200,
        author: { username: "react_dev", profile: { firstName: "Sarah", lastName: "Chen" } },
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        aiAccuracy: 92
    },
    {
        _id: "2",
        title: "AI vs Machine Learning vs Deep Learning - Key differences?",
        content: "Can someone explain the fundamental differences with practical examples? Looking for clear distinctions and use cases...",
        topics: ["AI", "Machine Learning", "Deep Learning", "Data Science"],
        answers: 18,
        upvotes: 89,
        views: 850,
        author: { username: "ai_enthusiast", profile: { firstName: "Mike", lastName: "Zhang" } },
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        aiAccuracy: 88
    },
    {
        _id: "3",
        title: "Best practices for microservices communication in 2024?",
        content: "What are the current best practices for microservices communication patterns? Interested in both synchronous and async approaches...",
        topics: ["Microservices", "Architecture", "Backend", "DevOps"],
        answers: 32,
        upvotes: 203,
        views: 1500,
        author: { username: "cloud_architect", profile: { firstName: "Alex", lastName: "Kumar" } },
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        aiAccuracy: 95
    }
];

export default function ExploreQuestions() {

    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "Trending";
    
    return (
        <div className="bg-white dark:bg-[#161616] rounded-lg border border-gray-200 dark:border-gray-800">
            <FilterTabs />
            
            <div className="overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-[#1a1a1a] dark:to-[#161616]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-100 dark:bg-[#07C5B9]/20 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-orange-500 dark:text-[#07C5B9]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    <span className='text-orange-500 dark:text-[#07C5B9]'>{(query || "").toUpperCase()}</span> Questions
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Most active discussions in the community
                                </p>
                            </div>
                        </div>
                        <Link 
                            to={`/main?query=${query}`}
                            className="text-orange-500 dark:text-[#07C5B9] hover:underline font-medium text-sm flex items-center gap-1 group"
                        >
                            View All 
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {trendingQuestions.map((question) => (
                        <div key={question._id} className="p-4 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors group">
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <Link to={`/questions/${question._id}`}>
                                        <h3 className="font-semibold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-[#07C5B9] text-lg mb-2 group-hover:translate-x-1 transition-transform">
                                            {question.title}
                                        </h3>
                                    </Link>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                                        {question.content}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {question.topics.map((topic, index) => (
                                            <span
                                                key={index * 0.12458}
                                                className="px-3 py-1 bg-orange-100 dark:bg-[#07C5B9]/20 text-orange-500 dark:text-[#07C5B9] text-xs rounded-full border border-orange-200 dark:border-[#07C5B9]/30 hover:bg-blue-200 dark:hover:bg-[#07C5B9]/30 transition-colors"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <MessageSquare className="w-3 h-3" />
                                            {question.answers} answers
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <ThumbsUp className="w-3 h-3" />
                                            {question.upvotes} upvotes
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-3 h-3" />
                                            {question.views} views
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}