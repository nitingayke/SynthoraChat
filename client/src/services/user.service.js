import api from "../api/api";

export const fetchCurrentUser = async() => {
  const res = await api.get("/u/me");
  return res.data;
}

/**
 * Get user profile
 * @param {string} payload.identifier
 */
export const fetchUserProfile = async (identifier) => {
  const res = await api.get(`/u/profile/${identifier}`);
  return res.data;
};
