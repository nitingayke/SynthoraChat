import { PlusCircle } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ChatSidebar() {

    const navigate = useNavigate();
    const { threadId } = useParams();

    const handleNewChat = () => {
        navigate("/main/ai-chat")
    }

    const dummyHistory = [
        { id: 1, title: "Explain closures in JavaScript", timestamp: "2 min ago" },
        { id: 2, title: "Help me write question", timestamp: "1 hour ago" },
        { id: 3, title: "Summarize an answer", timestamp: "Yesterday" },
        { id: 4, title: "What is event loop in JS?", timestamp: "5 days ago" },
        { id: 5, title: "Fix my React component", timestamp: "10 min ago" },
        { id: 6, title: "Why use dependency array?", timestamp: "30 min ago" },
        { id: 7, title: "Convert callback to async/await", timestamp: "1 week ago" },
        { id: 8, title: "Help me debug my Express API", timestamp: "3 hours ago" },
        { id: 9, title: "Create a reusable React hook", timestamp: "2 days ago" },
        { id: 10, title: "Database schema suggestion", timestamp: "4 days ago" },
        { id: 11, title: "Optimize SQL query", timestamp: "6 days ago" },
        { id: 12, title: "Implement JWT authentication", timestamp: "3 hours ago" },
        { id: 13, title: "Create landing page hero section", timestamp: "7 days ago" },
        { id: 14, title: "Difference between var let const", timestamp: "12 min ago" },
        { id: 15, title: "Write regex for email validation", timestamp: "1 month ago" },
        { id: 16, title: "How to use useReducer", timestamp: "42 min ago" },
        { id: 17, title: "Make responsive navbar", timestamp: "3 days ago" },
        { id: 18, title: "How to deploy React to Netlify", timestamp: "1 week ago" },
        { id: 19, title: "Fix CORS issue in backend", timestamp: "20 min ago" },
        { id: 20, title: "Explain prototypal inheritance", timestamp: "6 hours ago" },
    ];

    return (
        <aside className="hidden md:flex h-[calc(100vh-65px)] flex-col w-72 bg-white dark:bg-[#161616] p-4">

            <button onClick={handleNewChat} className="flex items-center gap-3 bg-orange-500 dark:bg-[#07C5B9] text-white py-2 px-3 rounded-md mb-4">
                <PlusCircle className="w-5 h-5" /> New Chat
            </button>

            <div className="flex-1 overflow-y-auto space-y-1 scrollbar-hide">
                {dummyHistory.map((item) => (
                    <Link
                        key={item.id}
                        to={`/main/ai-chat/${item.id}`}
                    >
                        <div className={`p-2 rounded-lg cursor-pointer ${threadId === String(item.id) ? "hover:bg-orange-100 dark:hover:bg-[#07C5B9]/10" : "hover:bg-gray-200 dark:hover:bg-[#1f1f1f]"}`}>
                            <p className={`font-medium text-sm flex items-center gap-2 ${threadId === String(item.id) ? "text-orange-500 dark:text-[#07C5B9]" : "text-gray-900 dark:text-gray-100"}`}>
                                {item.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{item.timestamp}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </aside>
    )
}