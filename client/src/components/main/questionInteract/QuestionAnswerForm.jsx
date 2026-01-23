import { useState } from "react";
import PropTypes from "prop-types";
import {
    Image,
    Video,
    FileAudio,
    File,
    X,
    Loader2,
    Send,
    Smile,
} from "lucide-react";
import EmojiPickerDialog from "../../common/EmojiPickerDialog";
import { getMediaType } from "../../../utils/helper";
import { createAnswerService } from "../../../services/answer.service";
import { useSnackbar } from "notistack";
import { getVideoDuration } from "../../../utils/videoDuration";

export default function QuestionAnswerForm({
    questionId,
    questionTitle,
    setIsSubmittingAnswer,
    handleCloseAnswerDialog,
}) {

    const { enqueueSnackbar } = useSnackbar();

    const [content, setContent] = useState("");
    const [media, setMedia] = useState([]);
    const [openEmoji, setOpenEmoji] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleMediaUpload = async (e) => {
        const files = Array.from(e.target.files);

        for (const file of files) {
            const type = getMediaType(file);

            if (type === "video") {
                try {
                    const duration = await getVideoDuration(file);
                    if (duration > 240) {
                        enqueueSnackbar("Video duration must be 4 minutes or less", { variant: "error" });
                        return;
                    }
                } catch {
                    enqueueSnackbar("Failed to read video metadata", { variant: "error" });
                    return;
                }
            }
        }

        if (media.length + files.length > 4) {
            enqueueSnackbar(`Maximum ${4} media files allowed`, { variant: "warning" });
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
        if (submitting) return;
        setMedia((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmitAnswer = async () => {
        if (!content.trim()) return;

        try {
            setSubmitting(true);
            setIsSubmittingAnswer(true);

            const formData = new FormData();
            formData.append("questionId", questionId);
            formData.append("content", content.trim());

            media.forEach((m) => {
                if (m.file) {
                    formData.append("media", m.file);
                }
            });

            const res = await createAnswerService(formData);

            if (res.success) {
                setContent("");
                setMedia([]);
                handleCloseAnswerDialog();
            }
        } catch (err) {
            enqueueSnackbar(
                err?.response?.data?.message || "Failed to publish question",
                { variant: "error" }
            );
        } finally {
            setSubmitting(false);
            setIsSubmittingAnswer(false);
        }
    };

    const handleCancel = () => {
        if (submitting) return;
        handleCloseAnswerDialog();
    };

    return (
        <div className="relative bg-white dark:bg-[#191919]/50 backdrop-blur-2xl rounded-lg max-w-5xl mx-auto w-full overflow-auto">
            <div className="z-20 p-4 sticky top-0 backdrop-blur-xl bg-white dark:bg-[#191919]">
                <h3 className="text-sm text-gray-500 dark:text-gray-400">
                    Answering question
                </h3>
                <p className="font-semibold text-lg text-orange-500 dark:text-[#07C5B9] line-clamp-1">
                    {questionTitle}
                </p>

                <button
                    disabled={submitting}
                    onClick={handleCancel}
                    className="absolute top-2 right-2 bg-gray-100 dark:bg-[#202020] dark:text-white w-8 h-8 rounded-full flex items-center justify-center opacity-80 hover:opacity-100 disabled:opacity-50 border border-gray-200 dark:border-[#3c3c3c]"
                >
                    <X size={18} />
                </button>
            </div>

            <div className="p-4 pt-2 flex-1 overflow-auto">
                <div>
                    <div className="flex justify-between items-center">
                        <label className="font-semibold dark:text-white">
                            Your Answer *
                        </label>
                        <button
                            disabled={submitting}
                            onClick={() => setOpenEmoji(true)}
                            className="p-2 bg-orange-500 dark:bg-[#07C5B9] text-white rounded-lg disabled:opacity-50"
                        >
                            <Smile size={18} />
                        </button>
                    </div>

                    <textarea
                        rows={6}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write a helpful, clear answer…"
                        disabled={submitting}
                        className="w-full mt-1 p-3 rounded-lg bg-white dark:bg-neutral-900 dark:text-white border-2 border-gray-200 dark:border-[#222] focus:border-orange-500 dark:focus:border-[#07C5B9] outline-none disabled:cursor-not-allowed"
                    />
                </div>

                <div className="mt-4">
                    <label className="font-semibold dark:text-white">
                        Attach Media (optional)
                    </label>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                        {[
                            { label: "Image", icon: <Image size={18} />, accept: "image/*" },
                            { label: "Video", icon: <Video size={18} />, accept: "video/*" },
                            { label: "Audio", icon: <FileAudio size={18} />, accept: "audio/*" },
                            { label: "Document", icon: <File size={18} />, accept: "*" },
                        ].map((item) => (
                            <label
                                key={item.label}
                                className={`cursor-pointer p-3 rounded-lg flex flex-col items-center gap-2 text-sm dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-800 border ${media.length >= 4 ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-[#0a0a0a] border-gray-200 dark:border-[#1a1a1a]' : 'bg-gray-100 dark:bg-neutral-900 border-gray-300 dark:border-[#252525]'}`}
                            >
                                {item.icon}
                                {item.label}
                                {media.length >= 4 && (
                                    <span className="text-xs text-red-500">(Max reached)</span>
                                )}
                                <input
                                    type="file"
                                    accept={item.accept}
                                    multiple
                                    className="hidden"
                                    onChange={handleMediaUpload}
                                    disabled={media.length >= 4 || submitting}
                                />
                            </label>
                        ))}
                    </div>

                    <div className="z-10 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3 mt-4">
                        {media.map((m, i) => (
                            <div key={i * 0.2546} className="relative border h-fit rounded-lg border-gray-300 dark:border-gray-700 overflow-hidden">
                                <button
                                    onClick={() => removeMedia(i)}
                                    disabled={submitting}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                >
                                    <X size={16} />
                                </button>

                                {m.type === "image" && (
                                    <img src={m.url} className="w-full aspect-square object-cover" />
                                )}
                                {m.type === "video" && (
                                    <video src={m.url} controls className="w-full" />
                                )}
                                {m.type === "audio" && (
                                    <audio src={m.url} controls className="w-full" />
                                )}
                                {m.type === "document" && (
                                    <div className="p-3 text-xs dark:text-white">
                                        Document attached
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex items-center gap-2">
                    <button
                        onClick={handleSubmitAnswer}
                        disabled={submitting || !content.trim()}
                        className="flex-1 flex items-center justify-center gap-2 bg-orange-500 dark:bg-[#07C5B9] text-white font-semibold py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                        Post Answer
                    </button>

                    <button
                        onClick={handleCancel}
                        disabled={submitting}
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-[#333] dark:text-white disabled:opacity-50 bg-gray-100 dark:bg-[#161616] disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                </div>

                <EmojiPickerDialog
                    open={openEmoji}
                    onClosePicker={() => setOpenEmoji(false)}
                    setter={setContent}
                />
            </div>
        </div>
    );
}

QuestionAnswerForm.propTypes = {
    questionId: PropTypes.string.isRequired,
    questionTitle: PropTypes.string.isRequired,
    setIsSubmittingAnswer: PropTypes.func.isRequired,
    handleCloseAnswerDialog: PropTypes.func.isRequired,
};
