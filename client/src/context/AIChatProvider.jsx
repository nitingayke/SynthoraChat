import { useEffect, useMemo, useState } from "react"
import AIChatContext from "./AIChatContext"

export const AIChatProvider = ({ children }) => {

    const [userPrompt, setUserPrompt] = useState("");
    const [selectedChat, setSelectedChat] = useState(
        {
            _id: "673ef21c8b2d56c1a9f4e001",
            user: "673eeff48b2d56c1a9f4dfd8", // userId reference
            title: "Understanding React useEffect",
            sessionType: "general_chat",
            messages: [
                {
                    role: "user",
                    content: "Hey Synthora, can you explain how useEffect works in React?",
                    timestamp: "2025-11-12T10:15:30.000Z",
                },
                {
                    role: "assistant",
                    content:
                        "Of course! useEffect lets you perform side effects like data fetching or DOM updates after render. You can control when it runs by providing a dependency array.",
                    timestamp: "2025-11-12T10:15:35.000Z",
                    metadata: {
                        modelUsed: "GPT-5",
                        tokens: 58,
                        responseTime: 1340,
                        confidenceScore: 0.94,
                    },
                },
                {
                    role: "user",
                    content:
                        "Got it! So if I pass an empty array, it runs only once, right?",
                    timestamp: "2025-11-12T10:15:50.000Z",
                },
                {
                    role: "assistant",
                    content:
                        "Exactly ✅ — with an empty array, it behaves like componentDidMount and runs only once after the first render.",
                    timestamp: "2025-11-12T10:15:53.000Z",
                    metadata: {
                        modelUsed: "GPT-5",
                        tokens: 42,
                        responseTime: 980,
                        confidenceScore: 0.97,
                    },
                },
            ],
            createdAt: "2025-11-12T10:15:25.000Z",
            updatedAt: "2025-11-12T10:16:00.000Z",
        },
    );
    const [isAnswerLoading, setIsAnswerLoading] = useState(false);

    useEffect(() => {
        const savedPrompt = localStorage.getItem("ai_user_prompt");

        if (savedPrompt) {
            try {
                const parsedPrompt = JSON.parse(savedPrompt);
                setUserPrompt(parsedPrompt.prompt || "");
            } catch (error) {
                console.error('Error parsing saved prompt:', error);
                localStorage.removeItem('ai_user_prompt');
            }
        }
    }, []);

    const values = useMemo(() => ({
        userPrompt,
        setUserPrompt,
        selectedChat,
        setSelectedChat,
        isAnswerLoading,
        setIsAnswerLoading
    }), [userPrompt, selectedChat, isAnswerLoading]);

    return (
        <AIChatContext.Provider value={values}>
            {children}
        </AIChatContext.Provider>
    )
}