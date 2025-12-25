import { useState } from "react";
import { Camera, Edit3, Link2, MapPin, Share2, Loader2 } from "lucide-react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";

export default function ProfileHeader({ user, isOwnProfile = false }) {

    const { enqueueSnackbar } = useSnackbar();
    const [sharing, setSharing] = useState(false);

    const handleShareProfile = async () => {

        const profileUrl = `${window.location.origin}/main/u/profile/${username}`;

        try {
            setSharing(true);

            if (navigator.share) {
                await navigator.share({
                    title: `${firstName || username}'s Profile`,
                    text: `Check out ${firstName || username}'s profile`,
                    url: profileUrl,
                });
            } else {
                await navigator.clipboard.writeText(profileUrl);
                enqueueSnackbar("Profile link copied to clipboard", { variant: "error" }); // later replace with notistack
            }
        } catch {
            enqueueSnackbar("Share failed", { variant: "error" });
        } finally {
            setSharing(false);
        }
    }

    if (!user) {
        return null;
    }

    const {
        username,
        profile = {},
        email,
    } = user;

    const {
        firstName,
        lastName,
        bio,
        location,
        website,
        profilePicture,
        coverPicture,
    } = profile;

    return (
        <div className="bg-white dark:bg-[#191919] rounded-lg overflow-hidden border border-gray-200 dark:border-[#2a2a2a]">

            <div className="relative h-48 w-full">
                {coverPicture ? (
                    <img
                        src={coverPicture}
                        alt="cover"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-[#303030] p-4">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Satisfy',cursive] line-clamp-2 opacity-30">{`${firstName} ${lastName}`?.slice(0, 23)?.toUpperCase()}</h1>
                    </div>
                )}

                {/* Username top-right */}
                <div className="absolute top-2 right-2 bg-white/50 dark:bg-[#1f1f1f]/50 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200">
                    @{username}
                </div>
            </div>

            <div className="relative px-4 pb-6">

                {/* Avatar */}
                <div className="absolute -top-16 lg:-top-18 left-3">
                    <div className="relative w-32 h-32 lg:w-35 lg:h-35 rounded-full border-4 border-white dark:border-[#161616] overflow-hidden bg-white dark:bg-[#222] shadow-lg">
                        {profilePicture ? (
                            <img
                                src={profilePicture}
                                alt="profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Avatar className="!w-full !h-full !text-4xl dark:!bg-[#272727]">
                                {firstName?.[0] || "U"}
                            </Avatar>
                        )}
                    </div>

                    {/* Camera icon */}
                    {isOwnProfile && <Link to={`/main/u/profile/${username}?tab=settings`} className="absolute bottom-1 right-1 p-2 rounded-full bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#333] shadow hover:scale-105 transition">
                        <Camera size={16} />
                    </Link>}
                </div>

                {/* Right action buttons */}
                <div className="flex justify-end gap-3 pt-4">
                    {isOwnProfile && <Link
                        to={`/main/u/profile/${user?.username}?tab=settings#profile_settings`}
                        className="flex items-center gap-2 px-3 p-2 w-10 h-10 sm:w-auto sm:h-auto rounded-full sm:rounded-lg bg-orange-500 dark:bg-[#07C5B9] text-white font-semibold hover:opacity-90 transition"
                    >
                        <Edit3 size={16} />
                        <span className="hidden sm:flex">Edit Profile</span>
                    </Link>}
                    <button
                        onClick={handleShareProfile}
                        disabled={sharing}
                        className="border border-gray-200 dark:border-[#3d3d3d] w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#202020] hover:opacity-80 disabled:cursor-not-allowed">
                        {sharing ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <Share2 size={18} />
                        )}
                    </button>
                </div>


                <div className="mt-5 w-full">

                    {/* Name */}
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {firstName || lastName
                            ? `${firstName ?? ""} ${lastName ?? ""}`
                            : username}
                    </h1>

                    {/* Email */}
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {email}
                    </p>

                    {/* Bio */}
                    {bio && (
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {bio}
                        </p>
                    )}

                    {location && (
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <MapPin size={16} />
                            <span>{location}</span>
                        </div>
                    )}

                    {website && (
                        <a
                            href={website}
                            target="_blank"
                            rel="noreferrer"
                            className="w-fit flex items-center gap-2 text-orange-600 dark:text-[#07C5B9] hover:underline"
                        >
                            <Link2 size={16} />
                            {website.replace(/^https?:\/\//, "")}
                        </a>
                    )}

                </div>
            </div>
        </div>
    );
}

ProfileHeader.propTypes = {
    user: PropTypes.object.isRequired,
    isOwnProfile: PropTypes.bool.isRequired
};
