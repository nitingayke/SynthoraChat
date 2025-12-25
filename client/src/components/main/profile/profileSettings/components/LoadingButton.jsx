import PropTypes from 'prop-types';

export default function LoadingButton({ loading, label, ...props }) {
  return (
    <button {...props} disabled={loading}>
      {loading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Processing...
        </span>
      ) : (
        label
      )}
    </button>
  );
}

LoadingButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};
