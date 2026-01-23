import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
    Users,
    MessageCircle,
    MapPin,
    Briefcase,
    Calendar,
    UserPlus,
    Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { timeAgo } from "../../../utils/date";
import AuthContext from "../../../context/AuthContext";
import { formatCount } from "../../../utils/formatCount";
import FollowActionButton from "../common/FollowActionButton";

export default function UserCard({ user, mode, followedAt }) {

    const { loginUser } = useContext(AuthContext);

    const isSelf = loginUser?._id === user?._id;
    const fullName = `${user?.profile?.firstName ?? ""} ${user?.profile?.lastName ?? ""}`;

    const renderAction = () => {
        if (isSelf) return null;

        if (mode === "followers") {
            return (
                <Link
                    to={`/main/u/profile/${user?.username}/message`}
                    className="px-3 py-2 text-sm rounded-lg bg-orange-500 dark:bg-[#07C5B9] text-white hover:opacity-80 flex items-center gap-1"
                >
                    <MessageCircle size={16} />
                    Message
                </Link>
            );
        }

        if (mode === "following") {
            return <FollowActionButton targetUserId={user?._id} size="md" />
        }

        return null;
    };

    return (
        <div className="bg-white dark:bg-[#191919] rounded-lg border border-gray-200 dark:border-[#272727] p-4 space-y-2">
            <div className="flex items-center gap-3">
                <Link to={`/main/u/profile/${user?.username}`}>
                    <Avatar src={user?.profile?.profilePicture} />
                </Link>

                <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 w-full">
                        <Link
                            to={`/main/u/profile/${user?.username}`}
                            className="font-semibold hover:text-orange-500 dark:hover:text-[#07C5B9]"
                        >
                            {fullName}
                        </Link>
                        <p className="text-sm text-gray-400">
                            {timeAgo(followedAt)}
                        </p>
                    </div>

                    <p className="text-sm text-gray-500 line-clamp-1">
                        {user?.profile?.bio || "---"}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                {(user?.credentials?.length) > 0 && <span className="flex items-center gap-1">
                    <Briefcase size={12} />
                    {user?.credentials?.[0]}
                </span>}
                {(user?.profile?.location) && <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {user?.profile?.location}
                </span>}
                <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    Joined {new Date(user?.createdAt).getFullYear()}
                </span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-[#272727]">
                <div className="text-xs text-gray-500 flex gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-gray-100 dark:bg-[#2a2a2a]">
                        <Users size={12} />
                        {formatCount(user?.followers?.length || 0)}
                        <span className="hidden sm:flex">followers</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-gray-100 dark:bg-[#2a2a2a]">
                        <UserPlus size={12} />
                        {formatCount(user?.following?.length || 0)}
                        <span className="hidden sm:flex">following</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-gray-100 dark:bg-[#2a2a2a]">
                        <Star size={12} />
                        <span className="hidden sm:flex md:hidden lg:flex ">Last active:</span>
                        {timeAgo(user?.lastActive)}
                    </div>
                </div>

                {renderAction()}
            </div>
        </div>
    );
}

UserCard.propTypes = {
    user: PropTypes.object.isRequired,
    mode: PropTypes.oneOf(["followers", "following"]).isRequired,
};
