import User from "../models/User.js";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";
import AIChat from "../models/AIChat.js";

export const getAppAnalyticsService = async (days = 30) => {
  const now = new Date();
  const pastDate = new Date();
  pastDate.setDate(now.getDate() - days);

  const [totalUsers, totalQuestions, totalAnswers, totalAiChats] =
    await Promise.all([
      User.countDocuments(),
      Question.countDocuments(),
      Answer.countDocuments(),
      AIChat.countDocuments(),
    ]);

  const activeUsers = await User.countDocuments({
    lastActive: { $gte: pastDate }, // $gte = greater than or equal
  });

  const trendingTopics = await Question.aggregate([
    { $match: { createdAt: { $gte: pastDate } } },
    { $unwind: "$topics" }, // it convert array to its own row.
    {
      $group: {
        _id: "$topics",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } }, // sort by most used topic first
    { $limit: 20 },
  ]);

  const trendingQuestions = await Question.aggregate([
    {
      $project: {
        title: 1,
        answersCount: { $size: "$answers" },
      },
    },
    { $sort: { answersCount: -1 } },
    { $limit: 15 },
  ]);

  const aiDailyUsage = await AIChat.aggregate([
    {
      $match: {
        createdAt: { $gte: pastDate },
      },
    },
    {
      $project: {
        date: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },
        messagesCount: { $size: "$messages" },
      },
    },
    {
      $group: {
        _id: "$date",
        totalMessages: { $sum: "$messagesCount" },
        totalSessions: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return {
    users: {
      total: totalUsers,
      activeLastNDays: activeUsers,
    },
    content: {
      questions: totalQuestions,
      answers: totalAnswers,
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
