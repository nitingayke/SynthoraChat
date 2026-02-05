import User from "../models/User.js";
import { ACTIVE_USERS } from "./index.js";

export const initActiveUsers = async () => {
  const users = await User.find({}, { _id: 1, updatedAt: 1 }).lean();

  const now = Date.now();
  for (const user of users) {
    ACTIVE_USERS.set(user._id.toString(), {
      sockets: new Set(),
      lastSeen: user.updatedAt ? new Date(user.updatedAt) : now,
    });
  }
};
