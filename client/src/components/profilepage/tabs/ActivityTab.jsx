import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  PieChart,
} from 'recharts';
import {
  TrendingUp,
  Award,
  Clock,
  BarChart3
} from 'lucide-react';
import AchievementCard from "./activityTab/AchievementCard";
import { activityData } from "../../../data/activityData";
import ActivityItem from "./activityTab/ActivityItem";
import WeeklyActivity from "./activityTab/WeeklyActivity";
import ActivityDistribution from "./activityTab/ActivityDistribution";
import MonthlyTrend from "./activityTab/MonthlyTrend";
import ActivityInsights from "./activityTab/ActivityInsights";
import EngagementMetrics from "./activityTab/EngagementMetrics";

export default function ActivityTab({ tabVariants }) {
  return (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      {/* Header Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="text-2xl font-bold">{activityData.streak.current}</div>
          <div className="text-blue-100 text-sm">Current Streak</div>
          <div className="text-blue-200 text-xs mt-1">Best: {activityData.streak.longest} days</div>
        </div>

        <div className="bg-white dark:bg-[#161616] rounded-xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{activityData.monthlyStats.questions}</div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">Questions</div>
          <div className="text-green-600 dark:text-green-400 text-xs mt-1">+12% this month</div>
        </div>

        <div className="bg-white dark:bg-[#161616] rounded-xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{activityData.monthlyStats.answers}</div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">Answers</div>
          <div className="text-green-600 dark:text-green-400 text-xs mt-1">+18% this month</div>
        </div>

        <div className="bg-white dark:bg-[#161616] rounded-xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{activityData.monthlyStats.upvotes}</div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">Upvotes</div>
          <div className="text-green-600 dark:text-green-400 text-xs mt-1">+25% this month</div>
        </div>

        <div className="bg-white dark:bg-[#161616] rounded-xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{activityData.monthlyStats.followers}</div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">New Followers</div>
          <div className="text-green-600 dark:text-green-400 text-xs mt-1">+8 this month</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity - Area Chart */}
        <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-blue-500 dark:text-[#07C5B9]" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Activity Trend</h3>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <WeeklyActivity />
          </ResponsiveContainer>
        </div>

        {/* Activity Distribution - Pie Chart */}
        <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <PieChart className="w-6 h-6 text-blue-500 dark:text-[#07C5B9]" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Distribution</h3>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <ActivityDistribution />
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Growth - Line Chart */}
      <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-blue-500 dark:text-[#07C5B9]" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Growth Trend</h3>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <MonthlyTrend />
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Timeline */}
        <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-blue-500 dark:text-[#07C5B9]" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
          </div>

          <div className="space-y-3">
            {activityData.activityTimeline.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>

          <button className="w-full mt-4 p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors font-medium">
            View All Activity
          </button>
        </div>

        {/* Engagement Metrics */}
        <EngagementMetrics />
      </div>

      {/* Achievements Section */}
      <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-6 h-6 text-blue-500 dark:text-[#07C5B9]" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Achievements & Goals</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activityData.achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>

      {/* Activity Insights */}
      <ActivityInsights />
    </motion.div>
  );
}

ActivityTab.propTypes = {
  tabVariants: PropTypes.object.isRequired,
};