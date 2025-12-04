import React from 'react';

export default function ExploreHeader() {
    return (
        <div className="text-center py-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text">
                Explore Knowledge
            </h1>
            <p className="sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover trending questions, AI-powered insights, and join our vibrant community of learners and experts.
            </p>
        </div>
    );
}