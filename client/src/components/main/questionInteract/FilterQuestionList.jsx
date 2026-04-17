import { useContext, useEffect } from "react";
import QuestionContext from "../../../context/QuestionContext";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowUp, Bookmark, Eye, Share2, ThumbsUp } from "lucide-react";
import AuthContext from "../../../context/AuthContext";

export default function FilterQuestionList() {

    const [searchParams] = useSearchParams();
    const filter = searchParams.get("filter");
    const topic = searchParams.get("topic");


    const { questionId } = useParams();
    const { questions,
        loadingMore,
        hasMore,
        loadQuestions,
        loadingQuestions
    } = useContext(QuestionContext);
    const { loginUser } = useContext(AuthContext);

    useEffect(() => {

        if (filter === "recommended" && !loginUser?._id) {
            return;
        }

        const fetchData = async () => {
            await loadQuestions(filter, topic, true, loginUser?._id);
        };

        fetchData();

    }, [filter, topic, loginUser?._id]);

    const handleLoadMore = () => {
        loadQuestions(filter, topic, false, loginUser?._id);
    }

    if(loadingQuestions) {
        return (
            <div className="rounded-lg bg-white dark:bg-[#191919] p-6 border border-gray-200 dark:border-[#222222] flex items-center justify-center">
                <span className="animate-pulse">Loading...</span>
            </div>
        )
    }

    return (
        <div className="w-full space-y-4">
            {questions?.map((q) => {
                const isActive = q?._id === questionId;

                return (
                    <Link
                        key={q?._id}
                        to={`/main/questions/${q?._id}`}
                        className={`
                            block rounded-lg p-3 transition-all cursor-pointer group border 
                            ${isActive
                                ? "border-orange-500 dark:border-[#07C5B9]/20 bg-orange-50 dark:bg-[#07C5B9]/5"
                                : "bg-white dark:bg-[#161616] hover:bg-gray-50 dark:hover:bg-[#1c1c1c] border-gray-300 dark:border-[#2a2a2a]"
                            }
                        `}
                    >
                        {/* Title */}
                        <h2 className={`font-semibold text-base group-hover:text-orange-500 dark:group-hover:text-[#07C5B9] transition-colors line-clamp-2 ${isActive ? "text-orange-500 dark:text-[#07C5B9]" : "dark:text-white"}`}>
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
                                className="text-[10px] px-2 py-1 rounded-full text-orange-500 bg-orange-100 dark:bg-[#07C5B9]/10 dark:text-[#07C5B9]"
                            >
                                {q?.status || "active"}
                            </span>

                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {(q?.answers?.length ?? 0) + " answers"}
                            </span>
                        </div>

                        {/* Stats Row */}
                        <div className="flex items-center flex-wrap gap-4 mt-3 text-xs text-gray-600 dark:text-gray-300">

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

            {
                hasMore && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleLoadMore}
                            disabled={loadingMore || loadingQuestions}
                            className="px-5 py-2 flex items-center gap-1 bg-orange-500 dark:bg-[#07C5B9] text-white rounded-lg cursor-pointer"
                        >
                            {loadingMore ? (
                                <>
                                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                                    <span>Loading...</span>
                                </>
                            ) : (
                                "Load More"
                            )}
                        </button>
                    </div>
                )
            }

        </div>
    );
}
