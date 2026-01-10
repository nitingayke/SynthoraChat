import httpStatus from "http-status";
import { getAppAnalyticsService } from"../services/analyticsService.js";

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
