import httpStatus from "http-status";
import Question from "../models/Question.js";

export const getAllQuestions = async (req, res) => {

  const questions = await Question.find({});

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Question retrieved successfully",
    data: {
      questions,
    },
  });
};

export const createQuestion = async (req, res) => {
  return res.status(httpStatus.OK).json({
    success: true,
    message: "Question created successfully",
    data: {
      questionId: "xyz",
    },
  });
};
