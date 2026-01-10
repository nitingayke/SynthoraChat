import { useContext, useEffect, useState } from "react";
import FilterQuestionList from "../../components/main/questionInteract/FilterQuestionList";
import QuestionContext from "../../context/QuestionContext";
import QuestionDetail from "../../components/main/questionInteract/QuestionDetail"
import { useParams } from "react-router-dom";
import AnswerList from "../../components/main/questionInteract/AnswerList";
import ScreenLoader from "../../components/loader/ScreenLoader";
import { getQuestionById } from "../../services/question.service";
import QuestionInteractSkeleton from "../../components/loader/QuestionInteractSkeleton";
import PostAnswer from "../../components/main/questionInteract/AnswerForm";

export default function QuestionInteract() {

    const { questionId } = useParams();
    const { questions, loadingQuestions } = useContext(QuestionContext);
    const [loading, setLoading] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(null)

    const fetchQuestion = async (questionId) => {
        try {
            setLoading(true);
            const res = await getQuestionById(questionId);

            if (res?.success) {
                setCurrentQuestion(res.question); // store in state
            } else {
                console.log("Failed to fetch question");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (questionId) {
            fetchQuestion(questionId);
        }
    }, [questionId]);


    // if (loadingQuestions || loading) {
    //     return (
    //         <ScreenLoader />
    //     )
    // }

    if (!questions || questions?.length === 0) {
        return (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-sm">
                No questions found
            </div>
        );
    }


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
        <div className="w-full max-w-5xl mx-auto flex gap-4 py-4 h-[calc(100vh-64px)]">

            {/* Sidebar */}
            <div className="hidden md:block w-[35%] h-full overflow-y-auto no-scrollbar dark:border-[#2a2a2a]">
                <FilterQuestionList />
            </div>


            {/* Main content */}
            {loadingQuestions || loading ? (
                <div className="flex-1 h-full overflow-y-auto">
                    <QuestionInteractSkeleton />
                </div>
            ) : (
                    <div className="flex-1 h-full overflow-y-auto no-scrollbar space-y-3 rounded-lg border p-3 sm:p-4 bg-white dark:bg-[#161616] border-gray-300 dark:border-[#2a2a2a] transition">
                        <QuestionDetail question={currentQuestion} />

                        {/* <PostAnswer questionId={currentQuestion?._id} /> */}

                        <AnswerList question={currentQuestion} />
                    </div>

            )}
        </div>


    )
}