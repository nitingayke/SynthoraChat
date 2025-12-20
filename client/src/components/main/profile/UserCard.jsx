import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
    Users,
    UserMinus,
    MessageCircle,
    MapPin,
    Briefcase,
    Calendar,
    Check,
    UserPlus,
    Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { timeAgo } from "../../../utils/date";
import AuthContext from "../../../context/AuthContext";

export default function UserCard({ user, isOwnProfile }) {

    const { loginUser } = useContext(AuthContext);

    const fullName = `${user?.profile?.firstName ?? ""} ${user?.profile?.lastName ?? ""}`;

    const isSelf = loginUser?._id === user?._id;

    const isFollowing = loginUser?.following?.some(
        (f) => f?.user?._id === user?._id
    );

    const handleFollow = () => {
        console.log("FOLLOW:", user?._id);
    };

    const handleUnfollow = () => {
        console.log("UNFOLLOW:", user?._id);
    };

    const renderActionButton = () => {
        if (isSelf) return null;

        if (isOwnProfile) {
            return (
                <button
                    onClick={handleUnfollow}
                    className="px-2 sm:px-3 py-2 text-sm rounded-lg bg-red-500/10 text-red-500 border hover:opacity-80 flex items-center gap-1 cursor-pointer"
                >
                    <UserMinus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:flex">Remove</span>
                </button>
            );
        }

        if (isFollowing) {
            return (
                <button
                    onClick={handleUnfollow}
                    className="px-2 sm:px-3 py-2 text-sm rounded-lg bg-red-500/10 text-red-500 border hover:opacity-80 flex items-center gap-1 cursor-pointer"
                >
                    <UserMinus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:flex">Unfollow</span>
                </button>
            );
        }

        return (
            <button
                onClick={handleFollow}
                className="p-2 sm:px-3 py-2 text-sm rounded-lg bg-gray-100 dark:bg-[#2a2a2a] border border-gray-300 dark:border-[#434343] hover:opacity-80 flex items-center gap-1 cursor-pointer"
            >
                <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:flex">Follow</span>
            </button>
        );
    };

    return (
        <div className="bg-white dark:bg-[#191919] rounded-lg border border-gray-200 dark:border-[#2a2a2a] p-3 sm:p-4 hover:shadow-lg transition space-y-2" >
            <div className="flex items-center gap-3">
                <Link to={`/main/u/profile/${user?.username}`}>
                    <Avatar
                        src={user?.profile?.profilePicture}
                        alt={fullName}
                    />
                </Link>

                <div>
                    <div className="flex items-center gap-2">
                        <Link to={`/main/u/profile/${user?.username}`} className="font-semibold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-[#07C5B9]">
                            {fullName}
                        </Link>
                        {!user?.isVerified && (
                            <span title="Verified User"><Check className="w-4 h-4 text-blue-500 dark:text-[#07C5B9]" /></span>
                        )}
                    </div>

                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-1">
                        {user?.profile?.bio}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {user?.credentials?.[0]}
                </span>
                <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {user?.profile?.location}
                </span>
                <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Joined {new Date(user?.createdAt).getFullYear()}
                </span>
            </div>

            <div className="flex flex-wrap gap-2 mpb-2">
                {user?.topicsOfInterest?.slice(0, 4)?.map((topic, i) => (
                    <span
                        key={i * 0.2145}
                        className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-[#07C5B9]/20 text-blue-700 dark:text-[#07C5B9]"
                    >
                        {topic}
                    </span>
                ))}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-200/70 dark:border-[#2a2a2a]">
                <div className="text-xs text-gray-500 flex gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-gray-100 dark:bg-[#2a2a2a]">
                        <Users size={12} />
                        {user?.followers?.length}
                        <span className="hidden sm:flex">followers</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-gray-100 dark:bg-[#2a2a2a]">
                        <UserPlus size={12} />
                        {user?.following?.length}
                        <span className="hidden sm:flex">following</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-gray-100 dark:bg-[#2a2a2a]">
                        <Star size={12} />
                        <span className="hidden sm:flex md:hidden lg:flex ">Last active:</span>
                        {timeAgo(user?.lastActive)}
                    </div>
                </div>

                <div className="flex gap-2">
                    <Link
                        to={`/main/u/profile/${user?.username}/message`}
                        className="px-2.5 sm:px-3 py-2 text-sm rounded-lg bg-orange-500 dark:bg-[#07C5B9] text-white hover:opacity-80 flex items-center gap-1"
                    >
                        <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden sm:flex">Message</span>
                    </Link>

                    {renderActionButton()}
                </div>
            </div>
        </div>
    );
}

UserCard.propTypes = {
    user: PropTypes.object.isRequired,
    isOwnProfile: PropTypes.bool.isRequired,
};
