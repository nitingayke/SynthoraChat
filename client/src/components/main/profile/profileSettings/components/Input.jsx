import PropTypes from "prop-types";

export default function Input({ label, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-gray-500">{label}</label>
      <input
        {...props}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#111] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-[#07C5B9]"
      />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
};