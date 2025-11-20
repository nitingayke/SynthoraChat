import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  TrendingUp,
  MessageSquare,
  Edit3,
  ThumbsUp,
  Users,
  Zap,
  Target,
  Award,
  Clock,
  BarChart3,
  Sparkles,
  Brain,
  Star
} from 'lucide-react';

// Enhanced mock activity data
const activityData = {
  streak: {
    current: 14,
    longest: 28,
    activeDays: ['Mon', 'Wed', 'Fri', 'Sun']
  },
  weeklyActivity: [
    { day: 'Mon', questions: 12, answers: 25, upvotes: 45, aiSessions: 8 },
    { day: 'Tue', questions: 8, answers: 18, upvotes: 32, aiSessions: 6 },
    { day: 'Wed', questions: 15, answers: 30, upvotes: 58, aiSessions: 12 },
    { day: 'Thu', questions: 10, answers: 22, upvotes: 40, aiSessions: 9 },
    { day: 'Fri', questions: 18, answers: 35, upvotes: 65, aiSessions: 15 },
    { day: 'Sat', questions: 14, answers: 28, upvotes: 52, aiSessions: 11 },
    { day: 'Sun', questions: 9, answers: 20, upvotes: 38, aiSessions: 7 }
  ],
  monthlyStats: {
    questions: 86,
    answers: 178,
    upvotes: 330,
    followers: 24,
    aiSessions: 45,
    reputation: 1247
  },
  activityDistribution: [
    { name: 'Questions', value: 25, color: '#3B82F6' },
    { name: 'Answers', value: 45, color: '#10B981' },
    { name: 'AI Sessions', value: 20, color: '#8B5CF6' },
    { name: 'Comments', value: 10, color: '#F59E0B' }
  ],
  monthlyTrend: [
    { month: 'Jan', questions: 45, answers: 89, upvotes: 156 },
    { month: 'Feb', questions: 52, answers: 102, upvotes: 198 },
    { month: 'Mar', questions: 68, answers: 124, upvotes: 245 },
    { month: 'Apr', questions: 86, answers: 178, upvotes: 330 },
  ],
  activityTimeline: [
    {
      id: 1,
      type: 'question',
      action: 'asked',
      title: 'How to optimize React performance with large datasets?',
      timestamp: '2 hours ago',
      points: 5,
      icon: MessageSquare,
      color: 'blue'
    },
    {
      id: 2,
      type: 'answer',
      action: 'answered',
      title: 'Best practices for microservices communication',
      timestamp: '4 hours ago',
      points: 10,
      icon: Edit3,
      color: 'green'
    },
    {
      id: 3,
      type: 'upvote',
      action: 'received',
      title: '15 upvotes on your answer about AI ethics',
      timestamp: '6 hours ago',
      points: 3,
      icon: ThumbsUp,
      color: 'yellow'
    },
    {
      id: 4,
      type: 'follower',
      action: 'gained',
      title: 'New follower: Sarah Chen',
      timestamp: '1 day ago',
      points: 2,
      icon: Users,
      color: 'purple'
    },
    {
      id: 5,
      type: 'ai_session',
      action: 'completed',
      title: 'AI chat session on machine learning',
      timestamp: '1 day ago',
      points: 8,
      icon: Sparkles,
      color: 'pink'
    }
  ],
  achievements: [
    {
      id: 1,
      name: 'Rising Star',
      description: '50+ upvotes in a week',
      progress: 100,
      icon: Zap,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 2,
      name: 'Helper',
      description: '100 answers provided',
      progress: 78,
      icon: Target,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      name: 'Consistent',
      description: '30-day streak',
      progress: 47,
      icon: Award,
      color: 'from-blue-500 to-cyan-500'
    }
  ],
  engagementMetrics: {
    avgResponseTime: '2.3h',
    answerAccuracy: '94%',
    helpfulRate: '89%',
    communityRank: 'Top 5%'
  }
};

