import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import {
    User,
    Activity,
    HelpCircle,
    MessageSquare,
    Bookmark,
    Bell,
    Users,
    UserPlus,
    Settings,
} from "lucide-react";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";

export default function ProfileItems({ user }) {

    const [searchParams, setSearchParams] = useSearchParams();
    const { loginUser } = useContext(AuthContext);

    const activeTab = searchParams.get("tab") || "overview";

    const isOwnProfile = loginUser?.username === user?.username;

    const setTab = (tab) => {
        setSearchParams({ tab });
    };

    const items = [
        { key: "overview", label: "Overview", icon: User },

        {
            key: "activity",
            label: "Activity",
            icon: Activity,
            count: (user?.upvotesCount || 0) + (user?.helpfulAnswers || 0),
        },

        {
            key: "questions",
            label: "Questions",
            icon: HelpCircle,
            count: user?.questions?.length,
        },

        {
            key: "answers",
            label: "Answers",
            icon: MessageSquare,
            count: user?.answers?.length,
        },

        {
            key: "saved-questions",
            label: "Saved Questions",
            icon: Bookmark,
            count: user?.savedQuestions?.length,
            onlyOwner: true,
        },
        {
            key: "notifications",
            label: "Notifications",
            icon: Bell,
            count: user?.notifications?.length,
            onlyOwner: true,
        },
        {
            key: "followers",
            label: "Followers",
            icon: Users,
            count: user?.followers?.length,
        },
        {
            key: "following",
            label: "Following",
            icon: UserPlus,
            count: user?.following?.length,
        },
        {
            key: "settings",
            label: "Settings",
            icon: Settings,
            onlyOwner: true,
        },
    ];


    return (
        <div className="flex md:block md:sticky top-18 w-full md:w-70 min-w-[260px] bg-white dark:bg-[#191919] border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-2 md:p-3 h-fit overflow-x-auto md:overflow-hidden scrollbar-hide space-x-3">
            {items.filter(item => !item.onlyOwner || isOwnProfile)
                .map((item) => {
                    const isActive = activeTab === item.key;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.key}
                            onClick={() => setTab(item.key)}
                            className={`w-full flex items-center justify-between px-3 py-2 gap-2 rounded-md text-sm font-medium transition mb-0 md:mb-1.5
              ${isActive
                                    ? "bg-orange-500/10 text-orange-600 dark:bg-[#07C5B9]/10 dark:text-[#07C5B9]"
                                    : "text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#202020] md:bg-white dark:md:bg-[#191919] hover:bg-gray-200 dark:hover:bg-[#262626]"
                                }`}
                        >
                            {/* Left: Icon + Label */}
                            <div className="flex items-center gap-2 md:gap-3 whitespace-nowrap">
                                <Icon size={18} className="shrink-0" />
                                <span>{item.label}</span>
                            </div>

                            {/* Right: Count */}
                            {item.count > 0 && (
                                <span
                                    className={`text-xs px-2 py-0.5 rounded-full
                  ${isActive
                                            ? "bg-orange-500/20 text-orange-600 dark:bg-[#07C5B9]/20 dark:text-[#07C5B9]"
                                            : "bg-gray-200 dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-400"
                                        }`}
                                >
                                    {item.count}
                                </span>
                            )}
                        </button>
                    );
                })}
        </div>
    );
}

ProfileItems.propTypes = {
    user: PropTypes.object.isRequired,
};
