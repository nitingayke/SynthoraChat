import { HelpCircle, Plus, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function QuickActions() {
    return (
        <div className="rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#191919]">

            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-[#2a2a2a] flex items-center gap-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                    Quick Actions
                </h3>
            </div>

            {/* Actions */}
            <div className="p-3 space-y-3">

                {/* Ask a Question */}
                <Link
                    to="/main/create-post"
                    className="group w-full flex items-center justify-between px-3 py-2 rounded-lg  bg-gray-100 dark:bg-[#212121] hover:bg-orange-50 dark:hover:bg-[#2a2a2a] transition"
                >
                    <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-[#07C5B9]">
                        Ask a Question
                    </span>

                    <HelpCircle
                        size={16}
                        className="text-gray-500 dark:text-gray-400 group-hover:text-orange-500 dark:group-hover:text-[#07C5B9]"
                    />
                </Link>

                {/* Write an Answer */}
                <Link
                    to="/main"
                    className="group w-full flex items-center justify-between px-3 py-2 rounded-lg  bg-gray-100 dark:bg-[#212121] hover:bg-orange-50 dark:hover:bg-[#2a2a2a] transition"
                >
                    <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-[#07C5B9]">
                        Write an Answer
                    </span>

                    <Plus
                        size={16}
                        className="text-gray-500 dark:text-gray-400 group-hover:text-orange-500 dark:group-hover:text-[#07C5B9]"
                    />
                </Link>

                {/* Start AI Chat */}
                <Link
                    to="/main/ai-chat"
                    className="group w-full flex items-center justify-between px-3 py-2 rounded-lg  bg-gray-100 dark:bg-[#212121] hover:bg-orange-50 dark:hover:bg-[#2a2a2a] transition"
                >
                    <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-[#07C5B9]">
                        Start AI Chat
                    </span>

                    <MessageCircle
                        size={16}
                        className="text-gray-500 dark:text-gray-400 group-hover:text-orange-500 dark:group-hover:text-[#07C5B9]"
                    />
                </Link>

            </div>
        </div>
    );
}
