import AIFeatures from "../components/features/AIFeatures";
import CommunityFeatures from "../components/features/CommunityFeatures";
import CoreFeatures from "../components/features/CoreFeatures";
import FeatureComparison from "../components/features/FeatureComparison";
import FeaturesCTA from "../components/features/FeaturesCTA";
import Hero from "../components/features/Hero";
import HowItWorks from "../components/features/HowItWorks";

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-brs from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <Hero />
        <CoreFeatures />
        <AIFeatures />
        <CommunityFeatures />
        <HowItWorks />
        <FeatureComparison />
        <FeaturesCTA />
    </div>
  );
}