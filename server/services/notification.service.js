import User from "../models/User.js";

/**
 * Add notification to user (keeps last 50)
 * @param {string} userId - Target user
 * @param {Object} notification
 * @param {string} notification.title
 * @param {string} notification.description
 */
export const addNotification = async (userId, notification) => {
  if (!userId || !notification?.title) return;

  await User.findByIdAndUpdate(userId, {
    $push: {
      notifications: {
        $each: [
          {
            ...notification,
            date: new Date(),
          },
        ],
        $slice: -50,
      },
    },
  });
};
