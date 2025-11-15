import React from 'react';
import { Crown, Lightbulb, Zap, Rocket } from 'lucide-react';

export default function CommunitySpotlight() {
    return (
        <div className="mt-12 bg-gradient-to-r from-gray-50 to-white dark:from-[#1a1a1a] dark:to-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-500/20 rounded-lg">
                    <Crown className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Community Spotlight</h2>
                    <p className="text-gray-600 dark:text-gray-400">Why our community loves us</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-white dark:bg-[#1c1c1c] rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Lightbulb className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">Top Contributors</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        Experts from top companies sharing valuable insights and helping others learn through detailed explanations
                    </p>
                </div>
                <div className="text-center p-6 bg-white dark:bg-[#1c1c1c] rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">AI Accuracy</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        95% of AI answers rated helpful by our community with continuous improvement through user feedback
                    </p>
                </div>
                <div className="text-center p-6 bg-white dark:bg-[#1c1c1c] rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">Fast Responses</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        Average answer time: 15 minutes with AI assistance. Get instant help when you need it most
                    </p>
                </div>
            </div>
        </div>
    );
}