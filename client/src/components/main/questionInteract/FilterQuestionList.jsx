import { useContext, useState } from "react";
import QuestionContext from "../../../context/QuestionContext";
import { Link, useParams } from "react-router-dom";
import { ArrowUp, Bookmark, Eye, Share2, ThumbsUp } from "lucide-react";

export default function FilterQuestionList() {

    const { questionId } = useParams();
    const { filteredQuestions } = useContext(QuestionContext);

    const [visibleCount, setVisibleCount] = useState(15);


    return (
        <div className="w-full space-y-3 p-3 sm:p-0">
            {filteredQuestions?.slice(0, visibleCount).map((q) => {
                const isActive = q?._id === questionId;

                return (
                    <Link
                        key={q?._id}
                        to={`/main/questions/${q?._id}`}
                        className={`
                            block rounded-xl p-3 transition-all cursor-pointer group border 
                            ${isActive
                                ? "border-[#07C5B9]/40 bg-[#07C5B9]/7 dark:bg-[#07C5B9]/5"
                                : "bg-white dark:bg-[#161616] dark:hover:bg-[#1c1c1c] border-gray-300 dark:border-[#2a2a2a]"
                            }
                        `}
                    >
                        {/* Title */}
                        <h2 className={`font-semibold text-base group-hover:text-[#07C5B9] transition-colors line-clamp-2 ${isActive ? "text-[#07C5B9]" : "dark:text-white"}`}>
                            {q?.title || "Untitled Question"}
                        </h2>

                        {/* Content Preview */}
                        <p className="text-sm mt-1 text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                            {q?.content?.trim()
                                ? q.content
                                : "No description available..."}
                        </p>

                        {/* Status + Answer Count */}
                        <div className="flex items-center gap-2 mt-2">
                            <span
                                className="text-[10px] px-2 py-1 rounded-full bg-[#07C5B9]/10 text-[#07C5B9]"
                            >
                                {q?.status || "active"}
                            </span>

                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {(q?.answers?.length ?? 0) + " answers"}
                            </span>
                        </div>

                        {/* Stats Row */}
                        <div className="flex items-center flex-wrap gap-4 mt-3 text-xs 
                                        text-gray-600 dark:text-gray-300">

                            <div className="flex items-center gap-1">
                                <ArrowUp size={14} />
                                {q?.upvotes?.length ?? 0}
                            </div>

                            <div className="flex items-center gap-1">
                                <ThumbsUp size={14} />
                                {q?.likes?.length ?? 0}
                            </div>

                            <div className="flex items-center gap-1">
                                <Bookmark size={14} />
                                {q?.saves?.length ?? 0}
                            </div>

                            <div className="flex items-center gap-1">
                                <Eye size={14} />
                                {q?.views ?? 0}
                            </div>

                            <div className="flex items-center gap-1">
                                <Share2 size={14} />
                                {q?.shares ?? 0}
                            </div>
                        </div>
                    </Link>
                );
            })}

            {(visibleCount < filteredQuestions.length) && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => setVisibleCount(prev => prev + 15)}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-all text-[#07c5b8b9] hover:text-[#09dfd1] cursor-pointer"
                    >
                        Load More Questions
                    </button>
                </div>
            )}

        </div>
    );
}
