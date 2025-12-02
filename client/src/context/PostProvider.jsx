import { useMemo, useState } from "react";
import PostContext from "./PostContext";

export function PostProvider({ children }) {

    const [title, setTitle] = useState(localStorage?.getItem("draft_title") || "");
    const [content, setContent] = useState(localStorage?.getItem("draft_content") || "");
    const [topics, setTopics] = useState(() => {
        return JSON.parse(localStorage.getItem("draft_topics") || "[]");
    });
    const [media, setMedia] = useState([]);
    const [allowComments, setAllowComments] = useState(true);


    const TITLE_LIMIT = 120;
    const CONTENT_LIMIT = 7000;
    const TOPIC_LIMIT = 10;
    const MEDIA_LIMIT = 7;

    const values = useMemo(() => ({
        title,
        setTitle,
        content,
        setContent,
        topics,
        setTopics,
        media,
        setMedia,
        TITLE_LIMIT,
        CONTENT_LIMIT,
        TOPIC_LIMIT,
        MEDIA_LIMIT,
        allowComments,
        setAllowComments
    }), [content, media, topics, title, allowComments]);

    return (
        <PostContext.Provider value={values}>
            {children}
        </PostContext.Provider>
    );
}
