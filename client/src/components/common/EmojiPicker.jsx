import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { Smile } from "lucide-react";
import EmojiPicker from 'emoji-picker-react';

function EmojiPickerComponent({ onEmojiSelect, disabled }) {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  const handleEmojiSelect = (emoji) => {
    onEmojiSelect(emoji);
    setShowPicker(false);
  };

  return (
    <div className="relative" ref={pickerRef}>
      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        disabled={disabled}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Smile className="text-gray-600 dark:text-gray-400" size={20} />
      </button>

      {showPicker && (
        <div className="absolute bottom-full mb-2 right-0 z-50">
          <EmojiPicker
            onEmojiClick={(emojiData) => handleEmojiSelect(emojiData)}
            width={300}
            height={350}
            previewConfig={{ showPreview: false }}
            theme="light"
            skinTonesDisabled
            searchDisabled={false}
          />
        </div>
      )}
    </div>
  );
}

EmojiPickerComponent.propTypes = {
  onEmojiSelect: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default EmojiPickerComponent;