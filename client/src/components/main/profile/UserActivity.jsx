import React, { useContext, useMemo, useState } from "react";
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
  RefreshCcw,
  Download,
} from "lucide-react";
import AuthContext from "../../../context/AuthContext";

/* -------------------- Small UI Helpers -------------------- */

function Card({ children }) {
  return (
    <div className="bg-white dark:bg-[#191919] border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-3">
      {children}
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-orange-100 dark:bg-[#07C5B9]/20">
          <Icon className="w-5 h-5 text-orange-500 dark:text-[#07C5B9]" />
        </div>
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default function UserActivity({ user }) {

  const { loginUser } = useContext(AuthContext);

  const isOwnProfile = loginUser && user && loginUser?._id === user?._id;

  const [range, setRange] = useState("30d");
  const [tab, setTab] = useState("overview");

  const stats = useMemo(() => ({
    questions: user?.questions?.length || 0,
    answers: user?.answers?.length || 0,
    followers: user?.followers?.length || 0,
    following: user?.following?.length || 0,
    saved: user?.savedQuestions?.length || 0,
    helpful: user?.helpfulAnswers || 0,
    upvotes: user?.upvotesCount || 0,
    aiChats: user?.aiChatSessions?.length || 0,
  }), [user]);

  return (
    <div className="space-y-4">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            User Activity
          </h1>
          <p className="text-sm text-gray-500">
            Track questions, answers, engagement & growth
          </p>
          <div className="flex gap-4 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock size={14} /> Last active:{" "}
              {new Date(user?.lastActive).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} /> Joined:{" "}
              {new Date(user?.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* FILTER */}
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#111] text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-[#07C5B9]"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
          <option value="1y">Last 1 Year</option>
          <option value="all">All Time</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={MessageCircle} label="Questions" value={stats.questions} />
        <StatCard icon={Activity} label="Answers" value={stats.answers} />
        <StatCard icon={Users} label="Followers" value={stats.followers} />
        <StatCard icon={UserPlus} label="Following" value={stats.following} />
        <StatCard icon={Bookmark} label="Saved" value={stats.saved} />
        <StatCard icon={ThumbsUp} label="Helpful Answers" value={stats.helpful} />
        <StatCard icon={BarChart3} label="Upvotes" value={stats.upvotes} />
        <StatCard icon={Bot} label="AI Chats" value={stats.aiChats} />
      </div>

      <div className="flex flex-wrap gap-2">
        {["overview", "questions", "answers", "saved", "following", "followers", "AI Chats"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm rounded-lg border ${tab === t
              ? "bg-orange-500 dark:bg-[#07C5B9] text-white border-transparent"
              : "border-gray-300 dark:border-[#2a2a2a] text-gray-600 dark:text-gray-400"
              }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <Card>
        <div className="h-52 flex items-center justify-center text-sm text-gray-500 border-2 border-dashed border-gray-300 dark:border-[#2a2a2a] rounded-lg">
          📊 Charts will appear here (based on "{tab}" & "{range}")
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Recent Activity
        </h3>
        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <li>📝 Asked a question</li>
          <li>💬 Answered a question</li>
          <li>⭐ Received an upvote</li>
          <li>📌 Saved a question</li>
          <li>🤖 Started AI chat session</li>
        </ul>
      </Card>

      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard
          icon={ThumbsUp}
          label="Engagement Rate"
          value={`${stats.answers ? Math.round((stats.upvotes / stats.answers) * 100) : 0}%`}
        />
        <StatCard
          icon={Activity}
          label="Helpful Rate"
          value={`${stats.answers ? Math.round((stats.helpful / stats.answers) * 100) : 0}%`}
        />
        <StatCard
          icon={BarChart3}
          label="Avg Upvotes / Answer"
          value={stats.answers ? Math.round(stats.upvotes / stats.answers) : 0}
        />
      </div>

      {
        (isOwnProfile) && <div className="flex gap-3 flex-wrap">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-[#2a2a2a] text-sm">
            <RefreshCcw size={16} /> Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 dark:bg-[#07C5B9] text-white text-sm">
            <Download size={16} /> Download Report
          </button>
        </div>
      }
    </div>
  );
}

UserActivity.propTypes = {
  user: PropTypes.object.isRequired,
};
