// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { TrendingUp, Users, Trophy } from "lucide-react";
import { useContext, useMemo } from "react";
import AnalyticsContext from "../../context/AnalyticsContext";
import { Link } from "react-router-dom";

export default function CommunityHighlights() {
  const { analytics, loading } = useContext(AnalyticsContext);

  /* -------------------- TEMP: STATIC (AI LATER) -------------------- */
  const topContributors = [
    {
      name: "Sarah Chen",
      avatar: "👩‍💻",
      answers: 142,
      streak: 15,
      role: "AI Expert",
      badge: "🏆",
    },
    {
      name: "Mike Rodriguez",
      avatar: "👨‍🔬",
      answers: 128,
      streak: 12,
      role: "ML Engineer",
      badge: "⭐",
    },
    {
      name: "Alex Thompson",
      avatar: "👨‍💼",
      answers: 98,
      streak: 8,
      role: "Full Stack",
      badge: "🔥",
    },
  ];

  const communityStats = useMemo(() => {
    const questionsDaily = analytics?.content?.questions?.daily ?? [];
    const answersDaily = analytics?.content?.answers?.daily ?? [];
    const usersDaily = analytics?.users?.dailyNewUsers ?? [];

    return [
      {
        label: "Questions Today",
        value: questionsDaily.at(-1)?.count ?? 0,
      },
      {
        label: "Answers Today",
        value: answersDaily.at(-1)?.count ?? 0,
      },
      {
        label: "New Members",
        value: usersDaily.at(-1)?.count ?? 0,
      },
    ];
  }, [analytics]);

  return (
    <section
      className="w-full max-w-6xl mx-auto bg-white dark:bg-[#161616] border border-gray-200 dark:border-white/10 rounded-lg shadow-sm p-4"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <Trophy className="w-5 h-5 text-orange-500 dark:text-[#07C5B9]" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Community Leaders
          </h3>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          This Month
        </span>
      </div>

      <div className="space-y-3 mb-6">
        {topContributors.map((contributor) => (
          <div
            key={contributor.name}
            className="group flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-[#1b1b1b] border border-transparent hover:border-orange-300 dark:hover:border-[#07C5B9]/40 hover:bg-gray-100 dark:hover:bg-[#202020] transition"
          >
            <div className="flex items-center gap-3">
              <div className="relative text-2xl">
                {contributor.avatar}
                <span className="absolute -top-1 -right-1 text-xs">
                  {contributor.badge}
                </span>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-[#07C5B9]">
                  {contributor.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {contributor.role}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {contributor.answers}
              </p>
              <p className="text-xs flex items-center gap-1 text-orange-500 dark:text-[#07C5B9]">
                <TrendingUp className="w-3 h-3" />
                {contributor.streak} days
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-white/10 pt-5">
        <h4 className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white mb-4">
          <Users className="w-4 h-4" />
          Community Stats
        </h4>

        {loading ? (
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            Loading stats...
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-4 text-center">
            {communityStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link
        to="/leaderboard"
        className="block mt-6 text-center text-sm font-medium text-orange-500 dark:text-[#07C5B9] border border-gray-200 dark:border-gray-700 rounded-lg py-2 hover:border-orange-400 dark:hover:border-[#07C5B9] transition"
      >
        View full Leaderboard
      </Link>
    </section>
  );
}
