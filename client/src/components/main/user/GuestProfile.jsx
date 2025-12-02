import React from "react";
import { Link } from "react-router-dom";
import {
    Users,
    Star,
    Zap,
    MessageSquare,
    ThumbsUp,
    Brain,
    ArrowRight,
    Rocket,
    TrendingUp,
    Award
} from "lucide-react";
import Avatar from "@mui/material/Avatar";

export default function GuestProfile() {

    const platformStats = [
        {
            icon: Users,
            value: "10K+",
            label: "Active Users",
            color: "text-orange-500 dark:text-blue-400"
        },
        {
            icon: MessageSquare,
            value: "50K+",
            label: "Questions",
            color: "text-green-500 dark:text-green-400"
        },
        {
            icon: ThumbsUp,
            value: "100K+",
            label: "Answers",
            color: "text-purple-500 dark:text-purple-400"
        },
        {
            icon: Brain,
            value: "AI Powered",
            label: "Smart Answers",
            color: "text-orange-500 dark:text-orange-400"
        }
    ];

    const features = [
        {
            icon: Zap,
            title: "AI-Powered Answers",
            description: "Get instant, intelligent responses to your questions"
        },
        {
            icon: TrendingUp,
            title: "Community Driven",
            description: "Learn from experts and share your knowledge"
        },
        {
            icon: Award,
            title: "Build Reputation",
            description: "Earn recognition for your contributions"
        },
        {
            icon: Rocket,
            title: "Fast & Reliable",
            description: "Quick responses with accurate information"
        }
    ];

    return (
        <div className="w-full bg-white dark:bg-[#161616] rounded-lg border border-gray-200 dark:border-gray-800/50 overflow-hidden transition-all duration-300">
            {/* Header with Gradient */}
            <div className="relative h-30 bg-gradient-to-r from-[#07C5B9] to-[#0EA5E9]">
                <div className="absolute inset-0" />
                <div className="absolute top-3 left-4">
                    <h2 className="text-white font-bold text-xl md:text-2xl">Join Our Community</h2>
                </div>
            </div>

            {/* Profile Content */}
            <div className="px-4 pb-5">
                {/* Avatar & Welcome */}
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

                {/* Platform Stats */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                    {platformStats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div 
                                key={index * 0.254}
                                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-500/10 dark:to-gray-600/10 p-3 rounded-lg border border-gray-200 dark:border-gray-500/20"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            {stat.label}
                                        </div>
                                    </div>
                                    <IconComponent className={`w-4 h-4 ${stat.color}`} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Features List */}
                <div className="mt-4 space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Zap className="w-4 h-4 text-orange-500 dark:text-[#07C5B9]" />
                        Why Join Us?
                    </h3>
                    
                    <div className="space-y-2">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div 
                                    key={index * 0.2548}
                                    className="flex items-start gap-3 p-2 bg-gray-200 dark:bg-[#202020] rounded-lg transition-colors"
                                >
                                    <IconComponent className="w-4 h-4 text-orange-500 dark:text-[#07C5B9] mt-0.5 flex-shrink-0" />
                                    <div>
                                        <div className="text-xs font-medium text-gray-900 dark:text-white">
                                            {feature.title}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {feature.description}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Trending Topics */}
                <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Popular Topics
                    </h3>
                    <div className="flex flex-wrap gap-1">
                        {[
                            "React", "JavaScript", "Python", "AI/ML", 
                            "Web Development", "Data Science", "DevOps", "Mobile"
                        ].map((topic, index) => (
                            <span
                                key={index * 0.2587}
                                className="px-2 py-1 bg-orange-100 dark:bg-[#07C5B9]/20 text-orange-500 dark:text-[#07C5B9] text-xs rounded-full border border-orange-200 dark:border-[#07C5B9]/30"
                            >
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-5 space-y-3">
                    <Link
                        to="/login"
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#07C5B9] text-white rounded-lg hover:opacity-80 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                    >
                        <Rocket className="w-4 h-4" />
                        Get Started - It's Free
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    
                    <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Already have an account?{" "}
                            <Link 
                                to="/signup" 
                                className="text-orange-500 dark:text-[#07C5B9] hover:underline font-medium"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Quick Stats Footer */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>🚀 Fast Learning</span>
                        <span>💡 Expert Community</span>
                        <span>🤖 AI Powered</span>
                    </div>
                </div>
            </div>
        </div>
    );
}