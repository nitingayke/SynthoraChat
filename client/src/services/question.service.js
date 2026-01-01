import api from "../api/api";

/**
 * Get all questions (paginated)
 * @param {number} page - current page
 * @param {number} limit - number of questions per page
 */
export const getAllQuestionsService = async (page = 1, limit = 20) => {
  const response = await api.get("/q", {
    params: { page, limit },
  });
  return response.data;
};

/**
 * Create a new question
 * @param {FormData} formData
 * formData fields:
 * - title: string
 * - content: string
 * - topics[]: string[]
 * - allowComments: boolean
 * - media: File[]
 */
export const createQuestionService = async (formData) => {
  const response = await api.post("/q/new", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
