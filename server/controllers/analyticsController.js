import httpStatus from "http-status";
import { getAppAnalyticsService } from "../services/analyticsService.js";
import { ACTIVE_USERS } from "../sockets/index.js";

export const getAppAnalyticsController = async (req, res) => {
  const days = Number.parseInt(req.query.days, 10) || 30;

  if (days <= 0) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Days must be positive",
    });
  }

  const data = await getAppAnalyticsService(days);

  return res.status(httpStatus.OK).json({
    success: true,
    message: "",
    days,
    data,
  });
};

export const getActiveUsers = async (req, res) => {
  const payload = [];

  for (const [userId, entry] of ACTIVE_USERS.entries()) {
    payload.push({
      userId,
      online: entry.sockets.size > 0,
      lastSeen: entry.lastSeen,
    });
  }

  return res.status(httpStatus.OK).json({
    success: true,
    data: {
      users: payload,
    },
  });
};
