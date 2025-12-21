import { useContext } from "react";
import FilterQuestionList from "../../components/main/questionInteract/FilterQuestionList";
import QuestionContext from "../../context/QuestionContext";
import QuestionDetail from "../../components/main/questionInteract/QuestionDetail"
import { useParams } from "react-router-dom";
import AnswerList from "../../components/main/questionInteract/AnswerList";

export default function QuestionInteract() {

    const { questionId } = useParams();
    const { questions, loadingQuestions } = useContext(QuestionContext);

    if (loadingQuestions) {
        return (
            <div className="w-full max-w-5xl mx-auto flex py-10 justify-center items-center h-full">
                <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full border-4 w-8 h-8 border-y-orange-500 dark:border-y-[#07C5B9] border-x-0"></div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                        Loading...
                    </p>
                </div>
            </div>
        )
    }

    if (!questions || questions.length === 0) {
        return (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-sm">
                No questions found
            </div>
        );
    }

    const currentQuestion = questionId ? questions.find((q) => q?._id === questionId) : questions[0];

    if (questionId && !currentQuestion) {
        return (
            <div className="w-full max-w-5xl mx-auto py-12">
                <div className="text-center text-gray-600 dark:text-gray-300">
                    Question not found.
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto flex py-4 gap-4">
            <div className="h-fit hidden md:block w-70 md:w-[35%] sticky bottom-4 self-start">
                <FilterQuestionList />
            </div>
            <div className="flex-1 space-y-3 rounded-xl border p-3 sm:p-4 bg-white dark:bg-[#161616] border-gray-300 dark:border-[#2a2a2a] transition">
                <QuestionDetail question={currentQuestion} />

                <AnswerList question={currentQuestion} />

                <br />
            </div>
        </div>
    )
}