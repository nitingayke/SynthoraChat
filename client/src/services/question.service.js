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

/**
 * Update question
 * @param {string} questionId
 * @param {FormData} formData
 */
export const updateQuestionService = async (questionId, formData) => {
  const response = await api.put(`/q/${questionId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/**
 * Get all topics (paginated)
 */
export const getAllTopics = async () => {
  const response = await api.get("/q/topics");
  return response.data;
};

/**
 * get question by questionId
 * @param {string} questionId - question id
 */
export const getQuestionById = async (questionId) => {
  const response = await api.get(`/q/${questionId}`);
  return response.data;
};

/**
 * toggle question like
 * @param {string} questionId
 */
export const toggleLikeQuestion = async (questionId) => {
  const res = await api.post(`/q/${questionId}/likes`);
  return res.data;
};

/**
 * toggle upvote question
 * @param {string} questionId
 */
export const toggleUpvoteQuestion = async (questionId) => {
  const res = await api.post(`/q/${questionId}/upvotes`);
  return res.data;
};

/**
 * toggle save question
 * @param {string} questionId
 */
export const toggleSaveQuestion = async (questionId) => {
  const res = await api.post(`/q/${questionId}/saves`);
  return res.data;
};
