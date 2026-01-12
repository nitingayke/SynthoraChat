import { useEffect, useRef, useState } from "react";

export default function ExpandableText({ text, lines = 5 }) {
  const textRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;

    const el = textRef.current;

    // Force reflow to get correct height
    requestAnimationFrame(() => {
      setIsOverflowing(el.scrollHeight > el.clientHeight);
    });
  }, [text, lines]);

  return (
    <div className="text-sm text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
      <div
        ref={textRef}
        style={
          isExpanded
            ? {}
            : {
              display: "-webkit-box",
              WebkitLineClamp: lines,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }
        }
        className="transition-all duration-300"
      >
        {text}
      </div>

      {isOverflowing && (
        <div className="flex justify-end items-center h-fit">
          <button
            onClick={() => setIsExpanded((p) => !p)}
            className="mt-1 text-xs font-medium text-orange-500 dark:text-[#07C5B9] hover:underline"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        </div>
      )}
    </div>
  );
}
