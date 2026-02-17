import { useEffect, useMemo, useState, useCallback } from "react"
import AIChatContext from "./AIChatContext"
import { fetchChatSessions, sendMessageToAI } from "../services/ai.service";
import { useNavigate } from "react-router-dom";

export const AIChatProvider = ({ children }) => {

    const navigate = useNavigate();

    const [userPrompt, setUserPrompt] = useState("");
    const [selectedChat, setSelectedChat] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [sessionLoading, setSessionLoading] = useState(false);
    const [isAnswerLoading, setIsAnswerLoading] = useState(false);

    useEffect(() => {
        const loadSessions = async () => {
            try {
                setSessionLoading(true);
                const res = await fetchChatSessions();
                setSessions(res?.data?.sessions || []);
            } catch {
                console.log("Failed to load sessions");
            } finally {
                setSessionLoading(false);
            }
        }

        loadSessions();
    }, []);

    const sendMessage = useCallback(async (question, threadId) => {
        if (!question.trim()) return;

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

            const {
                reply,
                metadata,
                threadId: returnedThreadId,
                followUpQuestions
            } = res.data;

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
                followUpQuestions
            };

            setSelectedChat(prev => ({
                ...prev,
                messages: [...(prev?.messages || []), assistantMessage],
                updatedAt: new Date().toISOString(),
            }));
        } finally {
            setIsAnswerLoading(false);
        }
    }, [navigate]);

    const values = useMemo(() => ({
        userPrompt,
        setUserPrompt,
        selectedChat,
        setSelectedChat,
        isAnswerLoading,
        setIsAnswerLoading,
        sessions,
        setSessions,
        sessionLoading,
        sendMessage
    }), [userPrompt, selectedChat, isAnswerLoading, sessions, sessionLoading, sendMessage]);

    return (
        <AIChatContext.Provider value={values}>
            {children}
        </AIChatContext.Provider>
    )
}