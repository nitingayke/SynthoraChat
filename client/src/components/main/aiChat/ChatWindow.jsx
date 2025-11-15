import { useContext, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import AIChatContext from "../../../context/AIChatContext";

export default function ChatWindow() {

    const { selectedChat, isAnswerLoading } = useContext(AIChatContext);
    const chatScrollRef = useRef(null);

    useEffect(() => {

        if (!selectedChat?.messages?.length) return;

        const lastMsg = selectedChat.messages[selectedChat.messages.length - 1];

        if (lastMsg.role === "user" && chatScrollRef.current) {
            chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
        }
    }, [selectedChat?.messages]);

    return (
        <div className="flex flex-col flex-1 overflow-hidden pt-4 h-[calc(100vh-61px)]">

            <div 
                ref={chatScrollRef}
                className="flex-1 overflow-y-auto md:pe-1 custom-scrollbar space-y-3 mb-3 scroll-smooth">
                {selectedChat?.messages?.length > 0 ? (
                    selectedChat.messages.map((msg, index) => (
                        <div
                            key={index * 0.2458}
                            className={`flex w-full ${msg?.role === "user" ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm ${msg?.role === "user"
                                        ? "bg-gray-100 dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100 rounded-br-none"
                                        : "bg-gray-100/80 dark:bg-[#1e1e1e]/50 text-gray-900 dark:text-gray-100 rounded-bl-none"
                                    }`}
                            >
                                <p className="text-[15px] leading-relaxed">{msg.content}</p>

                                <div className="text-xs opacity-70 mt-1 text-right">
                                    {new Date(msg.timestamp).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                        No messages yet. Start a new chat below 👇
                    </div>
                )}

                {
                    isAnswerLoading && <div className="text-[15px] flex px-2 space-x-2">
                        <div className="animate-spin rounded-full border-3 border-x-0 w-4 h-4"></div>
                        <span>Loading...</span>
                    </div>
                }
            </div>

            <ChatInput />
        </div>
    );
}
