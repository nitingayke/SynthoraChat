import PropTypes from "prop-types";
import {
  Bookmark,
  Share2,
  Eye,
  Loader2,
  ThumbsUp,
  ArrowBigUp,
} from "lucide-react";

import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import MediaDialog from "./MediaDialog";
import CommentActions from "./CommentActions";

export default function QuestionDetail({ question }) {

  const { loginUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState({
    save: false,
    like: false,
    upvote: false,
    share: false,
  });

  const [isLiked, setIsLiked] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [answerSummary, setAnswerSummary] = useState(null);

  const {
    _id,
    author,
    title = "Untitled Question",
    content = "No description available.",
    topics = [],
    likes = [],
    upvotes = [],
    saves = [],
    views = 0,
    answers = [],
    shares = 0,
    media = [],
  } = question ?? {};

  useEffect(() => {
    setAnswerSummary(null);
  }, [_id]);

  useEffect(() => {
    if (!loginUser || !question) return;
    setIsLiked(likes.includes(loginUser._id));
    setIsUpvoted(upvotes.includes(loginUser._id));
    setIsSaved(loginUser?.savedQuestions?.includes(_id));
  }, [_id, loginUser, likes, upvotes, question]);


  const handleToggle = async (key, delay, toggleFn) => {
    if (!loginUser) return;
    setIsLoading(prev => ({ ...prev, [key]: true }));

    await new Promise(res => setTimeout(res, delay));
    toggleFn();

    setIsLoading(prev => ({ ...prev, [key]: false }));
  };

  const handleLike = () =>
    handleToggle("like", 500, () => setIsLiked(prev => !prev));

  const handleUpvote = () =>
    handleToggle("upvote", 500, () => setIsUpvoted(prev => !prev));

  const handleSave = () =>
    handleToggle("save", 600, () => setIsSaved(prev => !prev));

  const handleShare = async () => {
    setIsLoading(prev => ({ ...prev, share: true }));
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: content?.slice(0, 120),
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (err) {
      console.error(err);
    }
    setIsLoading(prev => ({ ...prev, share: false }));
  };

  if (!question) return null;

  return (
    <article>

      {/* HEADER */}
      <header>
        <h1 className="text-lg sm:text-xl font-semibold text-black dark:text-white">
          {title}
        </h1>

        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {content}
        </p>

        <MediaDialog media={media} />

        {/* TOPICS */}
        <div className="flex flex-wrap gap-2 mt-3">
          {topics.map(t => (
            <span
              key={t}
              className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-500 dark:bg-[#07C5B9]/10 dark:text-[#07C5B9] font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      {/* ACTIONS */}
      <div className="relative flex flex-nowrap items-center justify-between sm:justify-start sm:gap-2 lg:gap-4 mt-5 py-2 border-y border-gray-200 dark:border-[#2a2a2a]">

        <ActionButton
          active={isLiked}
          loading={isLoading.like}
          onClick={handleLike}
          count={likes.length}
          ActiveIcon={ThumbsUp}
          InactiveIcon={ThumbsUp}
          activeClass="text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30"
        />

        <ActionButton
          active={isUpvoted}
          loading={isLoading.upvote}
          onClick={handleUpvote}
          count={upvotes.length}
          ActiveIcon={ArrowBigUp}
          InactiveIcon={ArrowBigUp}
          activeClass="text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30"
        />

        <ActionButton
          active={isSaved}
          loading={isLoading.save}
          onClick={handleSave}
          count={saves.length}
          ActiveIcon={Bookmark}
          InactiveIcon={Bookmark}
          activeClass="text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30"
        />

        <button
          onClick={handleShare}
          disabled={isLoading.share}
          className={`
            group flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
            text-gray-600 dark:text-gray-400 transition-all duration-200
            hover:bg-gray-200 dark:hover:bg-[#212121]
            ${isLoading.share ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {isLoading.share ? <Loader2 className="animate-spin" size={18} /> : <Share2 size={18} />}
          <span className="hidden sm:flex">{shares}</span>
        </button>

        <CommentActions question={question} setAnswerSummary={setAnswerSummary} />
      </div>

      <footer className="mt-4 ">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Eye size={14} />
              {views}
            </span>
            <span>{answers.length} Answers</span>
          </div>

          {author?.profile?.firstName && (
            <Link
              to={`/main/profile/${author?.username}`}
              className="hover:text-orange-500 dark:hover:text-[#07C5B9] transition underline underline-offset-2"
            >
              By {author.profile.firstName} {author.profile.lastName}
            </Link>
          )}
        </div>

        {
          answerSummary && <div className="mt-4 rounded-xl border border-orange-300/40 dark:border-[#07C5B9]/30 bg-orange-500/10 dark:bg-[#07C5B9]/5 p-3 sm:p-5 shadow-sm">
            <h2 className="font-semibold text-orange-500 dark:text-[#07C5B9] flex items-center gap-2">
              AI Summary
            </h2>
            <p className="text-sm pt-1 whitespace-pre-wrap">
              {answerSummary}
            </p>
          </div>
        }
      </footer>
    </article>
  );
}

function ActionButton({
  active,
  loading,
  onClick,
  count,
  activeClass,
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        group flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
        ${loading ? "opacity-50 cursor-not-allowed" : ""}
        ${active ? activeClass : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#212121]"}
      `}
    >
      {loading ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <ActiveIcon
          size={18}
          fill={active ? "currentColor" : "none"}
          strokeWidth={active ? 0 : 2}
        />
      )}
      <span>{count}</span>
    </button>
  );
}

ActionButton.propTypes = {
  active: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  count: PropTypes.number,
  ActiveIcon: PropTypes.elementType.isRequired,
  activeClass: PropTypes.string,
};

QuestionDetail.propTypes = {
  question: PropTypes.object.isRequired,
};
