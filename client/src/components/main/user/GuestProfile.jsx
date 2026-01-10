import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
    Users,
    MessageSquare,
    ThumbsUp,
    Brain,
    Rocket,
    TrendingUp,
    Award,
    ArrowRight,
} from "lucide-react";
import Avatar from "@mui/material/Avatar";
import AnalyticsContext from "../../../context/AnalyticsContext";
import { slugify } from "../../../utils/helper";

export default function GuestProfile() {
    const { loading, analytics } = useContext(AnalyticsContext);

    if (loading || !analytics) {
        return (
            <div className="w-full rounded-lg bg-white dark:bg-[#191919] p-6 border border-gray-200 dark:border-[#222222]">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Loading platform insights...
                </p>
            </div>
        );
    }

    const platformStats = [
        {
            icon: Users,
            value: analytics?.users?.total?.toLocaleString(),
            label: "Total Users",
        },
        {
            icon: MessageSquare,
            value: analytics?.content?.questions?.total?.toLocaleString(),
            label: "Questions",
        },
        {
            icon: ThumbsUp,
            value: analytics?.content?.answers?.total?.toLocaleString(),
            label: "Answers",
        },
        {
            icon: Brain,
            value: analytics?.ai?.totalSessions?.toLocaleString(),
            label: "AI Sessions",
        },
    ];

    const features = [
        {
            icon: TrendingUp,
            title: "Community Driven",
            description: "Learn from real developers and experts",
        },
        {
            icon: Award,
            title: "Build Reputation",
            description: "Get recognized for quality answers",
        },
        {
            icon: Brain,
            title: "AI Assisted",
            description: "Smarter answers with AI collaboration",
        },
    ];

    return (
        <div className="w-full rounded-xl bg-white dark:bg-[#161616] border border-gray-200 dark:border-[#222222] overflow-hidden">
            <div className="relative h-30 bg-gradient-to-r from-[#07C5B9] to-[#0EA5E9]">
                <div className="absolute inset-0" />
                <div className="absolute top-3 left-4">
                    <h2 className="text-white font-bold text-xl md:text-2xl">Join Our Community</h2>
                </div>
            </div>

            <div className="px-4 pb-6">

                <div className="flex flex-col items-center -mt-12">
                    <div className="relative">
                        <Avatar
                            className="!h-16 !w-16 md:!h-25 md:!w-25 border-4 border-white dark:border-[#161616] shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600"
                        >
                            <Users className="w-6 h-6 text-gray-500 dark:text-gray-300" />
                        </Avatar>
                    </div>

                    <h1 className="text-lg font-bold text-gray-900 dark:text-white mt-3 text-center">
                        Welcome to Q&A Platform
                    </h1>

                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 text-center">
                        Join thousands of learners and experts
                    </p>

                    <div className="mt-2">
                        <p className="text-gray-600 dark:text-gray-300 text-xs text-center leading-relaxed">
                            Ask questions, share knowledge, and grow together with AI-powered assistance
                        </p>
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                    {platformStats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={idx}
                                className="rounded-xl p-3 bg-gray-50 dark:bg-[#202020] border border-gray-200 dark:border-gray-700"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                            {stat.value}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {stat.label}
                                        </p>
                                    </div>
                                    <Icon className="w-4 h-4 text-orange-500 dark:text-[#07C5B9]" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-5 space-y-3">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                        Why Join?
                    </h4>

                    {features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={idx}
                                className="flex gap-3 p-3 rounded-xl bg-gray-100 dark:bg-[#202020]"
                            >
                                <Icon className="w-4 h-4 text-orange-500 dark:text-[#07C5B9]" />
                                <div>
                                    <p className="text-xs font-medium text-gray-900 dark:text-white">
                                        {feature.title}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {analytics.trendingTopics?.length > 0 && (
                    <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            Trending Topics
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {analytics.trendingTopics.slice(0, 8).map((topic) => (
                                <Link
                                    key={topic?._id}
                                    to={`/main?topic=${slugify(topic?._id)}`}
                                    className="px-2 py-1 text-xs rounded-full bg-orange-100 dark:bg-[#07C5B9]/20 text-orange-500 dark:text-[#07C5B9]"
                                >
                                    #{topic?._id}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-6 space-y-3">
                    <Link
                        to="/signup"
                        className="flex items-center justify-center gap-2 py-2 rounded-lg bg-orange-500 dark:bg-[#07C5B9] text-white font-medium hover:opacity-90"
                    >
                        <Rocket className="w-4 h-4" />
                        Get Started Free
                        <ArrowRight className="w-4 h-4" />
                    </Link>

                    <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                        Already a member?{" "}
                        <Link
                            to="/login"
                            className="text-orange-500 dark:text-[#07C5B9] font-medium hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
