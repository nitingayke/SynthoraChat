import LoginRequired from "../../components/common/LoginRequired";
import ProfileHeader from "../../components/main/profile/ProfileHeader";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ProfileItems from "../../components/main/profile/ProfileItems";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { fetchUserProfile } from "../../services/user.service.js"

import UserOverview from "../../components/main/profile/UserOverview";
import UserActivity from "../../components/main/profile/UserActivity"
import UserQuestions from "../../components/main/profile/UserQuestions";
import UserAnswers from "../../components/main/profile/UserAnswers";
import SavedQuestions from "../../components/main/profile/SavedQuestions";
import Notifications from "../../components/main/profile/Notifications";
import ProfileSettings from "../../components/main/profile/ProfileSettings";
import UserFollowers from "../../components/main/profile/UserFollowers";
import UserFollowing from "../../components/main/profile/UserFollowing";

export default function ProfilePage() {

    const [searchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || "overview";

    const { username } = useParams();
    const { loginUser } = useContext(AuthContext);

    const [profileUser, setProfileUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                setLoading(true);
                const res = await fetchUserProfile(username);
                setProfileUser(res?.data?.user);
            } catch {
                setProfileUser(null);
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, [username]);

    const isOwnProfile = loginUser && profileUser && loginUser?._id === profileUser?._id;

    if (loading) {
        return (
            <div className="w-full max-w-5xl mx-auto flex py-10 justify-center items-center h-full">
                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-300">
                    <div className="animate-spin rounded-full border-4 w-8 h-8 border-x-0"></div>
                    <p className="font-medium">
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    if (!profileUser) {
        return (
            <div className="flex flex-col items-center py-20">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    User not found
                </h2>
                <p className="text-gray-500 mt-2 text-center">
                    The profile you're looking for doesn't exist.
                </p>
            </div>
        )
    }

    if ((["saved-questions", "notifications", "settings"].includes(activeTab)) && !isOwnProfile) {
        return loginUser?.username ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Access Restricted</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md">You can't access this section on another user's profile.</p>
                <Link
                    to={`/main/u/profile/${loginUser?.username}?tab=${activeTab}`}
                    className="mt-6 px-6 py-2 rounded-lg font-medium bg-orange-500 hover:bg-orange-600 dark:bg-[#07C5B9] dark:hover:bg-[#06b1a7] text-white transition"
                >
                    Go to your profile
                </Link>
            </div>
        ) : <LoginRequired />;
    }

    const profileTabContent = () => {
        switch (activeTab) {
            case "overview":
                return <UserOverview user={profileUser} />;

            case "activity":
                return <UserActivity user={profileUser} />

            case "questions":
                return <UserQuestions userQuestions={profileUser?.questions || []} isOwnProfile={isOwnProfile} />

            case "answers":
                return <UserAnswers userAnswers={profileUser?.answers || []} isOwnProfile={isOwnProfile} />;

            case "saved-questions":
                return <SavedQuestions savedQuestions={profileUser?.savedQuestions || []} isOwnProfile={isOwnProfile} />;

            case "notifications":
                return <Notifications notifications={profileUser?.notifications || []} />;

            case "followers":
                return <UserFollowers followers={profileUser?.followers || []} isOwnProfile={isOwnProfile} />;

            case "following":
                return <UserFollowing following={profileUser?.following || []} isOwnProfile={isOwnProfile} />;

            case "settings":
                return <ProfileSettings user={profileUser} />;

            default:
                return <UserOverview user={profileUser} />;
        }

    }

    return (
        <div className="w-full max-w-5xl mx-auto my-4 space-y-4">
            <ProfileHeader user={profileUser} isOwnProfile={isOwnProfile} />

            <div className="md:flex gap-4">
                <ProfileItems user={profileUser} />
                <div className="flex-1">
                    {profileTabContent()}
                </div>
            </div>
        </div>
    )
}