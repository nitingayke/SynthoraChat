import { useContext } from "react";
import FilterQuestionList from "../../components/main/questionInteract/FilterQuestionList";
import QuestionContext from "../../context/QuestionContext";
import QuestionDetail from "../../components/main/questionInteract/QuestionDetail"
import { useParams } from "react-router-dom";
import AnswerList from "../../components/main/questionInteract/AnswerList";
import ScreenLoader from "../../components/loader/ScreenLoader";

export default function QuestionInteract() {

    const { questionId } = useParams();
    const { questions, loadingQuestions } = useContext(QuestionContext);

    if (loadingQuestions) {
        return (
            <ScreenLoader />
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
            <div className="flex-1 space-y-3 rounded-lg border p-3 sm:p-4 bg-white dark:bg-[#161616] border-gray-300 dark:border-[#2a2a2a] transition h-fit">
                <QuestionDetail question={currentQuestion} />

                <AnswerList question={currentQuestion} />

                <br />
            </div>
        </div>
    )
}