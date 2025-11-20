import React from "react";
import PropTypes from "prop-types";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom"

export default function QuestionMedia({ media, questionId }) {
    return (
        <div className="mt-3">
            <div className="relative flex justify-center gap-1 sm:gap-2 overflow-x-auto w-full p-1 max-h-70">

                <button className="absolute top-2 right-3 text-sm px-3 py-0.5 rounded-2xl bg-white dark:bg-[#161616] z-30">{media.length}</button>

                {media?.slice(0, 1)?.map((item, index) => (
                    <Link
                        key={index * 0.2548}
                        to={`/main/questions/${questionId}`}
                        className="rounded-md flex justify-center border border-gray-400/20 dark:border-gray-700/20 bg-gray-100 dark:bg-gray-800/20 overflow-hidden"
                    >
                        {item?.type === "image" && (
                            <img
                                src={item?.url}
                                alt="preview"
                                className="w-fit h-full object-cover rounded-md hover:scale-105 transition-transform duration-300"
                            />
                        )}

                        {item.type === "video" && (
                            <video
                                src={item.url}
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

                        {item.type === "audio" && (
                            <audio
                                controls
                                src={item.url}
                                className="w-[90%]"
                            />
                        )}

                        {item.type === "document" && (
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center gap-1 text-sm text-gray-700 dark:text-gray-300"
                            >
                                <FileText size={40} />
                                <span>Document</span>
                            </a>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
}

QuestionMedia.propTypes = {
    media: PropTypes.array.isRequired,
    questionId: PropTypes.string.isRequired
};
