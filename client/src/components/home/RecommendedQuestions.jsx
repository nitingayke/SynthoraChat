import { Sparkles, ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function RecommendedQuestions() {
  const recommendedQuestions = [
    {
      id: 1,
      title: "React Hooks best practices for large applications",
      answers: 15,
      category: "React",
      trending: true,
      tags: ["React", "Hooks", "Best Practices"],
    },
    {
      id: 2,
      title: "How to optimize FastAPI for high traffic?",
      answers: 8,
      category: "FastAPI",
      trending: false,
      tags: ["FastAPI", "Performance", "Backend"],
    },
    {
      id: 3,
      title: "Machine Learning model deployment strategies",
      answers: 12,
      category: "AI/ML",
      trending: true,
      tags: ["ML", "Deployment", "AWS"],
    },
    {
      id: 4,
      title: "Tailwind CSS vs Styled Components in 2024",
      answers: 22,
      category: "CSS",
      trending: true,
      tags: ["CSS", "Tailwind", "Styled Components"],
    },
    {
      id: 5,
      title: "Building real-time chat with Socket.io and React",
      answers: 18,
      category: "Web Development",
      trending: false,
      tags: ["Socket.io", "React", "Real-time"],
    },
  ];

  return (
    <section
      className="w-full max-w-6xl mx-auto bg-white dark:bg-[#161616] border border-gray-200 dark:border-white/10 rounded-lg shadow-sm p-4"
    >
      {/* Header */}
      <div className="flex items-center mb-5 gap-2">
        <Sparkles className="w-5 h-5 text-orange-500 dark:text-[#07C5B9]" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recommended For You
        </h3>
      </div>

      {/* List */}
      <div className="space-y-3">
        {recommendedQuestions.map((question) => (
          <div
            key={question.id}
            className="group p-4 bg-gray-100 dark:bg-[#1b1b1b] rounded-lg border border-transparent hover:border-orange-300 dark:hover:border-[#07C5B9]/40 hover:bg-gray-100 dark:hover:bg-[#202020] transition-all"
          >
            {/* Title */}
            <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-orange-500 dark:group-hover:text-[#07C5B9] transition-colors">
              {question.title}
            </h4>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-2 mb-3">
              {question.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs rounded-full bg-orange-100 dark:bg-[#07C5B9]/20 text-orange-700 dark:text-[#07C5B9]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                {question.answers} answers
              </span>

              <Link to={`/main/questions/${question?._id}`} className="flex items-center gap-1 group-hover:text-orange-500 dark:group-hover:text-[#07C5B9] transition-colors">
                View <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/main?filter=recommended"
        className="block mt-6 text-center text-sm font-medium text-orange-500 dark:text-[#07C5B9] border border-gray-200 dark:border-gray-700 rounded-lg py-2 hover:border-orange-400 dark:hover:border-[#07C5B9] transition"
      >
        View All Recommendations
      </Link>
    </section>
  );
}
