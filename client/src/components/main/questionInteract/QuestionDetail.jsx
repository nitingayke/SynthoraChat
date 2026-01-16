import PropTypes from "prop-types";
import {
  Bookmark,
  Share2,
  Eye,
  Loader2,
  ThumbsUp,
  ArrowBigUp,
} from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

import AuthContext from "../../../context/AuthContext";
import MediaDialog from "./MediaDialog";
import CommentActions from "./CommentActions";

import {
  toggleLikeQuestion,
  toggleUpvoteQuestion,
  toggleSaveQuestion,
} from "../../../services/question.service";

import { shareContent } from "../../../services/share.service";
import { formatCount } from "../../../utils/formatCount";
import { slugify } from "../../../utils/helper";
import SocketContext from "../../../context/SocketContext";
import UIStateContext from "../../../context/UIStateContext";

export default function QuestionDetail({ question }) {

  const { enqueueSnackbar } = useSnackbar();

  const { loginUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const { isAuthorize } = useContext(UIStateContext);

  const [likesArr, setLikesArr] = useState([]);
  const [upvotesArr, setUpvotesArr] = useState([]);
  const [savesArr, setSavesArr] = useState([]);
  const [loading, setLoading] = useState({
    like: false,
    upvote: false,
    save: false,
  });
  const [answerSummary, setAnswerSummary] = useState(null);

  const {
    _id,
    author,
    title,
    content,
    topics = [],
    views = 0,
    answers = [],
    shares = 0,
    media = [],
  } = question ?? {};

  useEffect(() => {
    if (!question) return;
    setLikesArr(question.likes || []);
    setUpvotesArr(question.upvotes || []);
    setSavesArr(question.saves || []);
  }, [question]);

  useEffect(() => {
    setAnswerSummary(null);
  }, [_id]);

  const handleQuestionLike = useCallback(({ questionId, userId, liked }) => {
    if (questionId !== _id) return;

    setLikesArr(prev =>
      liked
        ? prev.includes(userId) ? prev : [...prev, userId]
        : prev.filter(id => id !== userId)
    );
  }, [_id]);

  const handleQuestionUpvote = useCallback(({ questionId, userId, upvoted }) => {
    if (questionId !== _id) return;

    setUpvotesArr(prev =>
      upvoted
        ? prev.includes(userId) ? prev : [...prev, userId]
        : prev.filter(id => id !== userId)
    );
  }, [_id])

  const handleQuestionSave = useCallback(({ questionId, userId, saved, }) => {
    if (questionId !== _id) return;

    setSavesArr(prev =>
      saved
        ? prev.includes(userId) ? prev : [...prev, userId]
        : prev.filter(id => id !== userId)
    );
  }, [_id])

  useEffect(() => {
    socket.on("question:like", handleQuestionLike);
    socket.on("question:upvote", handleQuestionUpvote);
    socket.on("question:save", handleQuestionSave);

    return () => {
      socket.off("question:like", handleQuestionLike);
      socket.off("question:upvote", handleQuestionUpvote);
      socket.off("question:save", handleQuestionSave);
    }
  }, [socket, handleQuestionLike, handleQuestionUpvote, handleQuestionSave]);

  const userId = loginUser?._id;

  const handleLike = async () => {

    if (!isAuthorize() || loading.like) return;

    try {
      setLoading(p => ({ ...p, like: true }));

      await toggleLikeQuestion(_id);
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.message || "Failed to like question", { variant: "error" });
    } finally {
      setLoading(p => ({ ...p, like: false }));
    }
  };

  const handleUpvote = async () => {
    if (!isAuthorize() || loading.like) return;

    try {
      setLoading(p => ({ ...p, upvote: true }));

      await toggleUpvoteQuestion(_id);
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.message || "Failed to upvote question", { variant: "error" });
    } finally {
      setLoading(p => ({ ...p, upvote: false }));
    }
  };

  const handleSave = async () => {
    if (!isAuthorize() || loading.like) return;

    try {
      setLoading(p => ({ ...p, save: true }));

      await toggleSaveQuestion(_id);
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.message || "Failed to save question", { variant: "error" });
    } finally {
      setLoading(p => ({ ...p, save: false }));
    }
  };

  const handleShare = async () => {
    await shareContent({
      title: question.title,
      text: question.content?.slice(0, 120) || "Check out this question",
      url: window.location,
    });
  };

  if (!question) return null;

  const isLiked = likesArr.includes(userId);
  const isUpvoted = upvotesArr.includes(userId);
  const isSaved = savesArr.includes(userId);

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
            <Link
              key={t}
              to={`/main?topic=${slugify(t)}`}
              className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-500 dark:bg-[#07C5B9]/10 dark:text-[#07C5B9] font-medium"
            >
              {t}
            </Link>
          ))}
        </div>
      </header>

      {/* ACTIONS */}
      <div className="relative flex flex-nowrap items-center justify-between sm:justify-start gap-2 lg:gap-4 mt-5 py-2 border-y border-gray-200 dark:border-[#2a2a2a] overflow-x-auto scrollbar-hide">

        <ActionButton
          active={isLiked}
          loading={loading.like}
          onClick={handleLike}
          count={formatCount(likesArr.length)}
          Icon={ThumbsUp}
          activeClass="text-red-500 bg-red-500/10 border-red-500/50"
        />

        <ActionButton
          active={isUpvoted}
          loading={loading.upvote}
          onClick={handleUpvote}
          count={formatCount(upvotesArr.length)}
          Icon={ArrowBigUp}
          activeClass="text-green-500 bg-green-500/10 border-green-500/50"
        />

        <ActionButton
          active={isSaved}
          loading={loading.save}
          onClick={handleSave}
          count={formatCount(savesArr.length)}
          Icon={Bookmark}
          activeClass="text-yellow-500 bg-yellow-500/10 border-yellow-500/50"
        />

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-[#202020] border border-gray-300/60 dark:border-[#303030] hover:bg-gray-200/60 hover:dark:bg-[#252525]"
        >
          <Share2 size={18} />
          <span className="hidden sm:block">{formatCount(shares)}</span>
        </button>

        <CommentActions question={question} setAnswerSummary={setAnswerSummary} />
      </div>

      <footer className="mt-4 ">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Eye size={14} />
              {formatCount(views)}
            </span>
            <span>{answers.length} Answers</span>
          </div>

          {author?.profile?.firstName && (
            <Link
              to={`/main/u/profile/${author?.username}`}
              className="hover:text-orange-500 dark:hover:text-[#07C5B9] transition underline underline-offset-2"
            >
              By {author.profile.firstName} {author?.profile?.lastName}
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

function ActionButton({ active, loading, onClick, count, Icon, activeClass }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`flex items-center gap-1 px-3 py-1 rounded-lg border 
        ${loading ? "opacity-50" : ""}
        ${active ? activeClass : "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-[#202020] border-gray-300/60 dark:border-[#303030] hover:bg-gray-200/60 hover:dark:bg-[#252525]"}
      `}
    >
      {loading ? <Loader2 className="animate-spin" size={18} /> : <Icon size={18} />}
      <span>{count}</span>
    </button>
  );
}

ActionButton.propTypes = {
  active: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  count: PropTypes.number,
  Icon: PropTypes.elementType.isRequired,
  activeClass: PropTypes.string,
};

QuestionDetail.propTypes = {
  question: PropTypes.object.isRequired,
};
