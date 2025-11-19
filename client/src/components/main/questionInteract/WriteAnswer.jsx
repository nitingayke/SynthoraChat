// src/components/main/questionInteract/WriteAnswer.jsx
import { useState } from "react";

export default function WriteAnswer({ question }) {
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.trim()) return;

    // placeholder - replace with real API call or context update
    setSubmitting(true);
    setTimeout(() => {
      // simulate success
      setValue("");
      setSubmitting(false);
      // optionally show toast / update context
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border p-4 bg-white dark:bg-[#070707]">
      <h3 className="font-semibold mb-2">Write an answer</h3>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Share your knowledge..."
        className="w-full min-h-[100px] p-2 rounded-md border dark:border-[#222] bg-white dark:bg-[#0b0b0b] text-sm"
      />
      <div className="flex items-center justify-between mt-3">
        <div className="text-xs text-gray-500">Be respectful — follow community rules</div>
        <div>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-1 rounded bg-[#07C5B9] text-white disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Post Answer"}
          </button>
        </div>
      </div>
    </form>
  );
}
