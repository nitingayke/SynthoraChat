import PropTypes from "prop-types";
import {
  Bookmark,
  Share2,
  Eye,
  Loader2,
  ThumbsUp,
  ArrowBigUp,
  MessageCircle,
} from "lucide-react";

import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import AnswerForm from "./AnswerForm";
import AnswerItem from "./AnswerItem";
import MediaDialog from "./MediaDialog";
import CommentActions from "./CommentActions";
import { toggleLikeQuestion, toggleUpvoteQuestion, toggleSaveQuestion } from "../../../services/question.service";
import answerService from "../../../services/answer.service"
import { useSnackbar } from "notistack";
import AnswerList from "./AnswerList";

export default function QuestionDetail({ question }) {

  const { loginUser } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  // Loading states for question like, save , upvote and share.
  const [isLoading, setIsLoading] = useState({
    save: false,
    like: false,
    upvote: false,
    share: false,
  });

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
    // answers = [],
    shares = 0,
    media = [],
  } = question ?? {};

  //Question like status and count .
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes?.length);

  //Question upvote status and count .
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvotesCount, setUpvotesCount] = useState(upvotes?.length);

  //Question save status and count .
  const [isSaved, setIsSaved] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [savesCount, setSavesCount] = useState(saves?.length);

  const [answerSummary, setAnswerSummary] = useState(null);

  const [answers, setAnswers] = useState([]);
  const [isLoadingAnswers, setIsLoadingAnswers] = useState(false);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  const [deletingAnswerId, setDeletingAnswerId] = useState(null);


  useEffect(() => {
    setLikesCount(likes.length);
  }, [likes?.length, _id]);

  useEffect(() => {
    setUpvotesCount(upvotes.length);
  }, [upvotes?.length, _id]);

  useEffect(() => {
    setSavesCount(saves.length);
  }, [saves?.length, _id]);


  useEffect(() => {
    setAnswerSummary(null);
  }, [_id]);

  useEffect(() => {
    if (!loginUser || !question) return;
    setIsLiked(likes?.includes(loginUser?._id));
    setIsUpvoted(upvotes?.includes(loginUser?._id));
    setIsSaved(
      loginUser?.savedQuestions?.some(
        sq => sq?.question?.toString() === _id
      )
    );
  }, [_id, loginUser, likes, upvotes, question]);

  // Fetch answers when question changes
  useEffect(() => {
    const fetchAnswers = async () => {
      setIsLoadingAnswers(true);
      try {
        const response = await answerService.getAnswers(question._id);
        setAnswers(response.data);
      } catch (error) {
        console.error("Error fetching answers:", error);
      } finally {
        setIsLoadingAnswers(false);
      }
    };

    if (question?._id) {
      fetchAnswers();
    }
  }, [question?._id]);

