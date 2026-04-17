import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import QuestionContext from "./QuestionContext"
import SocketContext from "./SocketContext";
import { getAllQuestionsService, getAllTopics } from "../services/question.service";
import { slugify } from "../utils/helper";

const QUESTION_PAGE_LIMIT = 10;

export const QuestionProvider = ({ children }) => {

    const { socket } = useContext(SocketContext);

    const [questions, setQuestions] = useState([]);
    const [loadingQuestions, setLoadingQuestions] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const [newQuestions, setNewQuestions] = useState([]);

    const [hasMore, setHasMore] = useState(true);
    const [cursor, setCursor] = useState(null);

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

    const loadQuestions = useCallback(async (userFilter, topic, reset = false, userId = null) => {
        if (loadingQuestions || (!hasMore && !reset)) return;

        if (reset) {
            setCursor(null); 
            setHasMore(true);
            setQuestions([]);
            setLoadingQuestions(true);
        } else {
            setLoadingMore(true);
        }

        try {
            const res = await getAllQuestionsService({
                limit: QUESTION_PAGE_LIMIT,
                filter: userFilter || "latest",
                topic,
                cursor: reset ? null : cursor,
                userId
            });

            const fetchedQuestions = res.data.questions;

            if (reset) {
                setQuestions(fetchedQuestions);
            } else {
                setQuestions((prev) => {
                    const map = new Map();

                    [...prev, ...fetchedQuestions].forEach(q => {
                        map.set(q._id, q);
                    });

                    return Array.from(map.values());
                });
            }

            setCursor(res.data.nextCursor);
            setHasMore(res.data.hasNextPage);
        } catch (error) {
            console.error("Failed to load questions:", error);
        } finally {
            setLoadingQuestions(false);
            setLoadingMore(false);
        }
    }, [hasMore, loadingQuestions, cursor]);

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
        loadingMore,
        newQuestions,
        setNewQuestions,
        hasMore,
        setCursor,
        loadQuestions,
    }), [questions, loadingTopics, filterOptions, loadingQuestions, loadingMore, newQuestions, hasMore, loadQuestions]);

    return (
        <QuestionContext.Provider value={values}>
            {children}
        </QuestionContext.Provider>
    )
}