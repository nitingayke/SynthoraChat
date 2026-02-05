import User from "../models/User.js";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";
import AIChat from "../models/AIChat.js";
import { ACTIVE_USERS } from "../sockets/index.js";

export const getAppAnalyticsService = async (days = 30) => {
  const now = new Date();
  const pastDate = new Date();
  pastDate.setHours(0, 0, 0, 0);
  pastDate.setDate(now.getDate() - days + 1);

  /* -------------------- TOTAL COUNTS -------------------- */
  const [
    totalUsers,
    totalQuestions,
    totalAnswers,
    totalAiChats,
    helpfulAnswersAgg,
  ] = await Promise.all([
    User.countDocuments(),
    Question.countDocuments(),
    Answer.countDocuments(),
    AIChat.countDocuments(),

    User.aggregate([
      {
        $group: {
          _id: null,
          totalHelpfulAnswers: { $sum: "$helpfulAnswers" },
        },
      },
    ]),
  ]);

  const totalHelpfulAnswers =
    helpfulAnswersAgg.length > 0 ? helpfulAnswersAgg[0].totalHelpfulAnswers : 0;

  /* -------------------- ACTIVE USERS -------------------- */
  const activeUsers = Array.from(ACTIVE_USERS.values()).filter(
    (user) => user.lastSeen >= pastDate.getTime(),
  ).length;

  /* -------------------- USERS JOINED PER DAY -------------------- */
  const usersPerDay = await User.aggregate([
    { $match: { createdAt: { $gte: pastDate } } },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  /* -------------------- QUESTIONS PER DAY -------------------- */
  const questionsPerDay = await Question.aggregate([
    { $match: { createdAt: { $gte: pastDate } } },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  /* -------------------- ANSWERS PER DAY -------------------- */
  const answersPerDay = await Answer.aggregate([
    { $match: { createdAt: { $gte: pastDate } } },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  /* -------------------- AI USAGE PER DAY -------------------- */
  const aiDailyUsage = await AIChat.aggregate([
    { $match: { createdAt: { $gte: pastDate } } },
    {
      $project: {
        date: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        messagesCount: { $size: "$messages" },
      },
    },
    {
      $group: {
        _id: "$date",
        totalSessions: { $sum: 1 },
        totalMessages: { $sum: "$messagesCount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  /* -------------------- TRENDING TOPICS -------------------- */
  const trendingTopics = await Question.aggregate([
    { $match: { createdAt: { $gte: pastDate } } },
    { $unwind: "$topics" },
    {
      $group: {
        _id: "$topics",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 40 },
  ]);

  /* -------------------- TRENDING QUESTIONS (FULL DOC) -------------------- */
  const trendingQuestions = await Question.aggregate([
    {
      $addFields: {
        answersCount: { $size: "$answers" },
      },
    },
    { $sort: { answersCount: -1 } },
    { $limit: 30 },
  ]);

  /* -------------------- RESPONSE -------------------- */
  return {
    users: {
      total: totalUsers,
      activeLastNDays: activeUsers,
      totalHelpfulAnswers,
      dailyNewUsers: usersPerDay.map((d) => ({
        date: d._id,
        count: d.count,
      })),
    },

    content: {
      questions: {
        total: totalQuestions,
        daily: questionsPerDay.map((d) => ({
          date: d._id,
          count: d.count,
        })),
      },
      answers: {
        total: totalAnswers,
        daily: answersPerDay.map((d) => ({
          date: d._id,
          count: d.count,
        })),
      },
    },

    ai: {
      totalSessions: totalAiChats,
      dailyUsage: aiDailyUsage.map((d) => ({
        date: d._id,
        sessions: d.totalSessions,
        messages: d.totalMessages,
      })),
    },

    trendingTopics,
    trendingQuestions,
  };
};
