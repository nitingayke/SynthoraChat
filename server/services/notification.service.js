import User from "../models/User.js";
import { ACTIVE_USERS } from "../sockets/index.js";

/**
 * Add notification to user (keeps last 50)
 * @param {string} userId - Target user
 * @param {Object} notification
 * @param {string} notification.title
 * @param {string} notification.description
 */
export const addNotification = async (req, userId, notification) => {
  if (!userId || !notification?.title) return;

  const payload = {
    ...notification,
    date: new Date(),
  };

  await User.findByIdAndUpdate(userId, {
    $push: {
      notifications: {
        $each: [payload],
        $slice: -50,
      },
    },
  });

  const entry = ACTIVE_USERS.get(userId);
  if(!entry || entry.sockets.size === 0) return;

  for(const socketId of entry.sockets) {
    req.io.to(socketId).emit("notification:new", payload);
  }
};
