import { getAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Get auth info from Clerk (using cookie or Bearer token)
    const { userId, sessionId } = getAuth(req);

    if (!userId || !sessionId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find user in DB by Clerk ID
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach to req so controllers can use it
    req.user = user;        // Mongo User
    req.userId = userId;    // Clerk user id
    req.sessionId = sessionId;

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
