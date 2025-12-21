import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
    MapPin,
    Globe,
    Calendar,
    Clock,
    MessageSquare,
    Brain,
    ThumbsUp,
    CheckCircle,
    Edit3,
    Users,
    Star,
    Shield,
    BookOpen,
    Zap
} from "lucide-react";
import Avatar from "@mui/material/Avatar";
import AuthContext from "../../../context/AuthContext";

export default function UserProfile() {
    const { loginUser } = useContext(AuthContext);

    const userData = loginUser || {};
    const profile = userData?.profile || {};
    const stats = {
        followers: userData?.followers?.length || 0,
        following: userData?.following?.length || 0,
        answers: userData?.answers?.length || 0,
        questions: userData?.questions?.length || 0,
        saved: userData?.savedQuestions?.length || 0,
        aiSessions: userData?.aiInteractions?.length || 0,
        upvotes: userData?.upvotesCount || 0,
        helpful: userData?.helpfulAnswers || 0,
        credentials: userData?.credentials?.length || 0,
        blocked: userData?.blockedUsers?.length || 0
    };

    return (
        <div className="w-full bg-white dark:bg-[#161616] rounded-lg border border-gray-200 dark:border-gray-800/50 overflow-hidden transition-all duration-300">

            <div className="relative h-28">
                <div
                    className="absolute inset-0 bg-gray-200 dark:bg-[#202020]"
                    style={{
                        backgroundImage: profile?.coverPicture ? `url(${profile.coverPicture})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />

                {/* Verification Badge on Cover */}
                {userData?.isVerified && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 dark:bg-[#161616]/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <CheckCircle className="w-3 h-3 text-orange-500 dark:text-[#07C5B9]" />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Verified</span>
                    </div>
                )}
            </div>

            <div className="px-3 lg:px-5 pb-5 space-y-2">
                <div className="flex flex-col items-center -mt-14">
                    <div className="relative group">
                        <Avatar
                            src={profile?.profilePicture}
                            alt={profile?.firstName || userData?.username}
                            className="!h-20 !w-20 md:!w-30 md:!h-30 border-4 border-white dark:border-[#161616] shadow-xl group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-blue-400 dark:group-hover:border-[#07C5B9] transition-all duration-300" />
                    </div>

                    <h1 className="text-lg font-bold text-gray-900 dark:text-white mt-3 text-center leading-tight">
                        {profile?.firstName} {profile?.lastName}
                    </h1>

                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        @{userData?.username}
                    </p>

                    {/* Bio with fade effect */}
                    {profile?.bio && (
                        <div className="relative mt-2 w-full">
                            <p className="text-gray-600 dark:text-gray-300 text-xs text-center leading-relaxed line-clamp-2 px-2">
                                {profile.bio}
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-600/10 p-3 rounded-lg border border-blue-200 dark:border-blue-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.questions}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    <MessageSquare className="w-3 h-3" />
                                    Questions
                                </div>
                            </div>
                            <MessageSquare className="w-4 h-4 text-orange-500 dark:text-blue-400" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-500/10 dark:to-green-600/10 p-3 rounded-lg border border-green-200 dark:border-green-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.answers}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    <ThumbsUp className="w-3 h-3" />
                                    Answers
                                </div>
                            </div>
                            <ThumbsUp className="w-4 h-4 text-green-500 dark:text-green-400" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-500/10 dark:to-purple-600/10 p-3 rounded-lg border border-purple-200 dark:border-purple-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.upvotes}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    <Star className="w-3 h-3" />
                                    Upvotes
                                </div>
                            </div>
                            <Star className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-500/10 dark:to-orange-600/10 p-3 rounded-lg border border-orange-200 dark:border-orange-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.aiSessions}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    <Brain className="w-3 h-3" />
                                    AI Chats
                                </div>
                            </div>
                            <Brain className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-gray-200 dark:bg-[#202020] rounded-lg hover:opacity-80 dark:hover:bg-[#2a2a2a] transition-colors">
                        <div className="font-semibold text-gray-900 dark:text-white">{stats.followers}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Followers</div>
                    </div>
                    <div className="p-2 bg-gray-200 dark:bg-[#202020] rounded-lg hover:opacity-80 dark:hover:bg-[#2a2a2a] transition-colors">
                        <div className="font-semibold text-gray-900 dark:text-white">{stats.following}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Following</div>
                    </div>
                    <div className="p-2 bg-gray-200 dark:bg-[#202020] rounded-lg hover:opacity-80 dark:hover:bg-[#2a2a2a] transition-colors">
                        <div className="font-semibold text-gray-900 dark:text-white">{stats.helpful}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Helpful</div>
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm gap-2 overflow-hidden">
                    {profile?.location && (
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${profile?.location}`}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-[#202020] px-3 py-2 rounded-lg hover:opacity-80 dark:hover:bg-[#2a2a2a] transition-colors flex-1 line-clamp-1"
                            target="_blank"
                        >
                            <MapPin className="w-4 h-4 shrink-0" />
                            <span className="min-w-0 truncate">
                                {profile.location}
                            </span>
                        </a>

                    )}

                    {profile?.website && (
                        <a
                            href={profile.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-[#202020] px-3 py-2 rounded-lg hover:opacity-80 dark:hover:bg-[#2a2a2a] transition-colors flex-1"
                        >
                            <Globe className="w-4 h-4" />
                            <span className="truncate">Website</span>
                        </a>
                    )}
                </div>

                <div className="mt-4 space-y-3">
                    {/* Expertise */}
                    {userData?.knowsAbout?.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-4 h-4 text-orange-500 dark:text-[#07C5B9]" />
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Expertise</h3>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {userData.knowsAbout.slice(0, 10).map((topic, index) => (
                                    <span
                                        key={index * 0.24587}
                                        className="px-2 py-1 bg-orange-100 dark:bg-[#07C5B9]/20 text-orange-500 dark:text-[#07C5B9] text-xs rounded-full border border-orange-300 dark:border-[#07C5B9]/30 hover:scale-105 transition-transform"
                                    >
                                        {topic}
                                    </span>
                                ))}
                                {userData.knowsAbout.length > 10 && (
                                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                                        +{userData.knowsAbout.length - 10}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Interests */}
                    {userData?.topicsOfInterest?.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <BookOpen className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Interests</h3>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {userData.topicsOfInterest.slice(0, 10).map((topic, index) => (
                                    <span
                                        key={index * 0.2568}
                                        className="px-2 py-1 bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 text-xs rounded-full border border-purple-200 dark:border-purple-500/30 hover:scale-105 transition-transform"
                                    >
                                        {topic}
                                    </span>
                                ))}
                                {userData.topicsOfInterest.length > 10 && (
                                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                                        +{userData.topicsOfInterest.length - 10}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Credentials Preview */}
                    {userData?.credentials?.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Shield className="w-4 h-4 text-green-500 dark:text-green-400" />
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Credentials</h3>
                            </div>
                            <div className="space-y-2">
                                {userData.credentials.slice(0, 7).map((credential, index) => (
                                    <div
                                        key={index * 0.2568}
                                        className="text-xs text-gray-700 dark:text-gray-300 p-2 bg-gray-200 dark:bg-[#202020] rounded-lg border-l-2 border-green-500 dark:border-green-400"
                                    >
                                        {credential}
                                    </div>
                                ))}
                                {userData.credentials.length > 7 && (
                                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                        +{userData.credentials.length - 7} more credentials
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-2 gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            <span>Joined {new Date(userData?.createdAt)?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            <span>Active {new Date(userData?.lastActive)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                    </div>

                    <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>📚 {stats.saved} saved</span>
                        <span>🛡️ {stats.credentials} creds</span>
                        <span>🚫 {stats.blocked} blocked</span>
                    </div>
                </div>

                <div className="mt-5 flex gap-2">
                    <Link to={`/profile/${loginUser?.username}/edit`} className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-200 dark:bg-[#202020] text-gray-700 dark:text-gray-200 rounded-lg hover:opacity-80 transition-all duration-200 text-sm font-medium border border-gray-300 dark:border-gray-700">
                        <Edit3 className="w-4 h-4" />
                        Edit
                    </Link>
                    <Link
                        to={`/profile/${loginUser?.username}`}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 dark:bg-[#07C5B9] bg-orange-500 text-white rounded-lg hover:opacity-80 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg transform"
                    >
                        <Users className="w-4 h-4" />
                        Full Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}