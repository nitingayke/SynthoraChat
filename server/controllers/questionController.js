import httpStatus from "http-status";

export const getAllQuestions = async (req, res) => {
  return res.status(httpStatus.OK).json({
    success: true,
    message: "Question retrieved successfully",
    data: {
        questions: [],
    }
  });
};
