import React from "react";
import PropTypes from "prop-types";
import { FileText } from "lucide-react";

export default function QuestionMedia({ media }) {
    return (
        <div className="mt-3">
            <div className="flex justify-center gap-1 sm:gap-2 overflow-x-auto w-full p-1 max-h-70">

                {media?.slice(0, 4)?.map((item, index) => (
                    <div
                        key={index * 0.2548}
                        className="rounded-md flex justify-center border border-gray-400/20 dark:border-gray-700/20 bg-gray-100 dark:bg-gray-800/20 overflow-hidden"
                    >
                        {item.type === "image" && (
                            <img
                                src={item.url}
                                alt="preview"
                                className="w-auto h-full object-cover rounded-md"
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
                    </div>
                ))}
            </div>
        </div>
    );
}

QuestionMedia.propTypes = {
    media: PropTypes.array.isRequired,
};
