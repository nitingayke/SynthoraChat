// pages/Leaderboard.jsx
import Hero from "../components/leaderboard/Hero";
import LeaderboardList from "../components/leaderboard/LeaderboardList";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function Leaderboard() {
    useDocumentTitle("Leaderboard");

    const leaderboardUsers = [
        {
            _id: "1",
            username: "sarah_chen",
            profile: { profilePicture: "" },
            upvotesCount: 1240,
            helpfulAnswers: 180,
            answersCount: 245,
            questionsCount: 38,
            accuracy: 98,
            followers: new Array(1200),
            following: new Array(180),
        },
        {
            _id: "2",
            username: "emily_watson",
            profile: { profilePicture: "" },
            upvotesCount: 1105,
            helpfulAnswers: 160,
            answersCount: 210,
            questionsCount: 41,
            accuracy: 97,
            followers: new Array(980),
            following: new Array(150),
        },
        {
            _id: "3",
            username: "alex_thompson",
            profile: { profilePicture: "" },
            upvotesCount: 980,
            helpfulAnswers: 140,
            answersCount: 190,
            questionsCount: 29,
            accuracy: 96,
            followers: new Array(860),
            following: new Array(130),
        },
        {
            _id: "4",
            username: "marcus_dev",
            profile: { profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQykzoZeCE0p7LeuyHnLYCdPP2jju9d5PaMeA&s" },
            upvotesCount: 740,
            helpfulAnswers: 120,
            answersCount: 160,
            questionsCount: 35,
            accuracy: 94,
            followers: new Array(620),
            following: new Array(110),
        },
        {
            _id: "5",
            username: "ravi_codes",
            profile: { profilePicture: "" },
            upvotesCount: 690,
            helpfulAnswers: 105,
            answersCount: 145,
            questionsCount: 31,
            accuracy: 93,
            followers: new Array(580),
            following: new Array(98),
        },
        {
            _id: "6",
            username: "nitin_ai",
            profile: { profilePicture: "" },
            upvotesCount: 640,
            helpfulAnswers: 98,
            answersCount: 132,
            questionsCount: 28,
            accuracy: 92,
            followers: new Array(520),
            following: new Array(90),
        },
    ];

    const topThree = leaderboardUsers.slice(0, 3);
    const restUsers = leaderboardUsers.slice(3);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-[#181818]">
            <Hero users={topThree} />
            <LeaderboardList users={restUsers} startRank={4} />
        </div>
    );
}
