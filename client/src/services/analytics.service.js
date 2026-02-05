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

/**
 * fetch active user
 */
export const fetchActiveUsers = async () => {
  const res = await api.get("/app/active-users");
  return res.data;
};
