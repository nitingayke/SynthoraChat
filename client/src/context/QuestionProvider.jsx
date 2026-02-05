import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import QuestionContext from "./QuestionContext"
import SocketContext from "./SocketContext";
import { getAllQuestionsService, getAllTopics } from "../services/question.service";
import { slugify } from "../utils/helper";

const QUESTION_PAGE_LIMIT = 20;

export const QuestionProvider = ({ children }) => {

    const { socket } = useContext(SocketContext);

    const [questions, setQuestions] = useState([]);
    const [loadingQuestions, setLoadingQuestions] = useState(false);
    const [newQuestions, setNewQuestions] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const loadOnce = useRef(false); 

    const [filterOptions, setFilterOptions] = useState([]);
    const [loadingTopics, setLoadingTopics] = useState(false);

    const filter = useMemo(() => [
        {
            label: "Latest",
            link: "filter=latest"
        },
        {
            label: "Trending",
            link: "filter=trending"
        },
        {
            label: "For You / Recommended",
            link: "filter=recommended"
        },
    ], []);

    const loadQuestions = useCallback(async(nextPage = 1) => {
        if(loadingQuestions || !hasMore) return;

        setLoadingQuestions(true);

        try {
            const res = await getAllQuestionsService(nextPage, QUESTION_PAGE_LIMIT);
            const fetchedQuestions = res.data.questions;
           
            setQuestions((prev) => [...prev, ...fetchedQuestions]);
            setPage(nextPage);
            setHasMore(nextPage < res.data.pagination.totalPages);
        } catch (error) {
            console.error("Failed to load questions:", error);
        } finally {
            setLoadingQuestions(false);
        }
    }, [hasMore, loadingQuestions]);

    useEffect(() => {
        if (!loadOnce.current) {
            loadQuestions(1);
            loadOnce.current = true;
        }
    }, [loadQuestions]);

    const loadTopics = useCallback(async () => {
        try {
            setLoadingTopics(true);
            const res = await getAllTopics();

            const topicFilters = res.data.topics.map((topic) => ({
                label: topic
                    .split(" ")
                    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" "),
                link: `topic=${slugify(topic)}`
            }));

            setFilterOptions([...filter, ...topicFilters]);
        } catch (error) {
            console.error("Failed to load topics", error);
        } finally {
            setLoadingTopics(false);
        }
    }, [filter]);

    useEffect(() => {
        loadTopics();
    }, [loadTopics]);

    // ------------- socket messages -------------------
    const handleNewQuestion = useCallback((data) => {
        const { question } = data;
        if (!question?._id) return;

        setNewQuestions((prev) => [question, ...prev]);
    }, []);

    useEffect(() => {
        socket.on("question:new", handleNewQuestion);

        return () => {
            socket.off("question:new", handleNewQuestion);
        }
    }, [socket, handleNewQuestion]);

    const values = useMemo(() => ({
        questions,
        setQuestions,
        loadingTopics,
        filterOptions,
        loadingQuestions,
        newQuestions,
        setNewQuestions,
        hasMore,
        page,
        setPage,
        loadQuestions
    }), [questions, loadingTopics, filterOptions, loadingQuestions, newQuestions, hasMore, loadQuestions, page]);

    return (
        <QuestionContext.Provider value={values}>
            {children}
        </QuestionContext.Provider>
    )
}