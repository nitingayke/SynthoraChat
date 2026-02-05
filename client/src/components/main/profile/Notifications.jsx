import {
    Bell,
    MessageCircle,
    UserPlus,
    Bookmark,
    Brain,
    Eye,
    Clock,
    ChevronDown,
    ChevronRight
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { timeAgo } from "../../../utils/date";
import { markAllNotificationReadService } from "../../../services/user.service";
import AuthContext from "../../../context/AuthContext";

const PAGE_SIZE = 10;

export default function Notifications() {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { loginUser, setLoginUser } = useContext(AuthContext);

    const [notificationList, setNotificationList] = useState([]);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setNotificationList([...loginUser?.notifications || []].reverse());
    }, [loginUser?.notifications]);


    const handleMarkAllRead = async () => {
        try {
            setLoading(true);

            const now = new Date().toISOString();

            await markAllNotificationReadService();

            setLoginUser(prev => ({
                ...prev,
                lastNotificationReadAt: now
            }));

            enqueueSnackbar("All notifications marked as read", {
                variant: "success",
            });
        } catch (error) {
            enqueueSnackbar(
                error?.response?.data?.message || "Failed to mark notifications",
                { variant: "error" }
            );
        } finally {
            setLoading(false);
        }
    }

    const lastReadAt = loginUser?.lastNotificationReadAt
        ? new Date(loginUser.lastNotificationReadAt)
        : null;


    if (notificationList?.length === 0) {
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

    const visibleNotifications = notificationList.slice(0, visibleCount);
    const hasMore = visibleCount < notificationList.length;

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + PAGE_SIZE);
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between mt-6 my-4 md:mb-5 md:mt-0">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Notifications
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        Showing {visibleNotifications.length} of {notificationList.length} <span className="hidden sm:flex ps-1">notifications</span>
                    </p>
                </div>

                <button
                    disabled={loading}
                    onClick={handleMarkAllRead}
                    className="text-sm font-medium border p-2 rounded-lg text-orange-500 dark:text-[#07C5B9] bg-orange-500/10 dark:bg-[#07C5B9]/10 hover:opacity-80 disabled:opacity-50"
                >
                    Mark all as read
                </button>
            </div>

            <div className="space-y-3">
                {visibleNotifications?.map((notification) => {

                    const isRead = lastReadAt
                        ? new Date(notification.date) <= lastReadAt
                        : false;

                    return (
                        <div
                            key={notification?._id || notification?.date}
                            onClick={() => notification?.link && navigate(notification?.link)}
                            className={`agroup flex gap-4 p-4 rounded-lg w-full border transition ${notification?.link && "cursor-pointer"} ${isRead ? "border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#191919] hover:bg-gray-50 dark:hover:bg-[#1f1f1f]" : "bg-blue-500/10 border-blue-500/50"}`}
                        >
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 dark:bg-[#07C5B9]/20 text-orange-600 dark:text-[#07C5B9] flex-shrink-0">
                                {getIcon(notification?.title)}
                            </div>

                            <div className="flex-1 space-y-1">
                                <p className="font-medium text-gray-900 dark:text-white truncate mb-0">
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

                            {notification?.link && (
                                <div className="flex items-center justify-center ml-2 text-gray-400 group-hover:text-orange-500 group-hover:dark:text-[#07C5B9]">
                                    <ChevronRight size={18} />
                                </div>
                            )}

                        </div>
                    )
                })}
            </div>

            {hasMore && (
                <div className="flex justify-center pt-4">
                    <button
                        onClick={handleLoadMore}
                        className="flex items-center gap-1 px-5 py-2.5 rounded-lg border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#191919] text-gray-700 dark:text-gray-300 font-medium transition-all duration-30 hover:opacity-80"
                    >
                        <ChevronDown size={18} />
                        Load More
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            (+{Math.min(PAGE_SIZE, notificationList?.length - visibleCount)} more)
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
}