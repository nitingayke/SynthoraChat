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

/**
 * @param {string} inputText
 */
export const generatePostFormService = async (inputText) => {
    const response = await api.post("/ai/question-content", {
        inputText
    });

    return response.data;
}

/**
 * Generate AI Summary for question
 * @param {string} questionId
 */
export const generateSummaryService = async (questionId) => {
    const response = await api.post("/ai/summary", {
        questionId
    });

    return response.data;
};
