import { FileAudio, FileText, Image, Video } from "lucide-react";
import { useContext } from "react";
import PostContext from "../../../context/PostContext";
import ThemeContext from "../../../context/ThemeContext";

export default function MediaProgress({ MAX_MEDIA }) {
    const { theme } = useContext(ThemeContext);
    const { media, MEDIA_LIMIT } = useContext(PostContext);

    const safeMedia = media ?? [];
    const mediaCount = safeMedia.length;
    const mediaLimit = MEDIA_LIMIT ?? MAX_MEDIA ?? 0;

    const isOverflow = mediaCount > mediaLimit;

    const PROGRESS_COLORS = {
        normal: theme === "dark" ? "#07C5B6" : "#f97316",
        danger: "#ef4444",
        track: theme === "dark" ? "#2a2a2a" : "#e5e7eb",
    };

    const items = [
        { label: "Images", type: "image", icon: Image, color: "text-blue-600" },
        { label: "Videos", type: "video", icon: Video, color: "text-green-600" },
        { label: "Audio", type: "audio", icon: FileAudio, color: "text-purple-600" },
        { label: "Docs", type: "document", icon: FileText, color: "text-yellow-600" },
    ];

    const mediaStats = safeMedia.reduce(
        (acc, m) => {
            acc[m.type] = (acc[m.type] || 0) + 1;
            return acc;
        },
        { image: 0, video: 0, audio: 0, document: 0 }
    );

    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const progressRatio = Math.min(mediaCount / mediaLimit, 1);
    const progress = progressRatio * circumference;

    if (isOverflow) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
                <span className="text-red-500 font-semibold text-sm">
                    Media limit exceeded
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    Remove {mediaCount - mediaLimit} file(s) to continue
                </span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 items-center gap-3">
            <div className="space-y-2">
                {items.map((i) => {
                    const Icon = i.icon;
                    return (
                        <div key={i.type} className="flex items-center gap-2">
                            <Icon size={18} className={i.color} />
                            <span className="text-gray-700 dark:text-gray-300 text-sm">
                                {i.label}: {mediaStats[i.type]}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="relative flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full max-h-40 max-w-40">
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke={PROGRESS_COLORS.track}
                        strokeWidth="8"
                        fill="transparent"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke={PROGRESS_COLORS.normal}
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - progress}
                        strokeLinecap="round"
                        className="transition-all duration-300"
                    />
                </svg>

                <span className="text-2xl font-extrabold absolute dark:text-gray-300">
                    {mediaCount}<span className="px-0.5">/</span>{mediaLimit}
                </span>
            </div>
        </div>
    );
}
