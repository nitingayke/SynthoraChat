import api from "../api/api";

/**
 * Get login user profile
 */
export const fetchCurrentUser = async () => {
  const res = await api.get("/u/me");
  return res.data;
};

/**
 * Get user profile
 * @param {string} payload.identifier
 */
export const fetchUserProfile = async (identifier) => {
  const res = await api.get(`/u/profile/${identifier}`);
  return res.data;
};

/**
 * Get user's questions
 * @param {string} userId
 * @param {number} page
 * @param {number} limit
 */
export const fetchUserQuestions = async (userId, page = 1, limit = 10) => {
  const res = await api.get(`/u/profile/${userId}/questions`, {
    params: { page, limit },
  });

  return res.data;
};

/**
 * Get user's answers
 * @param {string} userId
 * @param {number} page
 * @param {number} limit
 */
export const fetchUserAnswers = async (userId, page = 1, limit = 10) => {
  const res = await api.get(`/u/profile/${userId}/answers`, {
    params: { page, limit },
  });

  return res.data;
};

/**
 * Get user's saved questions
 * @param {string} userId
 * @param {number} page
 * @param {number} limit
 */
export const fetchSavedQuestions = async (userId, page = 1, limit = 10) => {
  const res = await api.get(`/u/profile/${userId}/saved-questions`, {
    params: { page, limit },
  });

  return res.data;
};


