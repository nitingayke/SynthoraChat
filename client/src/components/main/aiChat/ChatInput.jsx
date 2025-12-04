import React, { useEffect, useRef, useContext } from 'react';
import { Send, Paperclip, Mic, Sparkles, Edit3, Lightbulb, StopCircle } from 'lucide-react';
import AIChatContext from '../../../context/AIChatContext';

export default function ChatInput() {

    const { userPrompt, setUserPrompt, setSelectedChat, isAnswerLoading, setIsAnswerLoading } = useContext(AIChatContext);
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [userPrompt]);

    const handleUserQuestion = async (question) => {
        setSelectedChat(prev => {
            const newMessage = {
                role: "user",
                content: question,
                timestamp: new Date().toISOString(),
            };
            return {
                ...prev,
                messages: [...(prev?.messages || []), newMessage],
                updatedAt: new Date().toISOString(),
            }
        });

        setIsAnswerLoading(true);

        await new Promise(resolve => setTimeout(resolve, 10000));

        const dummyReply = {
            role: "assistant",
            content: "This is a dummy AI response generated after 10 seconds ⏳",
            timestamp: new Date().toISOString(),
            metadata: {
                modelUsed: "GPT-Dummy",
                tokens: 20,
                responseTime: 10000,
                confidenceScore: 0.50,
            }
        };

        setSelectedChat(prev => ({
            ...prev,
            messages: [...prev.messages, dummyReply],
            updatedAt: new Date().toISOString(),
        }));

        setIsAnswerLoading(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (userPrompt.trim() && !isAnswerLoading) {

            const question = userPrompt.trim()

            setUserPrompt('');

            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }

            handleUserQuestion(question);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const quickActions = [
        {
            icon: Sparkles,
            label: "Explain",
            prompt:
                "Give a clear and concise explanation of this content, focusing only on the main concept without extra details."
        },
        {
            icon: Paperclip,
            label: "Examples",
            prompt:
                "Provide 2–3 short, practical examples that clearly illustrate this concept or topic."
        },
        {
            icon: Send,
            label: "Summarize",
            prompt:
                "Summarize this content into a brief paragraph highlighting only the key points."
        },
        {
            icon: Edit3,
            label: "Refine Post",
            prompt:
                "Rewrite this text to make it clearer, more structured, and easier to understand while keeping it short and professional."
        },
        {
            icon: Lightbulb,
            label: "Key Insights",
            prompt:
                "List the top insights or takeaways in bullet points, focusing on clarity and brevity."
        }
    ];

    return (
        <div className="bg-white dark:bg-[#191919] px-3 pt-3 pb-2 rounded-t-lg">

            {(!isAnswerLoading) && (
                <div className="flex gap-2 mb-2 overflow-x-auto scrollbar-hide">
                    {quickActions.map((action, index) => (
                        <button
                            key={index * 0.12488}
                            onClick={() => handleUserQuestion(action.prompt)}
                            className="flex text-sm items-center gap-2 px-2.5 py-1.5 bg-gray-200/70 dark:bg-[#212121] hover:opacity-80 rounded-lg text-gray-700 dark:text-gray-300 transition-colors whitespace-nowrap"
                        >
                            <action.icon className="w-4 h-4" />
                            {action.label}
                        </button>
                    ))}
                </div>
            )}

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

                    {/* Action Buttons */}
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