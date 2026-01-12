import { Link } from "react-router-dom";
import { Search, Hash } from "lucide-react";
import { useContext, useMemo } from "react";
import UIStateContext from "../../context/UIStateContext";
import { filterSuggestions } from "../../utils/search";
import QuestionContext from "../../context/QuestionContext";
import useDebounce from "../../hooks/useDebounce";

export default function SearchSuggest() {

    const { questions, newQuestions, filterOptions } = useContext(QuestionContext);
    const { searchQuery } = useContext(UIStateContext);

    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const allSuggestions = useMemo(() => {

        const questionSuggestions = [
            ...(newQuestions ?? []),
            ...(questions ?? [])
        ]
            .filter(q => q?._id && q?.title)
            .map(q => ({
                title: q.title,
                link: `/main/questions/${q._id}`,
                type: "question",
            }));

        const topicSuggestions = (filterOptions ?? [])
            .filter(item => item?.link?.startsWith("topic="))
            .map(item => ({
                title: item.label,
                link: `/main?${item.link}`,
                type: "topic",
            }));

        const merged = [...questionSuggestions, ...topicSuggestions];

        const uniqueMap = new Map();
        merged.forEach(item => {
            uniqueMap.set(item.title.toLowerCase(), item);
        });

        return Array.from(uniqueMap.values()).sort((a, b) =>
            a.title.localeCompare(b.title)
        );
    }, [questions, newQuestions, filterOptions]);

    const filteredSuggestions = useMemo(
        () => filterSuggestions(allSuggestions, debouncedSearchQuery),
        [debouncedSearchQuery, allSuggestions]
    );

    if (!debouncedSearchQuery || debouncedSearchQuery.length < 2) return null;

    return (
        <div className="absolute z-50 top-13 w-full px-2 sm:px-4">
            <div className="w-full max-w-5xl mx-auto max-h-[calc(100vh-120px)] h-full overflow-y-auto rounded-xl border border-gray-200 dark:border-[#383838] bg-white dark:bg-[#202020] shadow-lg scrollbar-hide">

                {filteredSuggestions.length === 0 && (
                    <div className="px-4 py-6 text-sm text-center text-gray-500 dark:text-gray-400">
                        No results found
                    </div>
                )}

                {filteredSuggestions.slice(0, 12).map((item, index) => {
                    const isTopic = item?.type === "topic";

                    return (
                        <Link
                            key={`${item.type}-${index}`}
                            to={item.link}
                            className="flex items-center gap-3 px-4 py-3 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2a2a2a] active:bg-gray-200 dark:active:bg-[#333] transition-colors"
                        >
                            <div className="flex-shrink-0">
                                {isTopic ? (
                                    <Hash size={16} className="text-blue-500" />
                                ) : (
                                    <Search size={16} className="text-orange-500" />
                                )}
                            </div>

                            <p className="flex-1 text-gray-800 dark:text-gray-200 line-clamp-1">
                                {item.title}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );

}
