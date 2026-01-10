import Question from "../models/Question"

export const getAllTopicsService = async () => {
    const topics = await Question.aggregate([
        
    ])
}