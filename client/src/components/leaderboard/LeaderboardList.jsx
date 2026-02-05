import Avatar from "@mui/material/Avatar";
import {
    ArrowBigUp,
    CheckCircle,
    HelpCircle,
    BarChart3,
    Users,
    UserPlus,
} from "lucide-react";

export default function LeaderboardList({ users, startRank }) {
    return (
        <section className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold mb-8 dark:text-white">
                Other Top Contributors
            </h2>

            <div className="space-y-6">
                {users.map((user, i) => (
                    <div
                        key={user._id}
                        className="bg-white dark:bg-[#191919] border border-gray-200 dark:border-[#2a2a2a] rounded-2xl p-6 flex flex-col md:flex-row gap-6"
                    >
                        {/* LEFT */}
                        <div className="flex items-center gap-4 min-w-[220px]">
                            <Avatar src={user?.profile?.profilePicture} alt={user?.username} className="!h-12 !w-12" />
                            <div>
                                <p className="font-semibold dark:text-white">
                                    @{user.username}
                                </p>
                                <div className="flex gap-3 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Users size={14} /> {user.followers.length}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <UserPlus size={14} /> {user.following.length}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* STATS */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
                            <Stat icon={ArrowBigUp} label="Upvotes" value={user.upvotesCount} />
                            <Stat icon={CheckCircle} label="Helpful" value={user.helpfulAnswers} />
                            <Stat icon={HelpCircle} label="Questions" value={user.questionsCount} />
                            <Stat icon={BarChart3} label="Answers" value={user.answersCount} />
                        </div>

                        {/* RANK */}
                        <div className="text-right min-w-[120px]">
                            <div className="text-xl font-bold text-orange-500 dark:text-[#07C5B9]">
                                #{startRank + i}
                            </div>
                            <div className="mt-2">
                                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded">
                                    <div
                                        className="h-full bg-orange-500 dark:bg-[#07C5B9]"
                                        style={{ width: `${user.accuracy}%` }}
                                    />
                                </div>
                                <p className="text-xs mt-1 text-gray-500">
                                    {user.accuracy}% accuracy
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Stat({ icon: Icon, label, value }) {
    return (
        <div className="flex gap-2 items-center">
            <Icon size={16} className="text-orange-500 dark:text-[#07C5B9]" />
            <div>
                <p className="font-semibold dark:text-white">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
            </div>
        </div>
    );
}
