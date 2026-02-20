import { useContext, useEffect, useRef, useState } from "react";
import { Check, Copy, CornerDownRight, StopCircle, Volume2 } from "lucide-react";
import PropTypes from "prop-types";
import ChatInput from "./ChatInput";
import AIChatContext from "../../../context/AIChatContext";
import LoaderComponent from "../../loader/LoaderComponent";
import { copyToClipboard } from "../../../utils/copyToClipboard";
import MarkdownRenderer from "../../common/MarkdownRenderer";
import { useSnackbar } from "notistack";

export default function ChatWindow({ loading }) {

    const { enqueueSnackbar } = useSnackbar();

    const { selectedChat, isAnswerLoading, sendMessage } = useContext(AIChatContext);
    const chatScrollRef = useRef(null);

    const [copiedCodeBlock, setCopiedCodeBlock] = useState(null);
    const [speakingIndex, setSpeakingIndex] = useState(null);
    const speechRef = useRef(null);

    useEffect(() => {
        if (chatScrollRef.current) {
            chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
        }
    }, [selectedChat?.messages, isAnswerLoading]);


    const handleCopy = async (text, index) => {
        const success = await copyToClipboard(text);

        if (success) {
            setCopiedCodeBlock(index);
            setTimeout(() => setCopiedCodeBlock(null), 2000);
        }
    }

    const handleFollowUpClick = (q) => {
        const transformedMessage = `User selected follow-up: ${q}. Please respond accordingly.`;

        sendMessage(transformedMessage, selectedChat?._id);
    }

    const handleSpeak = (text, index) => {
        if (!("speechSynthesis" in window)) {
            enqueueSnackbar("Text-to-speech not supported in this browser.", { variant: "error" });
            return;
        }

        if (speakingIndex === index) {
            window.speechSynthesis.cancel();
            setSpeakingIndex(null);
            return;
        }

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1; // speed
        utterance.pitch = 1; // tone
        utterance.lang = "en-US";

        utterance.onend = () => {
            setSpeakingIndex(null);
        };

        speechRef.current = utterance;
        window.speechSynthesis.speak(utterance);

        setSpeakingIndex(index);
    }

    return (
        <div className="flex flex-col flex-1 overflow-hidden pt-4 h-[calc(100vh-65px)]">

            {loading ? (
                <div className="flex justify-center flex-1">
                    <LoaderComponent />
                </div>
            ) : (
                <>
                    <div
                        ref={chatScrollRef}
                        className="flex-1 overflow-y-auto overflow-x-hidden md:pe-1 custom-scrollbar space-y-3 mb-3 scroll-smooth pb-1">
                        {selectedChat?.messages?.length > 0 ? (
                            selectedChat.messages.map((msg, index) => (
                                <div
                                    key={index * 0.2458}
                                    className={`flex w-full ${msg?.role === "user" ? "justify-end" : "justify-start "
                                        }`}
                                >
                                    <div
                                        className={`px-2 sm:px-4 py-2 text-[#161616] dark:text-gray-100 max-w-[98%] w-fit min-w-0
                                             ${msg?.role === "user" ? "rounded-br-none bg-white dark:bg-[#191919] rounded-2xl shadow-sm" : "rounded-bl-none"}`}
                                    >
                                        <div className="min-w-0 w-full">
                                            {msg.role === "assistant" ? (
                                                <MarkdownRenderer content={msg.content} />
                                            ) : (
                                                <p className="whitespace-pre-wrap break-words">
                                                    {msg.content}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between mt-1 gap-2">
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => handleCopy(msg?.content, index)}
                                                    title={copiedCodeBlock === index ? "Copied" : "Copy"}
                                                    className="p-2 rounded-md hover:cursor-pointer hover:bg-gray-200/50 dark:hover:bg-[#252525]"
                                                >
                                                    {copiedCodeBlock === index ? (
                                                        <Check size={16} className="text-green-400" />
                                                    ) : (
                                                        <Copy size={16} />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => handleSpeak(msg?.content, index)}
                                                    title={speakingIndex === index ? "Stop" : "Speak"}
                                                    className="p-2 rounded-md hover:cursor-pointer hover:bg-gray-200/50 dark:hover:bg-[#252525]"
                                                >
                                                    {speakingIndex === index ? (
                                                        <StopCircle size={18} />
                                                    ) : (
                                                        <Volume2 size={18} />
                                                    )}
                                                </button>

                                            </div>
                                            <span className="text-xs opacity-60">
                                                {new Date(msg.timestamp).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                        </div>

                                        {
                                            !isAnswerLoading && msg.role === "assistant" && msg.followUpQuestions?.length > 0 && (
                                                <div className="mt-4 flex flex-col gap-2">
                                                    {msg.followUpQuestions.map((q, i) => (
                                                        <button
                                                            key={i * 0.23548}
                                                            onClick={() =>
                                                                handleFollowUpClick(q)
                                                            }
                                                            className="flex items-center gap-2 px-3 py-1.5 text-xs bg-gray-200 dark:bg-[#252525] hover:bg-gray-300/60 dark:hover:bg-[#2f2f2f] rounded-full transition-all duration-150 border border-gray-300 dark:border-[#333] w-fit cursor-pointer"
                                                        >
                                                            <CornerDownRight size={16} />
                                                            <p className="flex items-start">{q}</p>
                                                        </button>
                                                    ))}
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center h-full">
                                <h1 className="text-3xl sm:text-4xl font-bold opacity-20">Welcome to SynthoraChat</h1>
                                <p className="text-gray-500 dark:text-gray-400">I'm here to help!</p>
                            </div>
                        )}

                        {
                            isAnswerLoading && <div className="text-[15px] flex px-2 space-x-2 pb-5">
                                <div className="animate-spin rounded-full border-3 border-x-0 w-4 h-4"></div>
                                <span>Loading...</span>
                            </div>
                        }
                    </div>

                    <ChatInput />
                </>
            )
            }
        </div>
    );
}

ChatWindow.propTypes = {
    loading: PropTypes.bool,
};