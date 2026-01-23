import User from "../models/User.js";

const MAX_ACTIVITIES = 30;

export const addUserActivity = async ({
  userId,
  title,
  text,
  link = ""
}) => {

  if (!userId || !title || !text) return;

  await User.findByIdAndUpdate(userId, {
    $push: {
      activities: {
        $each: [
          {
            title,
            text,
            link,
            createdAt: new Date(),
          },
        ],
        $slice: -MAX_ACTIVITIES,
      },
    },
  });
};
