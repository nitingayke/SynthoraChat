import React, { useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function QuestionMedia({ media }) {

    const [open, setOpen] = useState(false);
    const [activeMedia, setActiveMedia] = useState(-1);

    if (!media || media.length === 0) return null;

    const openDialog = (idx) => {
        setActiveMedia(idx);
        setOpen(true);
    };

    const handleImageUpdate = (status) => {
        setActiveMedia((prev) => {
            return (prev + status + media.length) % media.length;
        });
    };

    return (
        <>
            {/* Media Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                {media.map((m, index) => (
                    <button
                        key={index * 0.7458}
                        className="rounded-lg overflow-hidden cursor-pointer group relative border border-gray-300 dark:border-[#222]"
                        onClick={() => openDialog(index)}
                    >
                        {/* IMAGE THUMBNAIL */}
                        {m.type === "image" && (
                            <img
                                src={m.url}
                                alt="media"
                                className="w-full h-32 sm:h-40 object-cover group-hover:scale-[1.03] transition"
                            />
                        )}

                        {/* VIDEO THUMBNAIL */}
                        {m.type === "video" && (
                            <video
                                src={m.url}
                                className="w-auto h-full object-cover rounded-md"
                                loop
                                playsInline
                                onMouseEnter={(e) => e.target.play()}
                                onMouseLeave={(e) => e.target.pause()}
                                disablePictureInPicture
                                controlsList="nofullscreen noplaybackrate nodownload"
                                controls
                            />
                        )}

                        {/* AUDIO BLOCK */}
                        {m.type === "audio" && (
                            <div className="flex items-center justify-center h-32 bg-gray-200 dark:bg-[#111] text-sm text-gray-700 dark:text-gray-300">
                                🎵 Audio File
                            </div>
                        )}

                        {/* DOCUMENT BLOCK */}
                        {m.type === "document" && (
                            <div className="flex items-center justify-center h-32 bg-gray-200 dark:bg-[#111] text-sm text-gray-700 dark:text-gray-300 px-2 text-center">
                                📄 Document File
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Dialog Viewer */}
            <Dialog
                open={open && activeMedia !== -1}
                onClose={() => setOpen(false)}
                slots={{ transition: Transition }}
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: "transparent",
                            boxShadow: "none",
                            borderRadius: 1,
                            overflow: "hidden",
                        },
                    },
                }}
                fullWidth
                fullScreen
            >
                <div className="w-fit flex items-center mx-auto rounded-md h-full">
                    {/* IMAGE */}
                    {media[activeMedia]?.type === "image" && (
                        <img
                            src={media[activeMedia]?.url}
                            alt="full"
                            className="max-h-[85vh] w-auto object-contain rounded-md"
                        />
                    )}

                    {/* VIDEO */}
                    {media[activeMedia]?.type === "video" && (
                        <video
                            src={media[activeMedia]?.url}
                            controls
                            autoPlay
                            className="max-h-[85vh] w-auto object-contain rounded-md"
                        />
                    )}

                    {/* AUDIO */}
                    {media[activeMedia]?.type === "audio" && (
                        <audio
                            controls
                            autoPlay
                            className="w-full bg-white p-4 rounded-lg"
                        >
                            <source src={media[activeMedia]?.url} />
                        </audio>
                    )}

                    {/* DOCUMENT */}
                    {media[activeMedia]?.type === "document" && (
                        <iframe
                            src={media[activeMedia]?.url}
                            className="w-full h-[85vh] rounded-md bg-white"
                            title="Document Viewer"
                        ></iframe>
                    )}
                </div>

                <button onClick={() => setOpen(false)} className="w-8 h-8 flex justify-center items-center rounded-full hover:bg-black/60 bg-black/40 absolute top-3 right-3 opacity-90 text-gray-100 hover:opacity-100 hover:text-white">
                    <X />
                </button>

                <button
                    onClick={() => handleImageUpdate(-1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/60 transition"
                >
                    <ArrowLeft />
                </button>

                <button
                    onClick={() => handleImageUpdate(1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/60 transition"
                >
                    <ArrowRight />
                </button>

            </Dialog>
        </>
    );
}

QuestionMedia.propTypes = {
    media: PropTypes.array.isRequired,
};
