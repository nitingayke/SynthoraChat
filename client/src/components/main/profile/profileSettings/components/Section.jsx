import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
export default function Section({ icon: Icon, title, children }) {
  return (
    <div className="bg-white dark:bg-[#191919] border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-orange-500 dark:text-[#07C5B9]" />
        <h2 className="font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

Section.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};