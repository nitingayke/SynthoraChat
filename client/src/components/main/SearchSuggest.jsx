import { Link, useLocation } from "react-router-dom";
import { Search, Hash } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";
import UIStateContext from "../../context/UIStateContext";
import QuestionContext from "../../context/QuestionContext";
import { searchQuestionsService } from "../../services/question.service";

const SEARCH_DISABLED_ROUTES = [
    "/main/u/profile"
];

export default function SearchSuggest() {

    const location = useLocation();
    const { filterOptions } = useContext(QuestionContext);
    const { debouncedSearchQuery } = useContext(UIStateContext);

    const [backendResults, setBackendResults] = useState([]);

    // normalize query once (✅ safe)
    const query = debouncedSearchQuery?.toLowerCase() || "";

    useEffect(() => {
        const fetchSearch = async () => {
            if (!query || query.length < 2) {
                setBackendResults([]);
                return;
            }

            try {
                const res = await searchQuestionsService(query);
                setBackendResults(res.data.questions || []);
            } catch {
                setBackendResults([]);
            }
        };

        fetchSearch();
    }, [query]);

    const topicSuggestions = useMemo(() => {
        return (filterOptions ?? [])
            .filter(item => item?.link?.startsWith("topic="))
            .filter(item =>
                item?.label?.toLowerCase().includes(query)
            )
            .map(item => ({
                title: item.label,
                link: `/main?${item.link}`,
                type: "topic",
            }));
    }, [filterOptions, query]);

    const mergedSuggestions = useMemo(() => {

        const questionSuggestions = backendResults.map(q => ({
            title: q.title,
            link: `/main/questions/${q._id}`,
            type: "question",
        }));

        const merged = [...questionSuggestions, ...topicSuggestions];

        const uniqueMap = new Map();
        merged.forEach(item => {
            uniqueMap.set(item.title.toLowerCase(), item);
        });

        return Array.from(uniqueMap.values()).slice(0, 12);

    }, [backendResults, topicSuggestions]);

    const isSearchDisabled = SEARCH_DISABLED_ROUTES.some(route =>
        location.pathname.startsWith(route)
    );

    if (isSearchDisabled) return null;
    if (!query || query.length < 2) return null;
    if (mergedSuggestions.length === 0) return null;

    return (
        <div className="absolute z-50 top-13 w-full px-2 sm:px-4">
            <div className="w-full max-w-5xl mx-auto max-h-[calc(100vh-120px)] overflow-y-auto rounded-xl border border-gray-200 dark:border-[#383838] bg-white dark:bg-[#202020] shadow-lg">

                {mergedSuggestions.map((item, index) => {
                    const isTopic = item.type === "topic";

                    return (
                        <Link
                            key={`${item.type}-${index}`}
                            to={item.link}
                            className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
                        >
                            {isTopic ? (
                                <Hash size={16} className="text-blue-500" />
                            ) : (
                                <Search size={16} className="text-orange-500" />
                            )}

                            <p className="flex-1 line-clamp-1 text-gray-800 dark:text-gray-200">
                                {item.title}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}