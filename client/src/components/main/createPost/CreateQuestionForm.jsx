import { useEffect, useState } from "react";
import { Image, Video, FileAudio, File, Plus, X, Sparkles, Send } from "lucide-react";

export default function CreateQuestionForm() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [topics, setTopics] = useState([]);
    const [topicInput, setTopicInput] = useState("");
    const [media, setMedia] = useState([]);
    const [duplicateTopic, setDuplicateTopic] = useState("");

    const TITLE_LIMIT = 120;
    const CONTENT_LIMIT = 7000;
    const TOPIC_LIMIT = 6;
    const TOPIC_TEXT_LIMIT = 20;
    const MEDIA_LIMIT = 7;

    useEffect(() => {
        const savedTitle = localStorage.getItem("draft_title");
        const savedContent = localStorage.getItem("draft_content");
        const savedTopics = JSON.parse(localStorage.getItem("draft_topics") || "[]");

        if (savedTitle) setTitle(savedTitle);
        if (savedContent) setContent(savedContent);
        if (savedTopics.length > 0) setTopics(savedTopics);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem("draft_title", title);
            localStorage.setItem("draft_content", content);
        }, 500);

        return () => clearTimeout(timeout);
    }, [title, content]);

    useEffect(() => {
        localStorage.setItem("draft_topics", JSON.stringify(topics));
    }, [topics]);

    const getMediaType = (file) => {
        if (file.type.startsWith("image")) return "image";
        if (file.type.startsWith("video")) return "video";
        if (file.type.startsWith("audio")) return "audio";
        return "document";
    };

    const handleMediaUpload = (e) => {
        const files = Array.from(e.target.files);

        const newMedia = files.map((file) => ({
            type: getMediaType(file),
            file,
            url: URL.createObjectURL(file),
        }));

        setMedia((prev) => [...prev, ...newMedia]);
    };

    const addTopic = () => {
        const topic = topicInput.trim();

        if (topic === "") return;

        if (topics.includes(topic)) {
            setDuplicateTopic(topic);
            setTimeout(() => setDuplicateTopic(""), 500);
            return;
        }

        setTopics((prev) => [...prev, topic]);
        setTopicInput("");
    };

    const removeTopic = (topic) => {
        setTopics(topics.filter((t) => t !== topic));
    };

    const generateTopicsFromAI = async () => {
        if (!title && !content) return;

        const prompt = `Suggest 4-6 short topics for this question:\nTitle: ${title}\nDescription: ${content}`;

        const generated = ["AI", "JavaScript", "Web", "React Native"];
        setTopics(generated);
    };

    const handleSubmit = () => {
        if (!title.trim()) return alert("Title is required!");

        const payload = {
            title,
            content,
            topics,
            media
        };

        console.log("Question submitted:", payload);
        alert("Your question has been created!");

        setTitle("");
        setContent("");
        setTopics([]);
    };

    return (
        <>
            <div className="mb-2">
                <label htmlFor="title" className="font-semibold text-lg dark:text-white">Title *</label>
                <input
                    id="title"
                    maxLength={300}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Write a clear and descriptive question title..."
                    className={`text-xl w-full mt-1 p-3 rounded-lg bg-white dark:bg-neutral-900 dark:text-white outline-none`}
                />
                <div className="flex justify-end pt-1">
                    <p className={`text-[10px] ${title?.length > TITLE_LIMIT && "text-red-500"}`}>{title?.length}/{TITLE_LIMIT}</p>
                </div>
            </div>

            <div>
                <label htmlFor="description" className="font-semibold text-lg dark:text-white">Description</label>
                <textarea
                    id="description"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Explain your question in detail. What have you tried? What help do you need?"
                    rows="6"
                    className="w-full mt-1 p-3 rounded-lg bg-white dark:bg-neutral-900 dark:text-white outline-none"
                ></textarea>
                <div className="flex justify-end pt-1">
                    <p className={`text-[10px] ${content?.length > CONTENT_LIMIT && "text-red-500"}`}>{content?.length}/{CONTENT_LIMIT}</p>
                </div>
            </div>

            <div className="mt-2">
                <label htmlFor="topic" className="font-semibold text-lg dark:text-white">Topics</label>

                <div className="flex flex-wrap md:flex-nowrap gap-3 mt-1">
                    <div className="flex flex-1 flex-nowrap gap-3">
                        <input
                            id="topic"
                            value={topicInput}
                            onChange={(e) => setTopicInput(e.target.value)}
                            placeholder="Add a topic (example: React, AI)..."
                            className="w-auto flex-1 px-3 py-2.5 rounded-lg bg-white dark:bg-neutral-900 dark:text-white outline-none"
                        />
                        <button
                            onClick={addTopic}
                            className="px-4 py-2  rounded-lg text-white dark:text-black 
                                   bg-orange-500 dark:bg-[#07C5B9] font-semibold"
                        >
                            Add
                        </button>
                    </div>

                    <button
                        onClick={generateTopicsFromAI}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold 
                                bg-orange-500 dark:bg-[#07C5B9] text-white dark:text-black w-full md:w-fit whitespace-nowrap"
                    >
                        <Sparkles size={16} /> Generate Topics
                    </button>
                </div>

                <div className="flex gap-2 flex-wrap mt-2 w-full">
                    {topics.map((t) => (
                        <div
                            key={t}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm dark:text-white group ${duplicateTopic === t ? "bg-red-500" : "bg-gray-200 dark:bg-neutral-900"}`}
                        >
                            <span className="break-all">{t}</span>
                            <X
                                size={16}
                                className="group-hover:text-red-600 cursor-pointer"
                                onClick={() => removeTopic(t)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-5">
                <label className="font-semibold text-lg dark:text-white">Upload Media</label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-1">
                    {[
                        { label: "Image", icon: <Image size={18} />, accept: "image/*" },
                        { label: "Video", icon: <Video size={18} />, accept: "video/*" },
                        { label: "Audio", icon: <FileAudio size={18} />, accept: "audio/*" },
                        { label: "Document", icon: <File size={18} />, accept: "*" }
                    ].map((item) => (
                        <label
                            key={item.label}
                            className="cursor-pointer p-4 rounded-xl bg-white dark:bg-neutral-900 
                                       flex flex-col items-center justify-center gap-2 
                                       text-sm dark:text-white hover:bg-gray-200
                                       dark:hover:bg-neutral-800 transition"
                        >
                            {item.icon}
                            {item.label}
                            <input
                                type="file"
                                accept={item.accept}
                                className="hidden"
                                multiple
                                onChange={handleMediaUpload}
                            />
                        </label>
                    ))}
                </div>

                {/* Media Preview */}
                <div className="flex flex-wrap gap-4 mt-4">
                    {media.map((m, i) => (
                        <div key={i * 0.14587} className="relative">
                            <X
                                size={20}
                                className="absolute -top-2 -right-2 bg-red-500 text-white 
                                           rounded-full p-1 cursor-pointer"
                                onClick={() => setMedia(media.filter((_, index) => index !== i))}
                            />
                            {m.type === "image" && (
                                <img src={m.url} className="w-24 h-24 rounded-lg object-cover border" />
                            )}
                            {m.type === "video" && (
                                <video src={m.url} className="w-24 h-24 rounded-lg border" />
                            )}
                            {m.type === "audio" && (
                                <audio controls src={m.url} className="w-40" />
                            )}
                            {m.type === "document" && (
                                <div className="p-3 border rounded-lg w-24 h-24 flex items-center justify-center text-xs dark:text-white">
                                    Document
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <button
                className="mt-6 w-full bg-orange-500 dark:bg-[#07C5B9] text-white 
               font-semibold py-3 rounded-lg hover:opacity-90 flex items-center justify-center gap-2"
                onClick={handleSubmit}
            >
                <Send size={18} />
                Publish Question
            </button>
        </>
    );
}
