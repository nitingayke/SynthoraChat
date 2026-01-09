import Activities from "../components/community/Activities";
import Hero from "../components/community/Hero";
import JoinCommunity from "../components/community/JoinCommunity";
import Stories from "../components/community/Stories";
import Values from "../components/community/Values";

export default function Community() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-[#0f0f0f]">
            <Hero />
            <Stories />
            <Values />
            <Activities />
            <JoinCommunity />
        </div>
    )
}