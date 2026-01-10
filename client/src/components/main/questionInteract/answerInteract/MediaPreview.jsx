import PropTypes from "prop-types";
import { useState } from "react";
import { Image, Video, File, X, Maximize2, Play } from "lucide-react";

function MediaPreview({ media }) {
  const [selectedMedia, setSelectedMedia] = useState(null);

  if (!media || media.length === 0) return null;

  const getMediaIcon = (type) => {
    switch (type) {
      case "image":
        return <Image size={24} className="text-blue-500" />;
      case "video":
        return <Video size={24} className="text-green-500" />;
      default:
        return <File size={24} className="text-gray-500" />;
    }
  };

  const getFileExtension = (filename) => {
    return filename?.split('.').pop()?.toUpperCase() || "FILE";
  };

  return (
    <>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {media.map((item, index) => (
          <div
            key={index}
            className="relative group cursor-pointer"
            onClick={() => setSelectedMedia(item)}
          >
            {item.type === "image" ? (
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={item.url}
                  alt={`Media ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center">
                        <div class="text-gray-400">Failed to load</div>
                      </div>
                    `;
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ) : item.type === "video" ? (
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 relative group">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="relative">
                    <Video size={32} className="text-gray-400" />
                    <Play
                      size={16}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
                      fill="white"
                    />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  VIDEO
                </div>
              </div>
            ) : (
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center p-2">
                {getMediaIcon(item.type)}
                <span className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center truncate w-full">
                  {getFileExtension(item.filename)}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-500 mt-1 text-center truncate w-full px-1">
                  {item.filename?.length > 15
                    ? `${item.filename.substring(0, 12)}...`
                    : item.filename || "Document"}
                </span>
              </div>
            )}

            {/* Overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-black/50 rounded-full p-2">
                <Maximize2 size={16} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Screen Media Viewer */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedMedia(null);
            }}
          >
            <X size={24} />
          </button>

          <div className="max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type === "image" ? (
              <img
                src={selectedMedia.url}
                alt="Full size"
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              />
            ) : selectedMedia.type === "video" ? (
              <video
                src={selectedMedia.url}
                controls
                className="w-full h-auto max-h-[90vh] rounded-lg"
              />
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
                <div className="text-center">
                  <File size={64} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {selectedMedia.filename || "Document"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {getFileExtension(selectedMedia.filename)} Document
                  </p>
                  <a
                    href={selectedMedia.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-orange-500 hover:bg-orange-600 dark:bg-[#07C5B9] dark:hover:bg-[#06b4a8] text-white font-medium rounded-lg transition-colors"
                  >
                    Download File
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

MediaPreview.propTypes = {
  media: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(["image", "video", "audio", "document"]).isRequired,
      url: PropTypes.string.isRequired,
      filename: PropTypes.string
    })
  )
};

export default MediaPreview;