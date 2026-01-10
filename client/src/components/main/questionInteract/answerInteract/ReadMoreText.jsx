import PropTypes from "prop-types";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function ReadMoreText({ text, maxLength = 500 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldTruncate = text.length > maxLength;
  const displayText = isExpanded ? text : shouldTruncate ? text.substring(0, maxLength) + "..." : text;

  return (
    <div className="relative">
      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-1">
        {displayText}
      </p>

      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-orange-500 dark:text-[#07C5B9] hover:text-orange-600 dark:hover:text-[#06b4a8] text-sm font-medium mt-1 transition-colors"
        >
          {isExpanded ? (
            <>
              Read Less
              <ChevronUp size={16} />
            </>
          ) : (
            <>
              Read More
              <ChevronDown size={16} />
            </>
          )}
        </button>
      )}
    </div>
  );
}

ReadMoreText.propTypes = {
  text: PropTypes.string.isRequired,
  maxLength: PropTypes.number
};

export default ReadMoreText;