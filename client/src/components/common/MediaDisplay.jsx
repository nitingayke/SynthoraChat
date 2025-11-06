import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Play, Image } from "lucide-react";

export default function MediaDisplay({
  src,
  type = "image",
  alt = "",
  className = "",
  autoPlay = true,
  loop = true,
  muted = true,
}) {
  if (!src) return null;

  const isVideo = type === "video";

  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden shadow-2xl ${className}`}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        {isVideo ? (
          <video
            src={src}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline
            className="w-full h-full object-cover rounded-2xl"
          />
        ) : (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover rounded-2xl"
            loading="lazy"
          />
        )}
      </div>

      {/* Type Indicator */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
          {isVideo ? (
            <>
              <Play className="w-4 h-4" />
              <span>Video</span>
            </>
          ) : (
            <>
              <Image className="w-4 h-4" />
              <span>Image</span>
            </>
          )}
        </div>
      </div>

      {/* Light Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 pointer-events-none rounded-2xl" />
    </motion.div>
  );
}

MediaDisplay.propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["image", "video"]),
  alt: PropTypes.string,
  className: PropTypes.string,
  autoPlay: PropTypes.bool,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
};

MediaDisplay.defaultProps = {
  type: "image",
  alt: "",
  className: "",
  autoPlay: true,
  loop: true,
  muted: true,
};
