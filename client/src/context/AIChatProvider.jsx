import { useEffect, useMemo, useState, useCallback, useContext } from "react"
import AIChatContext from "./AIChatContext"
import { fetchChatSessions, sendMessageToAI } from "../services/ai.service";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

export const AIChatProvider = ({ children }) => {

    const navigate = useNavigate();

    const { loginUser } = useContext(AuthContext);

    const [userPrompt, setUserPrompt] = useState("");
    const [selectedChat, setSelectedChat] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [sessionLoading, setSessionLoading] = useState(false);
    const [isAnswerLoading, setIsAnswerLoading] = useState(false);

    useEffect(() => {
        const loadSessions = async () => {

            if (!loginUser?._id) {
                setSessions([]);
                return;
            }

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
    }, [loginUser?._id]);

    const MAX_MESSAGES_PER_SESSION = 200;

    const remainingMessages = useMemo(() => {
        if (!selectedChat?.messages) return MAX_MESSAGES_PER_SESSION;

        return Math.max(
            MAX_MESSAGES_PER_SESSION - selectedChat.messages.length,
            0
        );
    }, [selectedChat]);

    const sendMessage = useCallback(async (question, threadId) => {
        if (!question.trim()) return;

        if (remainingMessages <= 0) return;

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

        const activeThreadId = threadId || selectedChat?._id;

        try {
            const res = await sendMessageToAI({
                threadId: threadId || null,
                message: question,
                mode: "general_chat"
            });

            const {
                sessionTitle,
                reply,
                metadata,
                threadId: returnedThreadId,
                followUpQuestions
            } = res.data;

            if (!threadId && returnedThreadId) {
                const newSession = {
                    _id: returnedThreadId,
                    title: sessionTitle,
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

            setSelectedChat(prev => {
                if (prev?._id !== activeThreadId) {
                    return prev;
                }

                return {
                    ...prev,
                    messages: [...(prev?.messages || []), assistantMessage],
                    updatedAt: new Date().toISOString(),
                }
            });
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.detail ||
                "Something went wrong.";

            const errMessage = {
                role: "assistant",
                content: `⚠️ ${message}`,
                timestamp: new Date().toISOString(),
            };

            setSelectedChat(prev => ({
                ...prev,
                messages: [...(prev?.messages || []), errMessage],
            }));
        } finally {
            setIsAnswerLoading(false);
        }
    }, [navigate, remainingMessages, selectedChat]);

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
        sendMessage,
        remainingMessages,
        MAX_MESSAGES_PER_SESSION
    }), [userPrompt, selectedChat, isAnswerLoading, sessions, sessionLoading, sendMessage, remainingMessages]);

    return (
        <AIChatContext.Provider value={values}>
            {children}
        </AIChatContext.Provider>
    )
}