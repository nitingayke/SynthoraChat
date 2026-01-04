import api from "../api/api";

/**
 * Create a new answer
 * @param {FormData} formData
 * formData fields:
 * - questionId: string
 * - content: string
 * - media: File[]
 */
export const createAnswerService = async (formData) => {
  const response = await api.post("/answer/new", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
