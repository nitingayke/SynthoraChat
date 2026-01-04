import api from "../api/api";

/**
 * app analytics
 * @param {string} days
 */
export const fetchAnalytics = async (days = 30) => {
  const res = await api.get(`/app/analytics`, {
    params: { days },
  });
  return res.data;
};
