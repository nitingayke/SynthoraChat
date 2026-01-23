import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Loader2, UserPlus, UserMinus } from "lucide-react";
import { useSnackbar } from "notistack";

import AuthContext from "../../../context/AuthContext";
import UIStateContext from "../../../context/UIStateContext";
import { followUser, unfollowUser } from "../../../services/user.service";

export default function FollowActionButton({
    targetUserId,
    size = "sm",
    onChange,
}) {
    const { enqueueSnackbar } = useSnackbar();
    const { loginUser, setLoginUser } = useContext(AuthContext);
    const { isAuthorize } = useContext(UIStateContext);

    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);

    const isOwner = loginUser?._id === targetUserId;

    useEffect(() => {
        if (!loginUser || !targetUserId) return;

        const followed = loginUser.following?.some(
            f => String(f.user?._id || f.user) === String(targetUserId)
        );

        setIsFollowing(followed);
    }, [loginUser, targetUserId]);

    if (!targetUserId || isOwner) return null;

    const handleToggle = async () => {
        if (!isAuthorize() || loading) return;

        try {
            setLoading(true);

            if (isFollowing) {
                const res = await unfollowUser(targetUserId);

                setLoginUser(prev => ({
                    ...prev,
                    following: prev.following.filter(
                        f => String(f.user?._id || f.user) !== String(targetUserId)
                    ),
                }));

                setIsFollowing(false);
                enqueueSnackbar(res.message, { variant: "success" });
                onChange?.(false);

            } else {
                const res = await followUser(targetUserId);

                setLoginUser(prev => ({
                    ...prev,
                    following: [
                        ...prev.following,
                        { user: targetUserId, followedAt: new Date() },
                    ],
                }));

                setIsFollowing(true);
                enqueueSnackbar(res.message, { variant: "success" });
                onChange?.(true);
            }
        } catch {
            enqueueSnackbar("Action failed. Try again.", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    const sizeConfig = {
        xs: {
            btn: "px-2 py-1 text-[10px]",
            icon: 12,
            gap: "gap-0.5",
        },
        sm: {
            btn: "px-3 py-1.5 text-xs",
            icon: 14,
            gap: "gap-1",
        },
        md: {
            btn: "px-4 py-2 text-sm",
            icon: 16,
            gap: "gap-1.5",
        },
    };

    const { btn, icon, gap } = sizeConfig[size];

    const unfollowStyle = `bg-red-500/10 text-red-500 ${size !== "xs" && "border"} border-red-500/40`;

    const followStyle = size === "xs"
        ? "bg-orange-500/10 text-orange-500 dark:bg-[#07C5B9]/20 dark:text-[#07C5B9]"
        : "bg-orange-500 dark:bg-[#07C5B9]";

    const style = isFollowing
        ? unfollowStyle
        : `${followStyle}`;

    const renderIcon = () => {
        if (loading) return <Loader2 size={icon} className="animate-spin" />;
        if (isFollowing) return <UserMinus size={icon} />;
        return <UserPlus size={icon} />;
    };

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={`flex items-center rounded-lg font-medium transition disabled:opacity-60 hover:opacity-80 ${gap} ${btn} ${style}`}
        >
            {renderIcon()}
            <span>{isFollowing ? "Unfollow" : "Follow"}</span>
        </button>
    );
}

FollowActionButton.propTypes = {
    targetUserId: PropTypes.string.isRequired,
    size: PropTypes.oneOf(["xs", "sm", "md"]),
    onChange: PropTypes.func,
};
