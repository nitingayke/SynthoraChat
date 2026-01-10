import { useContext } from "react";
import FilterQuestionList from "../../components/main/questionInteract/FilterQuestionList";
import QuestionContext from "../../context/QuestionContext";
import QuestionDetail from "../../components/main/questionInteract/QuestionDetail"
import { useParams } from "react-router-dom";
import AnswerList from "../../components/main/questionInteract/AnswerList";
import ScreenLoader from "../../components/loader/ScreenLoader";
import QuestionFilterToggle from "../../components/main/common/QuestionFilterToggle";
import { Hash } from "lucide-react";

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
        <>
            <QuestionFilterToggle />

            <div className="w-full max-w-5xl mx-auto flex flex-col-reverse md:flex-row py-4 gap-4">
                <div id="related-questions" className="h-fit w-full md:w-[35%]">
                    <div className="md:hidden mb-2">
                        <a
                            href="#related-questions"
                            className="group inline-block"
                        >
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 
                       flex items-center gap-1
                       group-hover:text-orange-500 
                       dark:group-hover:text-[#07C5B9]
                       transition-colors">
                                <Hash
                                    size={20}
                                    className="opacity-70 group-hover:opacity-100"
                                />
                                <span>Related Questions</span>
                            </h3>
                        </a>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Based on this question
                        </p>
                    </div>


                    <FilterQuestionList />
                </div>
                <div className="flex-1 space-y-3 rounded-lg border p-3 sm:p-4 bg-white dark:bg-[#161616] border-gray-300 dark:border-[#2a2a2a] transition h-fit">
                    <QuestionDetail question={currentQuestion} />

                    <AnswerList question={currentQuestion} />

                    <br />
                </div>
            </div>
        </>
    )
}