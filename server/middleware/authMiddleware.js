import httpStatus from "http-status";
import { verifyToken } from "../utils/token.js";

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Missing token",
    });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(httpStatus.FORBIDDEN).json({
      success: false,
      message: "Invalid token",
    });
  }

  req.user = decoded;
  next();
}
