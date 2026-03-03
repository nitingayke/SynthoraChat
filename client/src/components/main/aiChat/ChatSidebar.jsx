import { Loader2, PlusCircle } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useMemo } from "react";
import { timeAgo } from "../../../utils/date";
import AIChatContext from "../../../context/AIChatContext";

export default function ChatSidebar() {

    const navigate = useNavigate();
    const { threadId } = useParams();

    const { sessions, sessionLoading, isAnswerLoading } = useContext(AIChatContext);

    const handleNewChat = () => {
        navigate("/main/ai-chat");
    }

    const sortedSessions = useMemo(() => {
        return [...(sessions || [])].sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
    }, [sessions]);

    return (
        <>
            <div className="flex flex-col flex-1 overflow-y-auto space-y-1 scrollbar-hide">

                {sessionLoading && (
                    <div className="flex items-center justify-center py-4 gap-2 text-gray-500 dark:text-gray-400">
                        <Loader2 className="animate-spin w-5 h-5" />
                        <span>Loading...</span>
                    </div>
                )}

                {!sessionLoading && sessions?.length === 0 && (
                    <div className="text-sm text-gray-500 text-center py-4">
                        No chat sessions yet.
                    </div>
                )}

                {!sessionLoading && sortedSessions?.map((session) => (
                    <Link
                        key={session._id}
                        to={isAnswerLoading ? "#" : `/main/ai-chat/${session._id}`}
                    >
                        <div className={`px-2 py-1.5 rounded-lg cursor-pointer ${threadId === String(session._id) ? "hover:bg-orange-100 dark:hover:bg-[#07C5B9]/10 bg-gray-100 dark:bg-[#1f1f1f]" : "hover:bg-gray-100 dark:hover:bg-[#1f1f1f]"}`}>
                            <p className={`font-medium text-sm gap-2 line-clamp-1 ${threadId === String(session._id) ? "text-orange-500 dark:text-[#07C5B9]" : "text-gray-900 dark:text-gray-100"}`}>
                                {session?.title || "SynthoraChat AI"}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(session?.updatedAt)}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <button onClick={handleNewChat} className="flex items-center w-full gap-3 bg-orange-500 dark:bg-[#07C5B9] text-white py-2 px-3 rounded-md mt-3">
                <PlusCircle className="w-5 h-5" /> New Chat
            </button>
        </>
    )
}