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
 * @param {number} cursor
 * @param {number} limit
 */
export const fetchUserQuestions = async (userId, cursor, limit = 10) => {
  const res = await api.get(`/u/profile/${userId}/questions`, {
    params: {
      limit,
      cursor,
    },
  });

  return res.data;
};

/**
 * Get user's answers
 * @param {string} userId
 * @param {string|null} cursor
 * @param {number} limit
 */
export const fetchUserAnswers = async (userId, cursor, limit = 10) => {
  const res = await api.get(`/u/profile/${userId}/answers`, {
    params: {
      limit,
      cursor,
    },
  });

  return res.data;
};

/**
 * Get user's saved questions
 * @param {string} userId
 * @param {string} cursor // date
 * @param {number} limit
 */
export const fetchSavedQuestions = async (userId, cursor, limit = 10) => {
  const res = await api.get(`/u/profile/${userId}/saved-questions`, {
    params: {
      limit,
      cursor, // savedAt cursor
    },
  });

  return res.data;
};

/**
 * Follow user
 * @param {string} userId
 */
export const followUser = async (userId) => {
  const res = await api.post(`/u/follow/${userId}`);
  return res.data;
};

/**
 * UnFollow user
 * @param {string} userId
 */
export const unfollowUser = async (userId) => {
  const res = await api.delete(`/u/unfollow/${userId}`);
  return res.data;
};

export const markAllNotificationReadService = async () => {
  const res = await api.post(`/u/notifications/mark-all-read`);
  return res.data;
};
