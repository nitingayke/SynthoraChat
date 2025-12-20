import api from "../../api/api";

/**
 * Get user profile
 * @param {string} payload.identifier
 */

export const fetchUserProfile = async (identifier) => {
  const res = await api.get(`/u/profile/${identifier}`);
  return res.data;
};