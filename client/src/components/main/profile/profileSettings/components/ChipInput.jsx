import { useState } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

export default function ChipInput({ label, values, setValues, placeholder }) {
  const [input, setInput] = useState("");

  const addChip = () => {
    const val = input.trim();
    if (!val) return;

    const exists = values.some(
      (v) => v.toLowerCase() === val.toLowerCase()
    );
    if (exists) return;

    setValues([...values, val]);
    setInput("");
  };

  const removeChip = (index) => {
    setValues(values.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-500">{label}</p>

      <div className="flex flex-wrap gap-2">
        {values?.map((v, i) => (
          <button
            key={i * 0.25487}
            onClick={() => removeChip(i)}
            className="flex items-center gap-1 px-2 py-1 text-xs rounded-full cursor-pointer bg-orange-100 dark:bg-[#07C5B9]/20 text-orange-600 dark:text-[#07C5B9] group"
          >
            {v} <X size={16} className="group-hover:text-red-500" />
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="w-full min-w-0 px-3 py-2 rounded-lg border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#111] focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-[#07C5B9]"
        />

        <button
          onClick={addChip}
          className="w-full sm:w-auto px-4 py-2 rounded-lg
                     bg-orange-500 dark:bg-[#07C5B9]
                     text-white text-sm font-medium
                     hover:opacity-90"
        >
          Add
        </button>
      </div>
    </div>
  );
}

ChipInput.propTypes = {
  label: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  setValues: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};