// Answer interaction api's
  const handleSubmitAnswer = async (formData) => {
    if (!loginUser) {
      enqueueSnackbar("Please login to post an answer", { variant: "warning" });
      return;
    }

    setIsSubmittingAnswer(true);

    try {
      // Make sure content type is set for FormData
      const response = await answerService.postAnswer(formData);

      if (response.success) {
        // Add new answer to the list (response.data should be the full populated answer)
        if (response.data) {
          setAnswers(prev => [response.data, ...prev]);
        }

        // Reset form
        setShowAnswerForm(false);

        // Show success message
        enqueueSnackbar("Answer posted successfully!", { variant: "success" });
      } else {
        throw new Error(response.message || "Failed to post answer");
      }
    } catch (error) {
      console.error("Error posting answer:", error);
      enqueueSnackbar(
        error?.response?.data?.message || error.message || "Failed to post answer",
        { variant: "error" }
      );
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  const handleDeleteAnswer = async (answerId) => {
    if (!loginUser) {
      enqueueSnackbar("Please login to delete answer", { variant: "warning" });
      return;
    }

    setDeletingAnswerId(answerId);

    try {
      const response = await answerService.deleteAnswer(answerId);

      if (response.success) {
        // Remove answer from list
        setAnswers(prev => prev.filter(answer => answer._id !== answerId));
        enqueueSnackbar("Answer deleted successfully", { variant: "success" });
      } else {
        throw new Error(response.message || "Failed to delete answer");
      }
    } catch (error) {
      console.error("Error deleting answer:", error);
      enqueueSnackbar(
        error?.response?.data?.message || error.message || "Failed to delete answer",
        { variant: "error" }
      );
    } finally {
      setDeletingAnswerId(null);
    }
  };

  const handleUpdateAnswer = async (answerId, updateData) => {
    if (!loginUser) {
      enqueueSnackbar("Please login to edit answer", { variant: "warning" });
      return;
    }

    try {
      const response = await answerService.updateAnswer(answerId, updateData);

      if (response.success) {
        // Update answer in list
        setAnswers(prev => prev.map(answer =>
          answer._id === answerId ? { ...answer, ...response.data, updatedAt: new Date() } : answer
        ));
        return response;
      } else {
        throw new Error(response.message || "Failed to update answer");
      }
    } catch (error) {
      console.error("Error updating answer:", error);
      enqueueSnackbar(
        error?.response?.data?.message || error.message || "Failed to update answer",
        { variant: "error" }
      );
      throw error;
    }
  };

  const handleAnswerUpvote = async (answerId, type) => {
    try {
      if (type === "upvote") {
        await answerService.upvoteAnswer(answerId);
      }
      // ... other vote types
    } catch (error) {
      console.error("Error voting:", error);
      // Rollback optimistic update
    }
  };

  const handleAnswerLike = async (answerId) => {
    try {
      await answerService.likeAnswer(answerId);
    } catch (error) {
      console.error("Error liking answer:", error);
      // Rollback optimistic update
    }
  };

  const handleAnswerShare = async (answerId) => {
    try {
      await answerService.shareAnswer(answerId);
    } catch (error) {
      console.error("Error sharing answer:", error);
    }
  };

  const handleLike = async () => {
    if (!loginUser || isLoading.like) return;

    // optimistic UI update
    const prevLiked = isLiked;
    setIsLiked(!prevLiked);
    setLikesCount(prev => (prevLiked ? prev - 1 : prev + 1));

    setIsLoading(prev => ({ ...prev, like: true }));

    try {
      await toggleLikeQuestion(_id, loginUser._id);
    } catch (error) {
      // rollback if API fails
      setIsLiked(prevLiked);
      setLikesCount(prev => (prevLiked ? prev + 1 : prev - 1));
      console.error(error);
    } finally {
      setIsLoading(prev => ({ ...prev, like: false }));
    }
  };

  const handleQuestionUpvote = async () => {
    if (!loginUser || isLoading.upvote) return;

    // optimistic UI
    const prevUpvoted = isUpvoted;
    setIsUpvoted(!prevUpvoted);
    setUpvotesCount(prev => (prevUpvoted ? prev - 1 : prev + 1));

    setIsLoading(prev => ({ ...prev, upvote: true }));

    try {
      await toggleUpvoteQuestion(_id, loginUser._id);
    } catch (error) {
      // rollback
      setIsUpvoted(prevUpvoted);
      setUpvotesCount(prev => (prevUpvoted ? prev + 1 : prev - 1));
      console.error(error);
    } finally {
      setIsLoading(prev => ({ ...prev, upvote: false }));
    }
  };

  const handleQuestionSave = async () => {
    if (!loginUser || isLoading.save) return;

    // optimistic UI
    const prevSaved = isSaved;
    setIsSaved(!prevSaved);
    setSavesCount(prev => (prevSaved ? prev - 1 : prev + 1));

    setIsLoading(prev => ({ ...prev, save: true }));

    try {
      await toggleSaveQuestion(_id, loginUser._id);
    } catch (error) {
      // rollback on failure
      setIsSaved(prevSaved);
      setSavesCount(prev => (prevSaved ? prev + 1 : prev - 1));
      console.error(error);
    } finally {
      setIsLoading(prev => ({ ...prev, save: false }));
    }
  };

  const handleQuestionShare = async () => {
    setIsLoading(prev => ({ ...prev, share: true }));
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: content?.slice(0, 120),
          url: globalThis.location.href,
        });
      } else {
        await navigator.clipboard.writeText(globalThis.location.href);
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
          count={likesCount}
          ActiveIcon={ThumbsUp}
          activeClass="text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30"
        />


        <ActionButton
          active={isUpvoted}
          loading={isLoading.upvote}
          onClick={handleQuestionUpvote}
          count={upvotesCount}
          ActiveIcon={ArrowBigUp}
          activeClass="text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30"
        />


        <ActionButton
          active={isSaved}
          loading={isLoading.save}
          onClick={handleQuestionSave}
          // count={savesCount}
          ActiveIcon={Bookmark}
          activeClass="text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30"
        />


        <button
          onClick={handleQuestionShare}
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
            <span>{answers?.length} Answers</span>
          </div>

          {author?.profile?.firstName && (
            
            <Link
              to={`/main/u/profile/${author?.username}`}
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

      <section className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Answers ({answers.length})
          </h2>

          {loginUser && (
            <button
              onClick={() => setShowAnswerForm(!showAnswerForm)}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 dark:bg-[#07C5B9] dark:hover:bg-[#06b4a8] text-white font-medium rounded-lg transition-colors"
            >
              {showAnswerForm ? "Cancel" : "Write Answer"}
            </button>
          )}
        </div>

        {/* Answer Form */}
        {showAnswerForm && loginUser && (
          <AnswerForm
            questionId={question?._id}
            onSubmit={handleSubmitAnswer}
            isSubmitting={isSubmittingAnswer}
          />
        )}

        {/* Answers List */}
        <AnswerList
          answers={answers}
          isLoading={isLoadingAnswers}
          currentUserId={loginUser?._id}
          onVote={handleAnswerUpvote}
          onLike={handleAnswerLike}
          onShare={handleAnswerShare}
          onDelete={handleDeleteAnswer}
          onUpdate={handleUpdateAnswer}
          deletingAnswerId={deletingAnswerId}
          showAnswerForm={showAnswerForm}
          onWriteAnswer={() => setShowAnswerForm(true)}
        />
      </section>
    </article>
  );
}


function ActionButton({
  active,
  loading,
  onClick,
  count,
  // eslint-disable-next-line no-unused-vars
  ActiveIcon,
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
