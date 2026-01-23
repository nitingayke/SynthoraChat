import React, { useMemo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Activity,
  Calendar,
  Users,
  UserPlus,
  MessageCircle,
  Bookmark,
  ThumbsUp,
  Bot,
  BarChart3,
  Clock,
} from "lucide-react";
import { Line } from "react-chartjs-2";
import { buildLast30DaysSeries } from "../../../utils/analytics";
import { formatCount } from "../../../utils/formatCount";

export default function UserInsights({ user }) {

  const [tab, setTab] = useState("saved");

  const stats = useMemo(
    () => ({
      questions: user?.questions?.length || 0,
      answers: user?.answers?.length || 0,
      followers: user?.followers?.length || 0,
      following: user?.following?.length || 0,
      saved: user?.savedQuestions?.length || 0,
      helpful: user?.helpfulAnswers || 0,
      upvotes: user?.upvotesCount || 0,
      aiChats: user?.aiChatSessions?.length || 0,
    }),
    [user]
  );

  const STAT_ITEMS = [
    { icon: MessageCircle, label: "Questions", key: "questions" },
    { icon: Activity, label: "Answers", key: "answers" },
    { icon: Users, label: "Followers", key: "followers" },
    { icon: UserPlus, label: "Following", key: "following" },
    { icon: Bookmark, label: "Saved", key: "saved" },
    { icon: ThumbsUp, label: "Helpful Answers", key: "helpful" },
    { icon: BarChart3, label: "Upvotes", key: "upvotes" },
    { icon: Bot, label: "AI Chats", key: "aiChats" },
  ];

  const getChartData = useCallback((selectedTab) => {
    switch (selectedTab) {
      case "followers":
        return {
          title: "Followers (Last 30 Days)",
          ...buildLast30DaysSeries("followedAt", user?.followers || []),
        };

      case "following":
        return {
          title: "Following (Last 30 Days)",
          ...buildLast30DaysSeries("followedAt", user?.following || []),
        };

      case "saved":
        return {
          title: "Saved Questions (Last 30 Days)",
          ...buildLast30DaysSeries("savedAt", user?.savedQuestions || []),
        };

      case "AI Chats":
        return {
          title: "AI Chats (Last 30 Days)",
          ...buildLast30DaysSeries("timestamp", user?.aiChatSessions || []),
        };

      default:
        return {
          title: "Followers (Last 30 Days)",
          ...buildLast30DaysSeries("followedAt", user?.followers || []),
        };
    }
  }, [user?.followers, user?.following, user?.savedQuestions, user?.aiChatSessions]);

  const chartData = useMemo(() => {
    const series = getChartData(tab);

    return {
      labels: series.labels,
      datasets: [
        {
          label: series.title,
          data: series.data,
          borderColor: "#07C5B9",
          backgroundColor: "rgba(7,197,185,0.15)",
          tension: 0.45,
          borderWidth: 2.5,
          pointRadius: 3,
          pointHoverRadius: 6,
          pointBackgroundColor: "#07C5B9",
          fill: true,
        },
      ],
    };
  }, [getChartData, tab]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#020617",
        titleColor: "#fff",
        bodyColor: "#e5e7eb",
        borderWidth: 1,
        borderColor: "#334155",
      },
    },
    scales: {
      x: {
        ticks: { color: "#9ca3af", maxTicksLimit: 6 },
        grid: { display: false },
      },
      y: {
        min: 0,
        beginAtZero: true,
        ticks: {
          color: "#07C5B9",
          precision: 0,
          stepSize: 1,
        },
        grid: {
          color: "rgba(7,197,185,0.15)",
        },
      },
    },
  };

  return (
    <div className="flex-1 space-y-4 mt-4 md:mt-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          User Activity
        </h1>
        <p className="text-sm text-gray-500">
          Track questions, answers, engagement & growth
        </p>

        <div className="flex gap-4 mt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            Last active: {new Date(user?.lastActive).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            Joined: {new Date(user?.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_ITEMS.map(({ icon: Icon, label, key }) => (
          <div
            key={key}
            className="bg-white dark:bg-[#191919] border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-3"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-[#07C5B9]/20">
                <Icon className="w-5 h-5 text-orange-500 dark:text-[#07C5B9]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatCount(stats[key])}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex sm:flex-wrap overflow-auto scrollbar-hide gap-2">
        {[
          "saved",
          "following",
          "followers",
          "AI Chats",
        ].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm rounded-lg border whitespace-nowrap ${tab === t
              ? "bg-orange-500 dark:bg-[#07C5B9] text-white border-transparent"
              : "border-gray-300 dark:border-[#2a2a2a] text-gray-600 dark:text-gray-400"
              }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#191919] border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-4">
        <div className="relative w-full h-[260px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

    </div>
  );
}

UserInsights.propTypes = {
  user: PropTypes.object.isRequired,
};
