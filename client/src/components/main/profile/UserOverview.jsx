import {
    MapPin,
    Globe,
    Briefcase,
    BookOpen,
    Star,
    TrendingUp,
    Award,
    Calendar,
    MessageSquare,
    ThumbsUp,
    Users,
    Clock,
    Target,
    Zap,
    BarChart3,
    UserCheck,
    FileText,
    Heart,
    Sparkles,
    Activity,
    ExternalLink,
    CornerUpRight,
} from "lucide-react";
import QuickActions from "./QuickActions"
import PropTypes from "prop-types";
import { formatDate, timeAgo } from "../../../utils/date"
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";


export default function UserOverview({ user }) {

    const { loginUser } = useContext(AuthContext);

    const isOwnProfile = loginUser && user && loginUser._id === user._id;


    if (!user) return null;

    const {
        profile = {},
        credentials = [],
        topicsOfInterest = [],
        knowsAbout = [],
        followers = [],
        following = [],
        questions = [],
        answers = [],
        upvotesCount = 0,
        helpfulAnswers = 0,
        lastActive,
        createdAt,
    } = user;

    const stats = [
        { label: "Questions", value: questions?.length, icon: FileText, color: "text-blue-600 dark:text-blue-400", link: "/user/questions" },
        { label: "Answers", value: answers?.length, icon: MessageSquare, color: "text-green-600 dark:text-green-400", link: "/user/answers" },
        { label: "Upvotes", value: upvotesCount, icon: ThumbsUp, color: "text-orange-600 dark:text-orange-400", link: "/user/upvotes" },
        { label: "Helpful", value: helpfulAnswers, icon: Award, color: "text-purple-600 dark:text-purple-400", link: "/user/helpful" },
        { label: "Followers", value: followers?.length, icon: Users, color: "text-cyan-600 dark:text-cyan-400", link: "/user/followers" },
        { label: "Following", value: following?.length, icon: UserCheck, color: "text-pink-600 dark:text-pink-400", link: "/user/following" },
    ];

    const recentActivity = [
        {
            type: "Answered",
            description: "Answered a question in 'React Hooks'",
            date: new Date(Date.now() - 3600000), // 1 hour ago
            link: "/answer/123",
        },
        {
            type: "Question Asked",
            description: "Asked: 'How to optimize a MongoDB query in Node.js?'",
            date: new Date(Date.now() - 172800000), // 2 days ago
            link: "/question/456",
        },
        {
            type: "New Follower",
            description: "Started following you.",
            date: new Date(Date.now() - 604800000), // 7 days ago
            link: "/user/new-follower-id",
        },
        {
            type: "Upvoted",
            description: "Upvoted an answer about 'Tailwind CSS'",
            date: new Date(Date.now() - 1209600000), // 14 days ago
            link: "/answer/789",
        },
    ];

    const ChipList = ({ items = [] }) => {
        if (!items.length)
            return <span className="text-gray-500 dark:text-gray-400">None</span>;

        return (
            <div className="flex flex-wrap gap-2">
                {items.map((i, idx) => (
                    <span
                        key={idx * 0.2548}
                        // Use different color for credentials as requested
                        className="px-3 py-1 text-sm rounded-lg bg-orange-100 dark:bg-[#2a2a2a] text-orange-700 dark:text-[#07C5B9]"
                    >
                        {i}
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-4 mt-4 md:mt-0">
            {/* Header */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#191919]">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Sparkles className="text-orange-500 dark:text-[#07C5B9]" size={18} />
                        Welcome, {profile.firstName || "User"}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Profile overview & activity
                    </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock size={16} />
                    {timeAgo(lastActive || createdAt)}
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-2">
                {stats.map((s, i) => (
                    <a
                        key={i * 0.12478}
                        href={s?.link}
                        className="p-3 rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#191919] hover:border-orange-300 dark:hover:border-[#07C5B9] transition block"
                    >
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <s.icon size={18} className={s.color} /> {/* Increased icon size */}
                            <span className="truncate w-full">
                                {s.label}
                            </span>
                        </div>
                        <div className="text-xl font-bold mt-1 text-gray-900 dark:text-white">
                            {s.value}
                        </div>
                    </a>
                ))}
            </div>

            {/* Main */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left */}
                <div className="lg:col-span-2 space-y-4">
                    {/* About */}
                    <section className="rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#191919]">
                        <header className="p-4 border-b border-gray-200 dark:border-[#2a2a2a] flex items-center gap-2">
                            <BookOpen size={18} className="text-orange-500 dark:text-[#07C5B9]" />
                            <h3 className="font-semibold">About</h3>
                        </header>

                        <div className="p-4 space-y-4 text-sm">
                            <p className="text-gray-700 dark:text-gray-300">
                                {profile.bio || "No bio added yet."}
                            </p>

                            {/* REFACTORED: InfoRow 1 (Location) */}
                            <div className="flex items-start gap-3">
                                <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
                                <div>
                                    <div className="font-medium">Location</div>
                                    <div className="text-gray-600 dark:text-gray-400">{profile.location || "Not specified"}</div>
                                </div>
                            </div>

                            {profile.website && (
                                <div className="flex items-start gap-3">
                                    <Globe size={16} className="text-gray-500 dark:text-gray-400" />
                                    <div>
                                        <div className="font-medium">Website</div>
                                        <div className="text-gray-600 dark:text-gray-400">
                                            <a
                                                href={profile.website}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-1 text-orange-500 dark:text-[#07C5B9] hover:underline"
                                            >
                                                {profile.website.replace(/^https?:\/\//, "")}
                                                <ExternalLink size={14} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start gap-3">
                                <Calendar size={16} className="text-gray-500 dark:text-gray-400" />
                                <div>
                                    <div className="font-medium">Member Since</div>
                                    <div className="text-gray-600 dark:text-gray-400">{formatDate(createdAt)}</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Briefcase size={16} className="text-gray-500 dark:text-gray-400" />
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium mb-1">Credentials</div>
                                    <ChipList items={credentials} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {
                        isOwnProfile && (<section className="rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#191919]">
                            <header className="p-4 border-b border-gray-200 dark:border-[#2a2a2a] flex items-center gap-2">
                                <Activity size={18} className="text-orange-500 dark:text-[#07C5B9]" />
                                <h3 className="font-semibold">Recent Activity</h3>
                            </header>

                            <div className="p-4 space-y-3">
                                {recentActivity.length > 0 ? (
                                    <div className="space-y-3">
                                        {recentActivity.map((activity, index) => (
                                            <a
                                                key={index * 0.25478}
                                                href={activity.link}
                                                className="group flex items-center gap-3 py-2 sm:px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#262626] transition"
                                            >
                                                <div className="flex-1 min-w-0">
                                                    <p
                                                        className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-orange-500 dark:group-hover:text-[#07C5B9] transition"
                                                    >
                                                        {activity.description}
                                                    </p>

                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {activity.type} • {timeAgo(activity.date)}
                                                    </p>
                                                </div>

                                                <CornerUpRight
                                                    size={16}
                                                    className="text-gray-400 dark:text-gray-500 group-hover:text-orange-500 dark:group-hover:text-[#07C5B9] flex-shrink-0 transition"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        No recent activity found.
                                    </p>
                                )}
                            </div>
                        </section>)
                    }
                </div>

                <div className="space-y-4">
                    <div className="rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#191919]">
                        <div className="p-4 border-b border-gray-200 dark:border-[#2a2a2a] flex items-center gap-2">
                            <Target size={18} className="text-orange-500 dark:text-[#07C5B9]" />
                            <h3 className="font-semibold">Expertise</h3>
                        </div>
                        <div className="p-4">
                            {knowsAbout?.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {knowsAbout.map((i, idx) => (
                                        <span
                                            key={idx * 0.2548}
                                            className="px-3 py-1 text-sm rounded-lg bg-gray-100 dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300"
                                        >
                                            {i}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <span className="text-gray-500 dark:text-gray-400 w-full flex justify-center">None</span>
                            )}
                        </div>
                    </div>

                    {/* REFACTORED: Card 2 (Topics of Interest) */}
                    <div className="rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#191919]">
                        <div className="p-4 border-b border-gray-200 dark:border-[#2a2a2a] flex items-center gap-2">
                            <Heart size={18} className="text-orange-500 dark:text-[#07C5B9]" />
                            <h3 className="font-semibold">Topics of Interest</h3>
                        </div>
                        <div className="p-4">
                            {topicsOfInterest?.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {topicsOfInterest.map((i, idx) => (
                                        <span
                                            key={idx * 0.2458}
                                            className="px-3 py-1 text-sm rounded-lg bg-gray-100 dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300"
                                        >
                                            {i}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <span className="text-gray-500 dark:text-gray-400 w-full flex justify-center">None</span>
                            )}
                        </div>
                    </div>

                    {/* REFACTORED: Card 3 (AI Insights) */}
                    <div className="rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#191919]">
                        <div className="p-4 border-b border-gray-200 dark:border-[#2a2a2a] flex items-center gap-2">
                            <Zap size={18} className="text-orange-500 dark:text-[#07C5B9]" />
                            <h3 className="font-semibold">AI Insights</h3>
                        </div>
                        <div className="p-3 space-y-3">
                            {/* REFACTORED: Insight 1 (Answer Quality) */}
                            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-100 dark:bg-[#212121]">
                                <div className="flex items-center gap-2">
                                    <BarChart3 size={16} className="text-orange-500 dark:text-[#07C5B9]" />
                                    <span className="text-sm">Answer Quality</span>
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-white">92%</span>
                            </div>

                            {/* REFACTORED: Insight 2 (Engagement) */}
                            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-100 dark:bg-[#212121]">
                                <div className="flex items-center gap-2">
                                    <TrendingUp size={16} className="text-orange-500 dark:text-[#07C5B9]" />
                                    <span className="text-sm">Engagement</span>
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-white">78%</span>
                            </div>

                            {/* REFACTORED: Insight 3 (Helpfulness) */}
                            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-100 dark:bg-[#212121]">
                                <div className="flex items-center gap-2">
                                    <Star size={16} className="text-orange-500 dark:text-[#07C5B9]" />
                                    <span className="text-sm">Helpfulness</span>
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-white">4.8/5</span>
                            </div>
                        </div>
                    </div>

                    <QuickActions />
                </div>
            </div>
        </div>
    );
}

UserOverview.propTypes = {
    user: PropTypes.object.isRequired,
};