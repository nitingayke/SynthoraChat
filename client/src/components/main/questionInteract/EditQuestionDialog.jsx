import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide"
import { Loader2, Save, Sparkles, X } from "lucide-react";
import { getMediaType } from "../../../utils/helper";
import { getVideoDuration } from "../../../utils/videoDuration";
import { updateQuestionService } from "../../../services/question.service";
import { useSnackbar } from "notistack";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TITLE_LIMIT = 300;
const CONTENT_LIMIT = 7000;
const TOPIC_LIMIT = 10;
const MEDIA_LIMIT = 6;

const MEDIA_OPTIONS = [
    { label: "Image", accept: "image/*", type: "image" },
    { label: "Video", accept: "video/*", type: "video" },
    { label: "Audio", accept: "audio/*", type: "audio" },
    { label: "Document", accept: "*", type: "document" },
];


export default function EditQuestionDialog({ question, open, handleClose }) {

    const { enqueueSnackbar } = useSnackbar();

    const [title, setTitle] = useState(question?.title || "");
    const [content, setContent] = useState(question?.content || "");
    const [topics, setTopics] = useState(question?.topics || []);
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(false);

    const [topicInput, setTopicInput] = useState("");

    const [topicLoading, setTopicLoading] = useState(false);

    useEffect(() => {
        if (!question) return;

        setTitle(question.title || "");
        setContent(question.content || "");
        setTopics(question.topics || []);
        setMedia(question.media || [])
    }, [question]);

    const addTopic = () => {
        const t = topicInput.trim();
        if (!t || topics.includes(t)) return;
        if (topics.length >= TOPIC_LIMIT) return;

        setTopics([...topics, t]);
        setTopicInput("");
    };

    const removeTopic = (t) => {
        setTopics(topics.filter((x) => x !== t));
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

    const handleMediaUpload = async (e) => {
        const files = Array.from(e.target.files);

        for (const file of files) {
            const type = getMediaType(file);

            if (type === "video") {
                const duration = await getVideoDuration(file);
                if (duration > 240) {
                    enqueueSnackbar("Video must be under 4 minutes", { variant: "error" });
                    return;
                }
            }
        }

        if (media.length + files.length > MEDIA_LIMIT) {
            enqueueSnackbar(`Max ${MEDIA_LIMIT} files allowed`, { variant: "warning" });
            return;
        }

        const newMedia = files.map((file) => ({
            type: getMediaType(file),
            file,
            url: URL.createObjectURL(file),
        }));

        setMedia((prev) => [...prev, ...newMedia]);
    };

    const removeMedia = (index) => {
        setMedia(media.filter((_, i) => i !== index));
    };

    const handleUpdate = async () => {
        if (!title.trim() || !content.trim()) {
            enqueueSnackbar("Title and description are required", { variant: "error" });
            return;
        }

        if (topics.length > TOPIC_LIMIT) {
            enqueueSnackbar("Maximum 10 topics allowed", { variant: "warning" });
            return;
        }

        if (media.length > MEDIA_LIMIT) {
            enqueueSnackbar(`Maximum ${MEDIA_LIMIT} media files allowed`, { variant: "warning" });
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("title", title.trim());
            formData.append("content", content.trim());
            formData.append("topics", JSON.stringify(topics));

            media.forEach((m) => {
                if (m.file) {
                    formData.append("media", m.file);
                }
            });

            const res = await updateQuestionService(question._id, formData);

            enqueueSnackbar(res.message || "Question updated successfully", {
                variant: "success",
            });

            handleClose(false);
        } catch (error) {
            const msg = error?.response?.data?.message || "Failed to update question";
            enqueueSnackbar(msg, { variant: "error" });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog
            open={open}
            onClose={() => !loading && handleClose(false)}
            slots={{ transition: Transition }}
            slotProps={{
                paper: {
                    sx: {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        borderRadius: 1,
                        padding: 2,
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    },
                },
                backdrop: {
                    sx: {
                        backdropFilter: "blur(8px)",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        margin: 0
                    },
                },
            }}
            fullWidth
            fullScreen
        >
            <div className="dark:text-white h-full w-full bg-white/60 dark:bg-[#161616]/70 rounded-lg overflow-y-auto max-w-5xl">
                <div className="sticky top-0 left-0 z-50 flex justify-between items-center mb-4 w-full bg-white dark:bg-[#161616] px-4 py-3 shadow-lg">
                    <h2 className="font-semibold text-lg">Edit Question</h2>
                    <button onClick={() => !loading && handleClose(false)} title="Close" className="w-8 h-8 flex justify-center items-center rounded-full shadow-lg bg-gray-100 dark:bg-black/40 dark:text-white opacity-80 hover:opacity-100">
                        <X />
                    </button>
                </div>

                <div className="p-3 pt-0">
                    <div>
                        <label className="font-semibold dark:text-white">Title *</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={TITLE_LIMIT}
                            disabled={loading}
                            className="text-xl w-full my-1 p-3 rounded-lg bg-white dark:bg-neutral-900 dark:text-white border-2 border-gray-200 dark:border-[#222] focus:border-orange-500 dark:focus:border-[#07C5B9] outline-none disabled:cursor-not-allowed"
                        />
                        <p className="text-right text-xs">{title.length}/{TITLE_LIMIT}</p>
                    </div>

                    <div>
                        <label className="font-semibold dark:text-white">Description *</label>
                        <textarea
                            rows="6"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            maxLength={CONTENT_LIMIT}
                            disabled={loading}
                            className="w-full mt-1 p-3 rounded-lg bg-white dark:bg-neutral-900 dark:text-white border-2 border-gray-200 dark:border-[#222] focus:border-orange-500 dark:focus:border-[#07C5B9] outline-none disabled:cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="font-semibold dark:text-white">Topics</label>
                        <div className="sm:flex gap-2">
                            <input
                                value={topicInput}
                                onChange={(e) => setTopicInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addTopic()}
                                disabled={loading}
                                className="flex-1 w-full px-3 py-2.5 rounded-lg bg-white dark:bg-neutral-900 dark:text-white outline-none border-2 border-gray-200 dark:border-[#222] focus:border-orange-500 dark:focus:border-[#07C5B9] disabled:cursor-not-allowed"
                                placeholder="Add topic"
                            />
                            <div className="flex gap-2 mt-2 sm:mt-0">
                                <button onClick={addTopic} disabled={loading} className="px-4 dark:bg-[#07C5B9] bg-orange-500 text-white rounded-lg disabled:cursor-not-allowed">
                                    Add
                                </button>
                                <button
                                    onClick={generateTopicsFromAI}
                                    disabled={title?.trim()?.length === 0 || content?.trim()?.length === 0 || topicLoading || loading}
                                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold bg-orange-500 dark:bg-[#07C5B9] text-white dark:text-black w-full md:w-fit whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {topicLoading ? (
                                        <Loader2 className="animate-spin" size={18} />
                                    ) : (
                                        <Sparkles size={16} />
                                    )}
                                    {topicLoading ? "Generating..." : "Generate Topics"}
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {topics.map((t) => (
                                <span key={t} className="px-3 text-sm py-1 rounded-full bg-white/70 dark:bg-neutral-800 flex items-center gap-1">
                                    {t}
                                    <X size={14} onClick={() => !loading && removeTopic(t)} className="cursor-pointer text-red-500" />
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="flex justify-between items-center">
                            <label className="font-semibold dark:text-white">
                                Upload Media
                            </label>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {media.length}/{MEDIA_LIMIT}
                            </span>
                        </div>

                        {/* Upload options */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-2">
                            {MEDIA_OPTIONS.map((opt) => (
                                <label
                                    key={opt.label}
                                    disabled={loading}
                                    className={`cursor-pointer p-4 rounded-lg flex flex-col items-center justify-center gap-2 text-sm transition dark:border border-[#272727] disabled:cursor-not-allowed ${media.length >= MEDIA_LIMIT ? "opacity-90 cursor-not-allowed bg-gray-100 dark:bg-[#0a0a0a]" : "bg-white dark:bg-[#202020] dark:hover:bg-neutral-800"}`}
                                >
                                    <span className="font-medium">{opt.label}</span>
                                    <input
                                        type="file"
                                        accept={opt.accept}
                                        hidden
                                        multiple
                                        disabled={media.length >= MEDIA_LIMIT || loading}
                                        onChange={handleMediaUpload}
                                        className="disabled:cursor-not-allowed"
                                    />
                                </label>
                            ))}
                        </div>

                        {media.length > 0 && (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-4">
                                {media.map((m, i) => (
                                    <div
                                        key={i}
                                        className="relative group border border-gray-300 dark:border-[#202020] rounded-lg overflow-hidden bg-white/50 dark:bg-[#161616]"
                                    >
                                        {/* Remove */}
                                        <button
                                            onClick={() => removeMedia(i)}
                                            disabled={loading}
                                            className="absolute top-1 right-1 z-10 bg-red-500/80 text-white rounded-full p-1 md:opacity-0 group-hover:opacity-100 transition disabled:cursor-not-allowed"
                                        >
                                            <X size={14} />
                                        </button>

                                        {/* Preview */}
                                        {m.type === "image" && (
                                            <img
                                                src={m.url}
                                                className="w-full aspect-square object-cover"
                                            />
                                        )}

                                        {m.type === "video" && (
                                            <video
                                                src={m.url}
                                                controls
                                                className="w-full aspect-square object-cover"
                                            />
                                        )}

                                        {m.type === "audio" && (
                                            <div className="p-2">
                                                <audio controls src={m.url} className="w-full" />
                                            </div>
                                        )}

                                        {m.type === "document" && (
                                            <div className="w-full aspect-square flex items-center justify-center text-xs text-gray-600 dark:text-gray-300">
                                                Document
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                        <button
                            onClick={() => handleClose(false)}
                            disabled={loading}
                            className="px-4 py-2 rounded-lg bg-white dark:bg-[#252525] disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleUpdate}
                            disabled={loading}
                            className="px-6 py-2 rounded-lg bg-orange-500 dark:bg-[#07C5B9] text-white flex items-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Save size={16} />}
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

EditQuestionDialog.propTypes = {
    question: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};
