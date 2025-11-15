import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Target, Shield, Zap } from 'lucide-react';

const aiFeatures = [
    {
        icon: Sparkles,
        title: "AI Answer Generation",
        description: "Get instant AI-powered answers with source references and confidence scores",
        color: "from-purple-500 to-pink-500",
        action: "Try Now",
        path: "/main/ai-chat"
    },
    {
        icon: Target,
        title: "Smart Summarization",
        description: "Automatic summary of long discussions with key insights extraction",
        color: "from-blue-500 to-cyan-500",
        action: "View Demo",
        path: "/main/ai-summary"
    },
    {
        icon: Shield,
        title: "Fact Checking",
        description: "AI-powered accuracy verification with confidence scoring",
        color: "from-green-500 to-emerald-500",
        action: "Learn More",
        path: "/main/ai-fact-check"
    },
    {
        icon: Zap,
        title: "Quick Assistance",
        description: "Instant help with question formatting and clarity improvement",
        color: "from-orange-500 to-red-500",
        action: "Get Help",
        path: "/main/ai-assist"
    }
];

export default function AIFeatures() {
    return (
        <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-500/20 rounded-lg">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">AI Features</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Powered by advanced AI</p>
                </div>
            </div>
            <div className="space-y-4">
                {aiFeatures.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                        <Link
                            key={index}
                            to={feature.path}
                            className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500 transition-all group cursor-pointer bg-gradient-to-r from-white to-gray-50 dark:from-[#1a1a1a] dark:to-[#161616] hover:shadow-md block"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                                    <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-900 dark:text-white mb-1">
                                        {feature.title}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                        {feature.description}
                                    </div>
                                    <div className="text-xs font-medium text-blue-500 dark:text-[#07C5B9] hover:underline">
                                        {feature.action} →
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}