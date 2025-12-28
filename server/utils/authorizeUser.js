import httpStatus from "http-status";

export const authorizeUser = (req, userId, res) => {
  if (req.user.id !== userId) {
    res.status(httpStatus.FORBIDDEN).json({
      success: false,
      message: "Unauthorized access",
    });
    return false;
  }
  return true;
};
