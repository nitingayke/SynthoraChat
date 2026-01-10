import api from "../api/api";

const answerService = {
  // Get answers for a question with pagination
  async getAnswers(questionId, params = {}) {
    const response = await api.get(`/answers/question/${questionId}`, {
      params,
    });
    return response.data;
  },

  async postAnswer(formData) {
    const response = await api.post("/answers/new", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Get single answer (make sure this is called with valid answerId)
  async getAnswerById(answerId) {
    if (!answerId || answerId === "undefined") {
      throw new Error("Invalid answer ID");
    }
    const response = await api.get(`/answers/${answerId}`);
    return response.data;
  },

  // Update an answer
  async updateAnswer(answerId, updateData) {
    const response = await api.put(`/answers/${answerId}`, updateData);
    return response.data;
  },

  // Delete an answer
  async deleteAnswer(answerId) {
    const response = await api.delete(`/answers/${answerId}`);
    return response.data;
  },

  async likeAnswer(answerId) {
    const response = await api.post(`/answers/${answerId}/like`);
    return response.data;
  },

  // Upvote an answer
  async upvoteAnswer(answerId) {
    const response = await api.post(`/answers/${answerId}/upvote`);
    return response.data;
  },

  // Add comment to answer
  async addComment(answerId, commentData) {
    const response = await api.post(
      `/answers/${answerId}/comments`,
      commentData
    );
    return response.data;
  },

  // Get answer comments
  async getComments(answerId, params = {}) {
    const response = await api.get(`/answers/${answerId}/comments`, { params });
    return response.data;
  },

  // Share an answer
  async shareAnswer(answerId) {
    const response = await api.post(`/answers/${answerId}/share`);
    return response.data;
  },

  // Delete comment
  async deleteComment(answerId, commentId) {
    const response = await api.delete(
      `/answers/${answerId}/comments/${commentId}`
    );
    return response.data;
  },

  // Search answers
  async searchAnswers(query, params = {}) {
    const response = await api.get("/answers/search", {
      params: { q: query, ...params },
    });
    return response.data;
  },

  // Get trending answers
  async getTrendingAnswers(params = {}) {
    const response = await api.get("/answers/trending", { params });
    return response.data;
  },

  // Get user's answers
  async getUserAnswers(userId, params = {}) {
    const response = await api.get(`/answers/user/${userId}`, { params });
    return response.data;
  },
};

export default answerService;
