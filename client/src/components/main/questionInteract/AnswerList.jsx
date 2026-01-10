import PropTypes from "prop-types";
import { MessageCircle } from "lucide-react";
import AnswerItem from "./AnswerItem";

function AnswerList({
  answers,
  isLoading,
  currentUserId,
  onVote,
  onLike,
  onShare,
  onDelete,
  onUpdate,
  deletingAnswerId,
  showAnswerForm,
  onWriteAnswer
}) {
  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Empty state
  if (answers?.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
        <MessageCircle className="mx-auto text-gray-400 mb-3" size={48} />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No answers yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Be the first to answer this question!
        </p>
        {currentUserId && !showAnswerForm && (
          <button
            onClick={onWriteAnswer}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 dark:bg-[#07C5B9] dark:hover:bg-[#06b4a8] text-white font-medium rounded-lg transition-colors"
          >
            Write First Answer
          </button>
        )}
      </div>
    );
  }

  // Answers list
  return (
    <div className="space-y-4">
      {answers?.map((answer) => (
        <AnswerItem
          key={answer._id}
          answer={answer}
          currentUserId={currentUserId}
          onVote={onVote}
          onLike={onLike}
          onShare={onShare}
          onDelete={onDelete}
          onUpdate={onUpdate}
          isDeleting={deletingAnswerId === answer._id}
        />
      ))}
    </div>
  );
}

AnswerList.propTypes = {
  answers: PropTypes.array,
  isLoading: PropTypes.bool,
  currentUserId: PropTypes.string,
  onVote: PropTypes.func,
  onLike: PropTypes.func,
  onShare: PropTypes.func,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  deletingAnswerId: PropTypes.string,
  showAnswerForm: PropTypes.bool,
  onWriteAnswer: PropTypes.func
};

AnswerList.defaultProps = {
  answers: [],
  isLoading: false,
  showAnswerForm: false
};

export default AnswerList;