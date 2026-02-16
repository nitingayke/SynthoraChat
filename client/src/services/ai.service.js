import api from "../api/api";

/**
 * fetch all sessions
 */
export const fetchChatSessions = async () => {
    const response = await api.get("/ai/sessions");
    return response.data;
}

/**
 * fetch chat session
 * @param {threadId}
 */
export const fetchSingleChat = async (threadId) => {
    const response = await api.get(`/ai/chat/${threadId}`);
    return response.data;
}

/**
 * Send message to AI
 * @param {Object} payload
 * @param {string} payload.threadId 
 * @param {string} payload.message
 * @param {string} payload.mode
 */
export const sendMessageToAI = async (payload) => {
    const response = await api.post("/ai/chat", payload);
    return response.data;
}