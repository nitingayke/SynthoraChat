import Content from "../components/leaderboard/Content";
import Hero from "../components/leaderboard/Hero";
import Tabs from "../components/leaderboard/Tabs";

export default function Leaderboard() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <Hero />
            <Tabs />
            <Content />
        </div>
    )
}