// Custom Tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
        <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Activity Timeline Item
const ActivityItem = ({ activity }) => {
  const IconComponent = activity.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all group"
    >
      <div className={`p-2 rounded-lg ${activity.color === 'blue' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' :
          activity.color === 'green' ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400' :
            activity.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' :
              activity.color === 'purple' ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400' :
                'bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400'
        }`}>
        <IconComponent className="w-4 h-4" />
      </div>

      <div className="flex-1">
        <p className="text-gray-900 dark:text-white font-medium">
          {activity.title}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {activity.action} • {activity.timestamp}
        </p>
      </div>

      <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400 font-semibold">
        <span>+{activity.points}</span>
      </div>
    </motion.div>
  );
};

ActivityItem.propTypes = {
  activity: PropTypes.object.isRequired
};

// Achievement Progress Component
const AchievementCard = ({ achievement }) => {
  const IconComponent = achievement.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-[#161616] rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:shadow-lg transition-all"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${achievement.color} flex items-center justify-center`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white">{achievement.name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{achievement.description}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Progress</span>
          <span className="font-semibold text-gray-900 dark:text-white">{achievement.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full bg-gradient-to-r ${achievement.color} transition-all duration-1000`}
            style={{ width: `${achievement.progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

AchievementCard.propTypes = {
  achievement: PropTypes.object.isRequired
};

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
            <AreaChart data={activityData.weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis
                dataKey="day"
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis
                stroke="#6B7280"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="questions"
                stackId="1"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
                name="Questions"
              />
              <Area
                type="monotone"
                dataKey="answers"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.6}
                name="Answers"
              />
              <Area
                type="monotone"
                dataKey="upvotes"
                stackId="1"
                stroke="#F59E0B"
                fill="#F59E0B"
                fillOpacity={0.6}
                name="Upvotes"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Distribution - Pie Chart */}
        <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <PieChart className="w-6 h-6 text-blue-500 dark:text-[#07C5B9]" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Distribution</h3>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={activityData.activityDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {activityData.activityDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
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
          <LineChart data={activityData.monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis
              dataKey="month"
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis
              stroke="#6B7280"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="questions"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              name="Questions"
            />
            <Line
              type="monotone"
              dataKey="answers"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              name="Answers"
            />
            <Line
              type="monotone"
              dataKey="upvotes"
              stroke="#F59E0B"
              strokeWidth={3}
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
              name="Upvotes"
            />
          </LineChart>
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
        <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-6 h-6 text-blue-500 dark:text-[#07C5B9]" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Engagement Metrics</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Avg. Response Time</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Time to answer questions</p>
              </div>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {activityData.engagementMetrics.avgResponseTime}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-500/10 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Answer Accuracy</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Correct solutions rate</p>
              </div>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {activityData.engagementMetrics.answerAccuracy}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-500/10 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Helpful Rate</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Helpful answers ratio</p>
              </div>
              <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {activityData.engagementMetrics.helpfulRate}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Community Rank</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Among all users</p>
              </div>
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {activityData.engagementMetrics.communityRank}
              </span>
            </div>
          </div>
        </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Activity Insights</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Most Active Day</span>
              <span className="font-semibold">Thursday</span>
            </div>
            <div className="flex justify-between">
              <span>Peak Hours</span>
              <span className="font-semibold">2 PM - 5 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Avg. Daily Activity</span>
              <span className="font-semibold">4.2 hours</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6" />
            <h3 className="text-lg font-semibold">This Month's Goals</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Answer 50+ Questions</span>
              <span className="font-semibold">78%</span>
            </div>
            <div className="flex justify-between">
              <span>Gain 30 Followers</span>
              <span className="font-semibold">80%</span>
            </div>
            <div className="flex justify-between">
              <span>Maintain 15-day Streak</span>
              <span className="font-semibold">93%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

ActivityTab.propTypes = {
  tabVariants: PropTypes.object.isRequired,
};