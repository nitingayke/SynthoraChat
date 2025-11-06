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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <Hero />
        <QuickStats />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <QuestionsFeed />
              <AIFeatures />
            </div>

            <div className="space-y-8">
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