import { ChevronDown, Hash } from "lucide-react";
import PropTypes from "prop-types";
import { useCallback, useContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import AnswerCard from "./AnswerCard";
import { getAnswersByQuestionId } from "../../../services/answer.service";
import SocketContext from "../../../context/SocketContext";
import AuthContext from "../../../context/AuthContext";


const LIMIT = 10;

export default function AnswerList({ question }) {

  const { enqueueSnackbar } = useSnackbar();
  const { socket } = useContext(SocketContext);
  const { loginUser } = useContext(AuthContext);

  const [answers, setAnswers] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchAnswers = useCallback(
    async (currentSkip, isInitialLoading = false) => {
      if (loading) return;
      if (!question?._id) return;
      if (!isInitialLoading && !hasMore) return;

      try {
        setLoading(true);

        const res = await getAnswersByQuestionId(
          question._id,
          currentSkip,
          LIMIT
        );

        setAnswers((prev) =>
          isInitialLoading ? res.data.answers : [...prev, ...res.data.answers]
        );

        setHasMore(res.meta.hasMore);
        setSkip(currentSkip + LIMIT);
      } catch (error) {
        enqueueSnackbar(
          error?.response?.data?.message || "Failed to load answers",
          { variant: "error" }
        );
      } finally {
        setLoading(false);
      }
    },
    [loading, question?._id, hasMore, enqueueSnackbar]
  );

  useEffect(() => {
    if (!question?._id) return;

    setAnswers([]);
    setSkip(0);
    setHasMore(true);

    fetchAnswers(0, true);
  }, [question?._id]); // DO NOT add fetchAnswers here

  const handleAnswerNew = useCallback(({ questionId, answer }) => {
    if (questionId !== question?._id) return;

    setAnswers(prev => {
      const exists = prev.some(a => a._id === answer._id);
      if (exists) return prev;

      return [answer, ...prev]
    });

    const username = answer?.author?.username || "null#";
    if(username !== loginUser?.username) {
      enqueueSnackbar(`${username} answered this question`, { variant: "info" });
    }
  }, [question?._id, enqueueSnackbar, loginUser?.username]); 

  const handleAnswerLike = ({ answerId, userId, liked }) => {
    setAnswers((prev) =>
      prev.map((answer) => {
        if (answer?._id !== answerId) return answer;

        return {
          ...answer,
          likes: liked ? [...answer.likes, userId] : answer.likes.filter((id) => id !== userId),
        };
      })
    );
  };

  const handleAnswerUpvote = ({ answerId, userId, upvoted }) => {
    setAnswers((prev) =>
      prev.map((answer) => {
        if (answer?._id !== answerId) return answer;

        return {
          ...answer,
          upvotes: upvoted
            ? [...answer.upvotes, userId]
            : answer.upvotes.filter((id) => id !== userId),
        };
      })
    );
  };

  const handleAnswerEdit = ({ answerId, content, contentUpdatedAt }) => {
    setAnswers((prev) =>
      prev.map((answer) => {
        if (answer._id !== answerId) return answer;

        return {
          ...answer,
          content,
          contentUpdatedAt
        };
      })
    );
  };

  const handleAnswerDelete = ({ answerId }) => {
    setAnswers(prev => prev.filter(a => a._id !== answerId));
  }

  const handleAnswerNewComment = useCallback(({ answerId, comment }) => {
    setAnswers((prev) =>
      prev.map((answer) => {
        if (answer._id !== answerId) return answer;

        return {
          ...answer,
          comments: [comment, ...answer.comments]
        };
      })
    );
  }, []);

  const handleUpvoteComment = ({ answerId, commentId, userId, upvoted }) => {
    setAnswers((prev) =>
      prev.map(answer => {
        if (answer._id !== answerId) return answer;

        return {
          ...answer,
          comments: answer.comments.map((comment) => {
            if (comment._id !== commentId) return comment;

            return {
              ...comment,
              upvotes: upvoted
                ? [...comment.upvotes, userId]
                : comment.upvotes.filter((id) => id !== userId),
            };
          }),
        };
      })
    )
  }

  const handleDeleteComment = ({ answerId, commentId }) => {
    setAnswers(prev =>
      prev.map(a =>
        a._id === answerId ? { ...a, comments: a.comments.filter(c => c._id !== commentId) } : a
      )
    );
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("answer:new", handleAnswerNew);

    socket.on("answer:like", handleAnswerLike);
    socket.on("answer:upvote", handleAnswerUpvote);
    socket.on("answer:edit", handleAnswerEdit);
    socket.on("answer:delete", handleAnswerDelete);
    socket.on("answer:comment:new", handleAnswerNewComment);

    socket.on("comment:upvote", handleUpvoteComment);
    socket.on("comment:deleted", handleDeleteComment);

    return () => {
      socket.off("answer:new", handleAnswerNew);

      socket.off("answer:like", handleAnswerLike);
      socket.off("answer:upvote", handleAnswerUpvote);
      socket.off("answer:edit", handleAnswerEdit);
      socket.off("answer:delete", handleAnswerDelete);
      socket.off("answer:comment:new", handleAnswerNewComment);

      socket.off("comment:upvote", handleUpvoteComment);
      socket.off("comment:deleted", handleDeleteComment);
    }
  }, [socket, handleAnswerNewComment, handleAnswerNew]);

  if (!answers.length && !loading) {
    return (
      <div className="px-4 py-7 text-gray-600 dark:text-gray-400 text-center">
        No answers yet — be the first to contribute!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div id="answers" className="pb-3 mb-0" />

      <a
        href="#answers"
        className="flex items-center gap-1 text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2"
      >
        <Hash size={20} /> Answers ({answers.length})
      </a>

      <div className="border-b border-gray-300 dark:border-[#2a2a2a]" />

      {answers.map((a) => (
        <AnswerCard
          key={a._id}
          answer={a}
          allowComments={question?.allowComments}
        />
      ))}

      {hasMore && (
        <div className="flex justify-center items-center mt-3">
          <button
            disabled={loading}
            onClick={() => fetchAnswers(skip, false)}
            className="flex items-center gap-1 text-sm rounded-md px-3 py-2 bg-gray-100 dark:bg-[#111] hover:opacity-80 disabled:opacity-60 border shadow-lg border-gray-300 dark:border-[#232323]"
          >
            <ChevronDown size={18} /> {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

AnswerList.propTypes = {
  question: PropTypes.object.isRequired,
};
