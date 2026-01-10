import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { X, Send, Paperclip, Smile } from "lucide-react";
import { getMediaType } from "../../../utils/helper";
import EmojiPickerDialog from "../../common/EmojiPickerDialog"

function AnswerForm({ questionId, onSubmit, isSubmitting }) {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState([]);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() || isSubmitting) return;

    try {
      // Prepare FormData
      const formData = new FormData();
      formData.append("questionId", questionId);
      formData.append("content", content.trim());

      // Append each media file
      media.forEach((item) => {
        if (item.file) {
          formData.append("media", item.file); // Note: field name is "media" (plural in route expects this)
        }
      });

      // Call parent onSubmit with FormData
      await onSubmit(formData);

      // Reset form after successful submission
      setContent("");
      setMedia([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);

    const newMedia = files.map((file) => ({
      type: getMediaType(file),
      file,
      url: URL.createObjectURL(file),
      filename: file.name,
    }));

    setMedia(prev => [...prev, ...newMedia]);
  };

  const removeMedia = (index) => {
    if (isSubmitting) return;

    // Revoke object URL to prevent memory leaks
    if (media[index].url.startsWith('blob:')) {
      URL.revokeObjectURL(media[index].url);
    }

    setMedia(prev => prev.filter((_, i) => i !== index));

    // Reset file input if all media removed
    if (media.length === 1 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePaste = (e) => {
    const items = Array.from(e.clipboardData.items);

    items.forEach(item => {
      if (item.type.indexOf("image") === 0) {
        const file = item.getAsFile();
        if (file) {
          const newMediaItem = {
            type: "image",
            file,
            url: URL.createObjectURL(file),
            filename: `pasted-${Date.now()}.png`
          };
          setMedia(prev => [...prev, newMediaItem]);
        }
      }
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Textarea with emoji support */}
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onPaste={handlePaste}
              onKeyDown={handleKeyDown}
              placeholder="Write your answer here... (You can paste images too!)"
              className="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none resize-none min-h-[120px]"
              rows="4"
              disabled={isSubmitting}
            />
          </div>

          {/* Media Preview */}
          {media.length > 0 && (
            <div className="px-4 pb-3">
              <div className="flex flex-wrap gap-2">
                {media.map((item, index) => (
                  <div key={`${index}-${item?.filename || item?.url}`} className="relative group">
                    {item?.type === "image" ? (
                      <img
                        src={item?.url}
                        alt={`Preview ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-col">
                        <Paperclip className="text-gray-500" size={24} />
                        <span className="text-xs mt-1 text-gray-600 dark:text-gray-400 truncate px-1 max-w-[80px]">
                          {item?.filename?.slice(-10) || "File"}
                        </span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeMedia(index)}
                      disabled={isSubmitting}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              {/* Media Upload Button */}
              <label className="cursor-pointer p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleMediaUpload}
                  className="hidden"
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                  disabled={isSubmitting}
                />
                <Paperclip className="text-gray-600 dark:text-gray-400" size={20} />
              </label>

              {/* Emoji Picker Button */}
              <button
                type="button"
                onClick={() => setOpenEmojiPicker(true)}
                disabled={isSubmitting}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Smile className="text-gray-600 dark:text-gray-400" size={20} />
              </button>

              {/* Media Counter */}
              {media.length > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                  {media.length} file{media.length > 1 ? 's' : ''}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!content.trim() || isSubmitting}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 dark:bg-[#07C5B9] dark:hover:bg-[#06b4a8] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Posting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Post Answer
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Emoji Picker Dialog */}
      <EmojiPickerDialog
        open={openEmojiPicker}
        onClosePicker={() => setOpenEmojiPicker(false)}
        setter={setContent} // This will append emoji to end
      />
    </>
  );
}

AnswerForm.propTypes = {
  questionId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool
};

export default AnswerForm;