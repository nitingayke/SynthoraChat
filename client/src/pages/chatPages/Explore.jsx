import React from 'react';
import ExploreHeader from '../../components/main/explore/ExploreHeader';
import ExploreCategories from '../../components/main/explore/ExploreCategories';
import ExploreQuestions from '../../components/main/explore/ExploreQuestions';
import AILearningAssistant from '../../components/main/explore/AILearningAssistant';
import PopularTopics from '../../components/main/explore/PopularTopics';
import AIFeatures from '../../components/main/explore/AIFeatures';
import QuickActions from '../../components/main/explore/QuickActions';
import CommunitySpotlight from '../../components/main/explore/CommunitySpotlight';

export default function ExplorePage() {

    return (
        <div className="max-w-7xl mx-auto py-5 md:py-15">
            <ExploreHeader />

            <ExploreCategories />

            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="xl:col-span-2 space-y-8">
                    <ExploreQuestions />
                    <AILearningAssistant />
                </div>

                <div className="space-y-4">
                    <PopularTopics />
                    <AIFeatures />
                    <QuickActions />
                </div>
            </div>
            
            <CommunitySpotlight />
        </div>
    )
}