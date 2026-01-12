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

/**
 * get answers by question id with pagination
 */
export const getAnswersByQuestionId = async (
  questionId,
  skip = 0,
  limit = 10
) => {
  const res = await api.get(`/q/${questionId}/answers?skip=${skip}&limit=${limit}`);
  return res.data;
};
