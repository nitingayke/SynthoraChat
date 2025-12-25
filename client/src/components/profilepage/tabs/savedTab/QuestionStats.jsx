import { useState } from "react";
import { Eye, ThumbsUp, MessageCircle } from "lucide-react";

const QuestionStats = ({ question, onCommentClick }) => {
  const [likes, setLikes] = useState(question.stats.upvotes);
  const [comments, setComments] = useState(question.stats.answers);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => (isLiked ? prev - 1 : prev + 1));
  };

  const handleComment = () => {
    setComments(prev => prev + 1);
    onCommentClick && onCommentClick(question); // optional callback if needed
  };

  return (
    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">

      {/* Views - no button */}
      <div className="flex items-center gap-1">
        <Eye className="w-3 h-3" />
        <span className="font-medium">{question.stats.views}</span>
      </div>

      {/* Like */}
      <button
        onClick={handleLike}
        type="button"
        className="flex items-center gap-1 hover:text-blue-500 dark:hover:text-[#07C5B9] transition-colors"
      >
        <ThumbsUp className={`w-3 h-3 ${isLiked ? "fill-current" : ""}`} />
        <span className="font-medium">{likes}</span>
      </button>

      {/* Comment */}
      <button
        onClick={handleComment}
        type="button"
        className="flex items-center gap-1 hover:text-blue-500 dark:hover:text-[#07C5B9] transition-colors"
      >
        <MessageCircle className="w-3 h-3" />
        <span className="font-medium">{comments}</span>
      </button>
    </div>
  );
};

export default QuestionStats;
