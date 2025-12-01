import { Loader2, Sparkles, Pencil } from "lucide-react";
import { useState } from "react";

export default function CommentActions() {

    const [isSummarizing, setIsSummarizing] = useState(false);

    const handleGenerateSummary = async () => {
        setIsSummarizing(true);

        try {
            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 3000));
            console.log("Summary generated!");

        } catch (error) {
            console.error("Error generating summary:", error);
        } finally {
            setIsSummarizing(false);
        }
    };

    const handleWriteAnswer = () => {
        console.log("Open answer editor...");
    };

    return (
        <>
            <button
                onClick={handleGenerateSummary}
                disabled={isSummarizing}
                className="
                    flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                    text-white bg-[#07C5B9] z-50 
                    hover:bg-[#06b0a5]
                    transition-all duration-200
                    disabled:opacity-60 disabled:cursor-not-allowed
                "
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
                className="
          flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
          text-white dark:text-gray-200 bg-orange-500 dark:bg-orange-600 
          hover:bg-orange-600 dark:hover:bg-orange-700 transition-all duration-200 w-fit
        "
                title="Write an answer for this question"
            >
                <Pencil size={18} />
                <span className="hidden md:flex">Answer</span>
            </button>

        </>
    );
}
