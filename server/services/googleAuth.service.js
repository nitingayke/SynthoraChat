import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import { generateToken } from "../utils/token.js";

const google_client_id = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(google_client_id);

export const googleAuth = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: google_client_id,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error("Invalid Google token payload");
  }

  const {
    sub: googleId,
    email,
    email_verified,
    given_name,
    family_name,
    picture,
  } = payload;

  if (!email || !email_verified) {
    throw new Error("Google email not verified");
  }

  let user = await User.findOne({
    $or: [{ googleId }, { email }],
  });

  if (user) {
    if (user.authProvider !== "google") {
      user.googleId = googleId;
      user.authProvider = "google";
      user.isVerified = true;
      await user.save();
    }
  } else {
    const baseUsername = email.split("@")[0];
    let username = baseUsername;
    let count = 1;

    while (await User.exists({ username })) {
      username = `${baseUsername}${count++}`;
    }

    user = await User.create({
      username: email.split("@")[0],
      email,
      authProvider: "google",
      googleId,
      profile: {
        firstName: given_name || "",
        lastName: family_name || "",
        profilePicture: picture || "",
      },
      isVerified: true,
    });
  }

  if (user.isBlocked) {
    throw new Error("User account is blocked");
  }

  const token = generateToken({
    id: user._id,
    username: user.username,
  });

  const userResponse = user.toObject();
  delete userResponse.password;

  return { token, user: userResponse };
};
