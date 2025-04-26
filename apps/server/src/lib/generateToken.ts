import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId: string, res: Response) => {
  // Access token - short lived
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "15m", // 15 minutes
  });

  // Refresh token - longer lived
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET || (process.env.JWT_SECRET as string),
    {
      expiresIn: "7d", // 7 days
    }
  );

  // Set the access token in a cookie
  res.cookie("access_token", accessToken, {
    maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
    httpOnly: true, // prevent XSS attacks
    sameSite: "strict", // CSRF protection
    secure: process.env.NODE_ENV !== "development",
    path: "/",
  });

  // Set the refresh token in a cookie
  res.cookie("refresh_token", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    path: "/api/auth/refresh", // Only sent to the refresh endpoint
  });

  // Backward compatibility - will remove in future
  res.cookie("jwt", accessToken, {
    maxAge: 15 * 60 * 1000, // 15 minutes in MS
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};
