import { Loader2, Sparkles, Pencil } from "lucide-react";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import AuthContext from "../../../context/AuthContext";

export default function CommentActions({ question, setAnswerSummary }) {

    const { loginUser } = useContext(AuthContext);
    const [isSummarizing, setIsSummarizing] = useState(false);

    const handleGenerateSummary = async () => {
        setAnswerSummary(null);
        setIsSummarizing(true);

        try {
            if (question?.aiSummary?.summary) {
                setAnswerSummary(question.aiSummary.summary)
            } else {
                await new Promise(resolve => setTimeout(resolve, 3000));
                setAnswerSummary("Working on server. try this feature latter!");
            }
        } catch (error) {
            console.error("Error generating summary:", error);
        } finally {
            setIsSummarizing(false);
        }
    };

    const handleWriteAnswer = () => {
        console.log("Open answer editor...");
    };

    const isOwner = (loginUser && loginUser?._id === question?.author?._id && loginUser?.username === question?.author?.username);

    return (
        <div className="sm:absolute right-0 flex gap-2">
            <button
                onClick={handleGenerateSummary}
                disabled={isSummarizing}
                className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-white bg-orange-500 dark:bg-[#07C5B9] hover:opacity-80 transition-all duration-200"
                title={
                    isSummarizing
                        ? "Generating AI summary… please wait"
                        : "Generate AI Summary"
                }
            >
                {isSummarizing ? (
                    <Loader2 size={18} className="animate-spin" />
                ) : (
                    <Sparkles size={18} />
                )}

                <span className="hidden md:flex">AI Summary</span>
            </button>

            {
                isOwner && <button
                    onClick={handleWriteAnswer}
                    className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-white bg-orange-500 dark:bg-[#07C5B9] hover:opacity-80 transition-all duration-200"
                    title="Write an answer for this question"
                >
                    <Pencil size={18} />
                    <span className="hidden md:flex">Answer</span>
                </button>
            }
        </div>
    );
}

CommentActions.propTypes = {
    question: PropTypes.object.isRequired,
    setAnswerSummary: PropTypes.func.isRequired
};