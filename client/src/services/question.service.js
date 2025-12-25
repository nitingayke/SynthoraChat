import api from "../api/api";

/**
 * Create a new question
 * @param {Object} payload
 * @param {string} payload.title
 * @param {string} payload.content
 * @param {string[]} payload.topics
 * @param {boolean} payload.allowComments
 * @param {Array} payload.media
 */
export const createQuestionService = async (payload) => {
  const response = await api.post("/q/new", payload);
  return response.data; 
};
