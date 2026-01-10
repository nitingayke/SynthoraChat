import React, { useContext, useState } from "react";
import { Loader2, Sparkles, Pencil, X } from "lucide-react";
import PropTypes from "prop-types";
import AuthContext from "../../../context/AuthContext";
import UIStateContext from "../../../context/UIStateContext";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import QuestionAnswerForm from "./QuestionAnswerForm";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CommentActions({ question, setAnswerSummary }) {

    const { loginUser } = useContext(AuthContext);
    const { setOpenLoginDialog } = useContext(UIStateContext);

    const [isSummarizing, setIsSummarizing] = useState(false);
    const [openAnswerDialog, setOpenAnswerDialog] = useState(false);
    const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);


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
        if (!loginUser) {
            setOpenLoginDialog(true);
            return;
        }

        setOpenAnswerDialog(true);
    };

    const handleCloseAnswerDialog = () => {
        if (isSubmittingAnswer) return;
        setOpenAnswerDialog(false);
    };


    return (
        <>
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

                <button
                    onClick={handleWriteAnswer}
                    disabled={isSubmittingAnswer}
                    className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-white bg-orange-500 dark:bg-[#07C5B9] hover:opacity-80 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-80"
                    title={isSubmittingAnswer ? "Submitting Answer..." : "Write an answer for this question"}
                >
                    {isSubmittingAnswer ? <Loader2 size={20} className="animate-spin" /> : <Pencil size={18} />}
                    <span className="hidden md:flex">Answer</span>
                </button>

            </div>

            <Dialog
                open={openAnswerDialog}
                onClose={handleCloseAnswerDialog}
                slots={{ transition: Transition }}
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: "transparent",
                            boxShadow: "none",
                            borderRadius: 1,
                            padding: 2,
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        },
                    },
                }}
                fullWidth
                fullScreen
            >
                <QuestionAnswerForm questionId={question._id} questionTitle={question.title} setIsSubmittingAnswer={setIsSubmittingAnswer} handleCloseAnswerDialog={handleCloseAnswerDialog} />
            </Dialog>
        </>
    );
}

CommentActions.propTypes = {
    question: PropTypes.object.isRequired,
    setAnswerSummary: PropTypes.func.isRequired
};