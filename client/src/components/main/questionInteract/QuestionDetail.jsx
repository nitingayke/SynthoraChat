import PropTypes from "prop-types";
import {
  Bookmark,
  Share2,
  Loader2,
  ThumbsUp,
  ArrowBigUp,
  Pencil,
  Trash2,
} from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import AuthContext from "../../../context/AuthContext";
import MediaDialog from "./MediaDialog";
import CommentActions from "./CommentActions";

import {
  toggleLikeQuestion,
  toggleUpvoteQuestion,
  toggleSaveQuestion,
  deleteQuestion,
} from "../../../services/question.service";

import { shareContent } from "../../../services/share.service";
import { formatCount } from "../../../utils/formatCount";
import { slugify } from "../../../utils/helper";
import SocketContext from "../../../context/SocketContext";
import UIStateContext from "../../../context/UIStateContext";
import EditQuestionDialog from "./EditQuestionDialog";
import FollowActionButton from "../common/FollowActionButton";
import ExpandableText from "../common/ExpandableText";
import AIChatContext from "../../../context/AIChatContext";
import MarkdownRenderer from "../../common/MarkdownRenderer";

export default function QuestionDetail({ question }) {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { loginUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const { isAuthorize } = useContext(UIStateContext);
  const { setUserPrompt } = useContext(AIChatContext);

  const [likesArr, setLikesArr] = useState([]);
  const [upvotesArr, setUpvotesArr] = useState([]);
  const [savesArr, setSavesArr] = useState([]);
  const [loading, setLoading] = useState({
    like: false,
    upvote: false,
    save: false,
    delete: false
  });
  const [answerSummary, setAnswerSummary] = useState(null);

  const [editOpen, setEditOpen] = useState(false);

  const {
    _id,
    author,
    title,
    content,
    topics = [],
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
  const isOwner = loginUser?._id === author?._id && loginUser?.username === author?.username;
  const isEdited =
    question?.contentUpdatedAt &&
    new Date(question.contentUpdatedAt).getTime() >
    new Date(question.createdAt).getTime();


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

  const handleQuestionDelete = async () => {

    if (!isAuthorize() || loading.delete) return;

    if (!_id) {
      enqueueSnackbar("Question not found", { variant: "error" });
      return;
    }

    if (question?.author?._id !== loginUser?._id) {
      enqueueSnackbar("You are not authorize to delete this question.", { variant: "error" });
      return;
    }

    if (question?.answers?.length > 0) {
      enqueueSnackbar("You cannot delete a question that already has answers.", { variant: "warning" });
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this question? This action cannot be undone.");

    if (!confirmed) return;

    try {
      setLoading(p => ({ ...p, delete: true }));
      await deleteQuestion(_id);
      enqueueSnackbar("Question deleted successfully", { variant: "success" });
      navigate("/main");
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.message || "Failed to delete question", { variant: "error" });
    } finally {
      setLoading(p => ({ ...p, delete: false }));
    }
  }

  const handleAIAnswer = () => {

    if (!isAuthorize()) return;

    setUserPrompt(`${title}. \n${content}`);

    navigate(`/main/ai-chat`);
  }

  if (!question) return null;

  const isLiked = likesArr.includes(userId);
  const isUpvoted = upvotesArr.includes(userId);
  const isSaved = savesArr.includes(userId);

  const commCls = "p-2 rounded-md bg-gray-100 dark:bg-[#212121] text-gray-800 dark:text-white hover:bg-gray-200/80 dark:hover:bg-[#272727]";

  return (
    <>
      <article className="p-3 sm:p-0">

        {/* HEADER */}
        <header className="relative">
          <h1 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-2">
            {title}
          </h1>

          <ExpandableText text={content} lines={30} />

          <MediaDialog media={media} />

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

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">{isEdited && "(edited)"}</p>
            {
              isOwner && <div className="flex items-center gap-2">
                <button
                  className={commCls}
                  onClick={() => setEditOpen(true)}
                ><Pencil size={16} /></button>
                <button
                  onClick={handleQuestionDelete}
                  title={loading.delete ? "Deleting Question" : "Delete Question"}
                  className={`${commCls} hover:text-red-500 disabled:cursor-not-allowed`}
                  disabled={loading.delete}
                >
                  {loading.delete ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                </button>
              </div>
            }
          </div>
        </header>

        {/* ACTIONS */}
        <div className="relative flex flex-nowrap items-center justify-between sm:justify-start gap-2 lg:gap-4 mt-2 py-2 border-y border-gray-200 dark:border-[#2a2a2a] overflow-x-auto scrollbar-hide">

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

        <footer className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <button
              className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-md text-sm font-medium text-white bg-orange-500 dark:bg-[#07C5B9] hover:opacity-80 transition-all duration-200 cursor-pointer"
              onClick={handleAIAnswer}
            >
              AI Answer
            </button>

            <div className="gap-2 flex items-center">
              <FollowActionButton targetUserId={author?._id} size="xs" />

              {author?.profile?.firstName && (
                <Link
                  to={`/main/u/profile/${author?.username}`}
                  className="hover:text-orange-500 dark:hover:text-[#07C5B9] transition underline underline-offset-2"
                >
                  By {author.profile.firstName} {author?.profile?.lastName}
                </Link>
              )}
            </div>
          </div>

          {
            answerSummary && <div className="mt-4 rounded-xl border border-orange-300/40 dark:border-[#07C5B9]/30 bg-orange-500/10 dark:bg-[#07C5B9]/5 p-3 sm:p-5 shadow-sm">
              <h2 className="font-semibold text-orange-500 dark:text-[#07C5B9] flex items-center gap-2">
                AI Summary
              </h2>
              <MarkdownRenderer content={answerSummary} />
            </div>
          }
        </footer>
      </article>

      <EditQuestionDialog question={question} open={editOpen} handleClose={setEditOpen} />
    </>
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
