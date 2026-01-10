import api from "../api/api";

/**
 * Get all questions (paginated)
 * @param {number} page - current page
 * @param {number} limit - number of questions per page
 */
export const getAllQuestionsService = async (page = 1, limit = 20) => {
  const response = await api.get("/q", {
    params: { page, limit },
  });
  return response.data;
};

/**
 * Create a new question
 * @param {FormData} formData
 * formData fields:
 * - title: string
 * - content: string
 * - topics[]: string[]
 * - allowComments: boolean
 * - media: File[]
 */
export const createQuestionService = async (formData) => {
  const response = await api.post("/q/new", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getQuestionById = async (id) => {
   const response = await api.get("/q/getQuestionById", {
     params: { id },
   });

   return response.data;
}

export const toggleLikeQuestion = async (questionId, userId) => {
  const res = await api.post("/q/like", {
    questionId,
    userId,
  });
  return res.data;
};

export const toggleUpvoteQuestion = async (questionId, userId) => {
  const res = await api.post("/q/upvote", {
    questionId,
    userId,
  });
  return res.data;
};

export const toggleSaveQuestion = async (questionId, userId) => {
  const res = await api.post("/q/save", {
    questionId,
    userId,
  });
  return res.data;
};


