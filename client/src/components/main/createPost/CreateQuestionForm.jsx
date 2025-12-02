import { useContext, useEffect, useState } from "react";
import { Image, Video, FileAudio, File, X, Sparkles, Send, Loader2, Trash2, Smile } from "lucide-react";
import PostContext from "../../../context/PostContext";
import EmojiPickerDialog from "../../common/EmojiPickerDialog"
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function CreateQuestionForm() {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { title, setTitle, content, setContent, topics, setTopics, media, setMedia, setAllowComments, allowComments, TITLE_LIMIT, CONTENT_LIMIT, TOPIC_LIMIT } = useContext(PostContext);

    const [topicInput, setTopicInput] = useState("");
    const [duplicateTopic, setDuplicateTopic] = useState("");
    const [topicLoading, setTopicLoading] = useState(false);
    const [openEmoji, setOpenEmoji] = useState(false);


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

        setTopicLoading(true);

        setTimeout(() => {
            const generated = ["AI", "JavaScript", "Web", "React Native"];
            setTopics(generated);
            setTopicLoading(false);
        }, 5000);
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

    const handleDiscardPost = () => {
        setTitle("");
        setContent("");
        setTopics([]);
        setMedia([]);
        enqueueSnackbar('This is check', { variant: 'success' });
        navigate(-1);
    }

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
                <div className="flex justify-between items-center">
                    <label htmlFor="description" className="font-semibold text-lg dark:text-white">Description *</label>
                    <button onClick={() => setOpenEmoji(true)} className="p-2 bg-orange-500 dark:bg-[#07C5B9] text-white rounded-lg cursor-pointer">
                        <Smile size={18} />
                    </button>
                </div>
                <textarea
                    id="description"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Explain your question in detail. What have you tried? What help do you need?"
                    rows="10"
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
                        disabled={title?.length === 0 || content?.length === 0 || topicLoading}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold  bg-orange-500 dark:bg-[#07C5B9] text-white dark:text-black w-full md:w-fit whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {topicLoading ? (
                            <Loader2 className="animate-spin" size={18} />
                        ) : (
                            <Sparkles size={16} />
                        )}
                        {topicLoading ? "Generating..." : "Generate Topics"}
                    </button>

                </div>
                <div className="flex justify-end pt-1">
                    <p className={`text-[10px] ${topics?.length > TOPIC_LIMIT && "text-red-500"}`}>{topics?.length}/{TOPIC_LIMIT}</p>
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

            <div className="flex justify-between items-center p-4 bg-white dark:bg-neutral-900 rounded-lg">
                <div className="md:flex items-center md:gap-2">
                    <label
                        htmlFor="allowCommentsToggle"
                        className="font-semibold text-neutral-900 dark:text-white block"
                    >
                        Allow Comments
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {allowComments ? "Comments will be allowed on answers." : "Comments will be disabled for answers."}
                    </p>
                </div>

                <button
                    id="allowCommentsToggle"
                    type="button"
                    role="switch"
                    aria-checked={allowComments}
                    aria-label={allowComments ? "Allow comments enabled" : "Allow comments disabled"}
                    onClick={() => setAllowComments(prev => !prev)}
                    className={`relative inline-flex items-center h-6 w-12 rounded-full p-1 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-300 dark:focus-visible:ring-[#07C5B9]/40 ${allowComments ? "bg-orange-500 dark:bg-[#07C5B9]" : "bg-gray-200 dark:bg-neutral-700"}`}
                >
                    <span
                        className={`bg-white dark:bg-neutral-100 h-4 w-4 rounded-full shadow transform transition-transform duration-200 ${allowComments ? "translate-x-6" : "translate-x-0"}`}
                    />
                </button>
            </div>

            <div className="flex items-center mt-6 gap-2">
                <button
                    className="w-full bg-orange-500 dark:bg-[#07C5B9] text-white font-semibold py-3 rounded-lg hover:opacity-90 flex items-center justify-center gap-2"
                    onClick={handleSubmit}
                >
                    <Send size={18} />
                    Publish Question
                </button>

                <button 
                onClick={handleDiscardPost} 
                className="flex items-center gap-2 bg-red-500 p-3 rounded-lg hover:opacity-80"
                >
                    <Trash2 size={18} />
                    <span>Discard</span>
                </button>
            </div>

            <EmojiPickerDialog open={openEmoji} onClosePicker={() => setOpenEmoji(false)} setter={setContent} />
        </>
    );
}
