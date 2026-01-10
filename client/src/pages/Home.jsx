import Hero from "../components/home/Hero";
import QuickStats from "../components/home/QuickStarts";
import QuestionsFeed from "../components/home/QuestionsFeed";
import AIFeatures from "../components/home/AIFeatures";
import RecommendedQuestions from "../components/home/RecommendedQuestions";
import CommunityHighlights from "../components/home/CommunityHighlights";
import ExploreCategories from "../components/home/ExploreCategories";
import PlatformStats from "../components/common/PlatformStats";

export default function Home() {

  return (
      <div className="min-h-screen bg-gray-100 dark:bg-[#0f0f0f]">
        <Hero />
        
        <QuickStats />

        <div className="max-w-6xl mx-auto py-10 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <QuestionsFeed />
              <AIFeatures />
            </div>

            <div className="space-y-4">
              <RecommendedQuestions />
              <CommunityHighlights />
              <ExploreCategories />
            </div>
          </div>
        </div>

        <PlatformStats />
      </div>
  )
}