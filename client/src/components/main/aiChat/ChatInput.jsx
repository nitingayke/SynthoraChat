import React, { useEffect, useRef, useContext } from 'react';
import { Send, Paperclip, Mic, StopCircle } from 'lucide-react';
import AIChatContext from '../../../context/AIChatContext';
import UIStateContext from '../../../context/UIStateContext';
import { useNavigate, useParams } from 'react-router-dom';
import { sendMessageToAI } from '../../../services/ai.service';
import { useSnackbar } from 'notistack';

export default function ChatInput() {

    const navigate = useNavigate();
    const { threadId } = useParams();

    const { isAuthorize } = useContext(UIStateContext);
    const { userPrompt, setUserPrompt, setSelectedChat, isAnswerLoading, setIsAnswerLoading, setSessions } = useContext(AIChatContext);
    const textareaRef = useRef(null);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [userPrompt]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthorize() || isAnswerLoading) return;

        const question = userPrompt.trim();
        if (!question) return;

        setUserPrompt("");

        const newUserMessage = {
            role: "user",
            content: question,
            timestamp: new Date().toISOString(),
        }

        setSelectedChat(prev => ({
            ...prev,
            messages: [...(prev?.messages || []), newUserMessage],
            updatedAt: new Date().toISOString(),
        }));

        setIsAnswerLoading(true);

        try {
            const res = await sendMessageToAI({
                threadId: threadId || null,
                message: question,
                mode: "general_chat"
            });

            const { reply, metadata, threadId: returnedThreadId } = res.data;

            if (!threadId && returnedThreadId) {
                const newSession = {
                    _id: returnedThreadId,
                    title: question.slice(0, 40),
                    updatedAt: new Date().toISOString(),
                };

                setSessions(prev => [newSession, ...prev]);

                navigate(`/main/ai-chat/${returnedThreadId}`);
                return;
            }

            const assistantMessage = {
                role: "assistant",
                content: reply,
                timestamp: new Date().toISOString(),
                metadata,
            };

            setSelectedChat(prev => ({
                ...prev,
                messages: [...(prev?.messages || []), assistantMessage],
                updatedAt: new Date().toISOString(),
            }));
        } catch (error) {
            enqueueSnackbar(
                error?.response?.data?.message || "Something went wrong",
                { variant: "error" }
            );
        } finally {
            setIsAnswerLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="bg-white dark:bg-[#191919] px-3 pt-3 pb-2 rounded-t-lg">

            <form onSubmit={handleSubmit} className="relative">
                <div className={`relative border border-gray-500/50 rounded-lg transition-all duration-200`}>
                    <textarea
                        ref={textareaRef}
                        value={userPrompt}
                        onChange={(e) => setUserPrompt(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={isAnswerLoading ? "Select a chat to continue..." : "Message AI assistant..."}
                        disabled={isAnswerLoading}
                        rows={1}
                        className="w-full text-sm px-4 py-3 pr-25 resize-none outline-none ring-0 focus:ring-0 focus:outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 max-h-32 scrollbar-hide"
                        style={{ minHeight: '48px' }}
                    />
                    <div className="absolute right-2 bottom-2 flex items-center gap-1">
                        <button
                            type="button"
                            className="p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#212121] rounded-full transition-colors disabled:cursor-not-allowed"
                            title="Attach file"
                            disabled={isAnswerLoading}
                        >
                            <Paperclip className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            className="p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#212121] rounded-full transition-colors disabled:cursor-not-allowed"
                            title="Voice input"
                            disabled={isAnswerLoading}
                        >
                            <Mic className="w-4 h-4" />
                        </button>
                        {
                            isAnswerLoading
                                ? <button title='Stop' className='p-1.5 hover:bg-gray-200 dark:hover:bg-[#212121] rounded-full'><StopCircle className="w-4 h-4" /></button>
                                : <button
                                    type="submit"
                                    disabled={!userPrompt.trim() || isAnswerLoading}
                                    className="p-1.5 disabled:text-gray-600 text-white bg-orange-500 dark:bg-[#07C5B9] hover:opacity-80 disabled:bg-gray-200/50 dark:disabled:dark:bg-[#212121] disabled:cursor-not-allowed rounded-lg transition-colors"
                                    title="Send message"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                        }
                    </div>
                </div>
            </form>

            <div className="flex items-center justify-center mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                Press Enter to send, <span className='hidden md:block px-1'>Shift+Enter for new line,</span> SynthoraChat AI can make mistakes
            </div>
        </div>
    );
}