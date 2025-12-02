import { FileAudio, FileText, Image, Video } from "lucide-react";
import { useContext } from "react";
import PostContext from "../../../context/PostContext";

export default function MediaProgress() {

    const { media, MEDIA_LIMIT } = useContext(PostContext);

    const items = [
        { label: "Images", type: "image", icon: Image, color: "text-blue-600" },
        { label: "Videos", type: "video", icon: Video, color: "text-green-600" },
        { label: "Audio", type: "audio", icon: FileAudio, color: "text-purple-600" },
        { label: "Docs", type: "document", icon: FileText, color: "text-yellow-600" }
    ];

    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const progress = ((media?.length || 0) / MEDIA_LIMIT) * circumference;

    return (
        <div className="grid grid-cols-2 items-center">
            <div className="space-y-2">
                {items.map((i) => {
                    const Icon = i.icon;
                    return (
                        <div key={i.type} className="flex items-center gap-2">
                            <Icon size={18} className={i.color} />
                            <span className="text-gray-700 dark:text-gray-300 text-sm whitespace-nowrap">
                                {i.label}: {media.filter(m => m.type === i.type).length}
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
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="transparent"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke="#f97316"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - progress}
                        strokeLinecap="round"
                        className="transition-all duration-300"
                    />
                </svg>

                <span className="mt-2 text-sm dark:text-gray-300 absolute">
                    {media?.length || 0} / {MEDIA_LIMIT}
                </span>
            </div>
        </div>
    )
}