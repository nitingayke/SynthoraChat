import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Hash } from "lucide-react";
import { useSnackbar } from "notistack";

import FilterQuestionList from "../../components/main/questionInteract/FilterQuestionList";
import QuestionDetail from "../../components/main/questionInteract/QuestionDetail"
import AnswerList from "../../components/main/questionInteract/AnswerList";
import FeatureScreenLoader from "../../components/loader/FeatureScreenLoader";
import QuestionFilterToggle from "../../components/main/common/QuestionFilterToggle";

import { getQuestionById } from "../../services/question.service";
import SocketContext from "../../context/SocketContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function QuestionInteract() {

    const { questionId } = useParams();

    const { enqueueSnackbar } = useSnackbar();

    const { socket } = useContext(SocketContext);

    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useDocumentTitle(currentQuestion?.title ? `${currentQuestion.title}` : "Question");

    useEffect(() => {
        if (!questionId) return;

        const fetchQuestion = async (questionId) => {
            try {
                setLoading(true);
                setError(null);
                const res = await getQuestionById(questionId)
                setCurrentQuestion(res?.data?.question)
            } catch (error) {
                const msg = error?.response?.data?.message || "Failed to load question";
                setError(msg);
                enqueueSnackbar(msg, { variant: "error" });
            } finally {
                setLoading(false);
            }
        }

        fetchQuestion(questionId);
    }, [questionId, enqueueSnackbar]);

    useEffect(() => {
        if (!questionId || !socket) return;

        socket.emit("question:join", { questionId });

        return () => {
            socket.emit("question:leave", { questionId });
        };
    }, [socket, questionId]);

    useEffect(() => {
        if (!socket || !questionId) return;

        const handleQuestionUpdate = ({ questionId: updatedId, updates }) => {
            if (updatedId !== questionId) return;

            setCurrentQuestion(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    ...updates,
                };
            });
        };

        socket.on("question:update", handleQuestionUpdate);

        return () => {
            socket.off("question:update", handleQuestionUpdate);
        };
    }, [questionId, socket]);

    if (loading) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <FeatureScreenLoader />
            </div>
        )
    }

    if (questionId && !currentQuestion) {
        return (
            <div className="w-full max-w-5xl mx-auto py-12">
                <div className="text-center text-gray-600 dark:text-gray-300">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <>
            <QuestionFilterToggle />

            <div className="w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row py-4 gap-4">
                <div id="related-questions" className="h-fit w-full md:w-90">
                    <div className="md:hidden mb-2">
                        <a
                            href="#related-questions"
                            className="group inline-block"
                        >
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-1 group-hover:text-orange-500  dark:group-hover:text-[#07C5B9] transition-colors">
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
                </div>
            </div>
        </>
    )
}