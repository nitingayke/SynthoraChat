import { Hash } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import AnswerCard from "./AnswerCard";

export default function AnswerList({ question }) {

  const [answers, setAnswers] = useState([]);
  const [currLength, setCurrLength] = useState(10);

  useEffect(() => {
    if (!question?.answers) return;

    const filtered = question.answers.filter((a) => a.status === "published");
    setAnswers(filtered || []);
  }, [question?.answers]);

  if (!answers || answers.length === 0) {
    return (
      <div className="px-4 py-7 text-gray-600 dark:text-gray-400 text-center">
        No answers yet — be the first to contribute!
      </div>
    );
  }

  return (
    <div className="space-y-2">

      <div id="answers" className="pb-5 mb-0" />
      <a href={"#answers"} className="flex items-center gap-1 text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
        <Hash size={20} /> Answers ({answers?.length || 0})
      </a>
      <div className="border-b border-gray-300 dark:border-[#2a2a2a]"></div>


      {answers.slice(0, currLength).map((a) =>
        <AnswerCard key={a?._id} answer={a} />
      )}

      {
        (answers?.length > currLength) && <div className="flex justify-center items-center mt-3">
        <button className="text-sm rounded-md px-3 py-2 bg-gray-100 dark:bg-[#111] hover:bg-gray-200 dark:hover:bg-[#212121]" onClick={() => setCurrLength(prev => Math.min(prev + 10, answers?.length))}>Load More</button>
      </div>
      }
    </div>
  );
}

AnswerList.propTypes = {
  question: PropTypes.object.isRequired,
};
