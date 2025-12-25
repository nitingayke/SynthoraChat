import api from "../api/api";

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

/**
 * Google Sign-In/Sign-Up
 * @param {string} googleToken - Google ID token from credentialResponse.credential
 */
export const googleLoginService = async (idToken) => {
  const response = await api.post("/auth/google", { idToken });

  const { token } = response.data.data;
  localStorage.setItem("token", token);

  return response.data;
};

/**
 * Verify logged-in user
 * @param {string} userId
 */
export const verifyUserService = async (userId) => {
  const response = await api.post("/auth/verify-user", {
    userId,
  });

  return response.data;
};