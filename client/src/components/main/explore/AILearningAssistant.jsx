import React from 'react';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';

export default function AILearningAssistant() {
    return (
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-lg p-4 sm:p-6 md:p-8 text-white shadow-xl mx-2 sm:mx-0">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                {/* Icon Section */}
                <div className="bg-white/20 p-3 sm:p-4 rounded-lg backdrop-blur-sm flex-shrink-0">
                    <Bot className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                </div>
                
                {/* Content Section */}
                <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">
                        AI Learning Assistant
                    </h3>
                    <p className="mb-4 sm:mb-6 opacity-95 text-sm sm:text-base md:text-lg leading-relaxed">
                        Get personalized explanations, code examples, and learning resources powered by our advanced AI.
                        Perfect for quick answers and deep dives into complex topics.
                    </p>
                    
                    {/* Buttons - Stack on mobile, row on larger screens */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center sm:justify-start">
                        <Link
                            to="/main/ai-chat"
                            className="bg-white text-purple-600 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base text-center"
                        >
                            🚀 Try AI Assistant
                        </Link>
                        <Link
                            to="/main/ai-examples"
                            className="bg-transparent border-2 border-white/40 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-white/10 transition-all backdrop-blur-sm text-sm sm:text-base text-center"
                        >
                            📚 View Examples
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}