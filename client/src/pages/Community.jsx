import Activities from "../components/community/Activities";
import Hero from "../components/community/Hero";
import JoinCommunity from "../components/community/JoinCommunity";
import Stories from "../components/community/Stories";
import Values from "../components/community/Values";

export default function Community() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <Hero />
            <Stories />
            <Values />
            <Activities />
            <JoinCommunity />
        </div>
    )
}