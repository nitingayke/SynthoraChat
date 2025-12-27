import api from "../api/api";

/**
 * Update user profile
 * @param {Object} payload
 * @param {string} payload.userId
 * @param {Object} payload.editData  // profile fields
 * @param {File} [payload.avatar]
 * @param {File} [payload.cover]
 */
export const updateProfileService = async ({
  userId,
  editData,
  avatar,
  cover,
}) => {
  const formData = new FormData();

  formData.append("userId", userId);
  formData.append("editData", JSON.stringify(editData));

  if (avatar) formData.append("avatar", avatar);
  if (cover) formData.append("cover", cover);

  const response = await api.put("/profile/update-profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/**
 * Update email
 * @param {Object} payload
 * @param {string} payload.userId
 * @param {string} payload.newEmail
 */
export const updateEmailService = async (payload) => {
  const response = await api.post("/profile/update-email", payload);
  return response.data;
};

/**
 * Update password
 * @param {Object} payload
 * @param {string} payload.userId
 * @param {string} payload.newPassword
 */
export const updatePasswordService = async (payload) => {
  const response = await api.post("/profile/update-password", payload);
  return response.data;
};