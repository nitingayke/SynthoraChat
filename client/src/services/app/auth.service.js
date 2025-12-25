import api from "../../api/api";

/**
 * Signup user
 * @param {Object} payload
 * @param {string} payload.username
 * @param {string} payload.email
 * @param {string} payload.password
 */
export const signupService = async (payload) => {
  const response = await api.post("/auth/signup", payload);

  const { token } = response.data.data;

  localStorage.setItem("token", token);

  return response.data;
};

/**
 * Login user
 * @param {Object} payload
 * @param {string} payload.identifier (email or username)
 * @param {string} payload.password
 */
export const loginService = async (payload) => {
  const response = await api.post("/auth/login", payload);

  const { token } = response.data.data;

  localStorage.setItem("token", token);

  return response.data;
};
