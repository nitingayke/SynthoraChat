import { useEffect, useMemo, useState } from "react"
import AIChatContext from "./AIChatContext"
import { fetchChatSessions } from "../services/ai.service";

export const AIChatProvider = ({ children }) => {

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
    }), [userPrompt, selectedChat, isAnswerLoading, sessions, sessionLoading]);

    return (
        <AIChatContext.Provider value={values}>
            {children}
        </AIChatContext.Provider>
    )
}