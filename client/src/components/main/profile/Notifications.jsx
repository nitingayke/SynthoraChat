import {
    Bell,
    MessageCircle,
    UserPlus,
    Bookmark,
    Brain,
    Eye,
    Clock,
    ChevronDown
} from "lucide-react";
import PropTypes from "prop-types";
import { timeAgo } from "../../../utils/date";
import { useMemo, useState } from "react";

const PAGE_SIZE = 10;

export default function Notifications({ notifications = [] }) {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const orderedNotifications = useMemo(
        () => [...notifications].reverse(),
        [notifications]
    );

    if (notifications?.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
                <Bell size={48} className="mb-4 opacity-50" />
                <p className="text-lg font-medium">No notifications yet</p>
                <p className="text-sm">You're all caught up</p>
            </div>
        );
    }

    const getIcon = (title = "") => {
        const text = title.toLowerCase();

        if (text?.includes("answer")) return <MessageCircle size={18} />;
        if (text?.includes("follower")) return <UserPlus size={18} />;
        if (text?.includes("saved")) return <Bookmark size={18} />;
        if (text?.includes("ai")) return <Brain size={18} />;
        if (text?.includes("view")) return <Eye size={18} />;

        return <Bell size={18} />;
    };

    const visibleNotifications = orderedNotifications.slice(0, visibleCount);
    const hasMore = visibleCount < orderedNotifications.length;

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + PAGE_SIZE);
    };

    return (
        <div className="space-y-5">
            <div className="mt-6 my-4 md:mb-5 md:mt-0">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Notifications
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {visibleNotifications.length} of {orderedNotifications.length} notifications
                </p>
            </div>

            <div className="space-y-3">
                {visibleNotifications?.map((notification) => (
                    <div
                        key={notification?._id || notification?.date}
                        className="flex gap-4 p-4 rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#191919] hover:bg-gray-50 dark:hover:bg-[#1f1f1f] transition"
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 dark:bg-[#07C5B9]/20 text-orange-600 dark:text-[#07C5B9] flex-shrink-0">
                            {getIcon(notification?.title)}
                        </div>

                        <div className="flex-1 space-y-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white truncate">
                                {notification?.title || "Notification"}
                            </p>

                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                {notification?.description || ""}
                            </p>

                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                                <Clock size={12} />
                                {timeAgo(notification?.date)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center pt-4">
                    <button
                        onClick={handleLoadMore}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#191919] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] text-gray-700 dark:text-gray-300 font-medium transition-all duration-30 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <ChevronDown size={18} />
                        Load More
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                            (+{Math.min(PAGE_SIZE, orderedNotifications?.length - visibleCount)} more)
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
}

Notifications.propTypes = {
    notifications: PropTypes.array
};