import axios from "axios";

const AI_SERVER_URL = "http://localhost:8000";

export const evaluateAnswerAccuracy = async ({title, description, topics, answer}) => {

    try {
        const response = await axios.post(
            `${AI_SERVER_URL}/evaluation/`,
            {
                title,
                description,
                topics,
                answer
            },
            { timeout: 120000 }
        );

        return {
            success: true,
            data: response.data
        };
    } catch {
        return {
            success: false,
            data: {
                accuracy: 0,
                feedback: "AI evaluation unavailable",
                improvements: []
            }
        }
    }
}