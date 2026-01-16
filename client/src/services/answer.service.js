import api from "../api/api";

/**
 * Create a new answer
 * @param {FormData} formData
 * formData fields:
 * - questionId: string
 * - content: string
 * - media: File[]
 */
export const createAnswerService = async (formData) => {
  const response = await api.post("/answer/new", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/**
 * get answers by question id with pagination
 */
export const getAnswersByQuestionId = async (
  questionId,
  skip = 0,
  limit = 10
) => {
  const res = await api.get(
    `/q/${questionId}/answers?skip=${skip}&limit=${limit}`
  );
  return res.data;
};

/**
 * Edit an answer (content only)
 * @param {string} answerId
 * @param {{ content: string }} payload
 */
export const editAnswerService = async (answerId, payload) => {
  const response = await api.put(`/answer/${answerId}`, payload);
  return response.data;
};

/**
 * Delete an answer
 * @param {string} answerId
 */
export const deleteAnswerService = async (answerId) => {
  const response = await api.delete(`/answer/${answerId}`);
  return response.data;
};

/**
 * Toggle like on an answer
 * @param {string} answerId
 */
export const toggleLikeAnswerService = async (answerId) => {
  const response = await api.post(`/answer/${answerId}/likes`);
  return response.data;
};

/**
 * Toggle upvote on an answer
 * @param {string} answerId
 */
export const toggleUpvoteAnswerService = async (answerId) => {
  const response = await api.post(`/answer/${answerId}/upvotes`);
  return response.data;
};

/** 
 * Add comment to answer
 * @param { string } answerId
 * @param {{ content }} payload
 */
export const addAnswerCommentService = async (answerId, payload) => {
  const response = await api.post(`/answer/${answerId}/add-comments`, payload);
  return response.data;
}


/**
 * Toggle upvote for answer comment
 * @param { string } answerId
 * @param { string } commentId
 */
export const toggleUpvoteCommentService = async (answerId, commentId) => {
  const response = await api.post(`/answer/${answerId}/comments/${commentId}/upvotes`);
  return response.data;
}

/**
 * delete comment from answer
 * @param { string } answerId
 * @param { string } commentId
 */
export const deleteCommentService = async (answerId, commentId) => {
  const response = await api.delete(`/answer/${answerId}/comments/${commentId}`);
  return response.data;
}
