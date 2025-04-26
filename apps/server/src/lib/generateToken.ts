import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/environment';

export const generateTokenAndSetCookie = (userId: string, res: Response) => {
  // Access token - short lived
  const accessToken = jwt.sign({ userId }, config.auth.jwtSecret, {
    expiresIn: config.auth.jwtExpiresIn,
  });

  // Refresh token - longer lived
  const refreshToken = jwt.sign({ userId }, config.auth.jwtRefreshSecret, {
    expiresIn: '7d', // 7 days
  });

  // Cookie options for development vs production
  const cookieOptions = {
    httpOnly: true,
    secure: config.server.isProd,
    sameSite: config.server.isProd ? ('none' as const) : ('lax' as const),
  };

  // Set the access token in a cookie
  res.cookie('access_token', accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
    path: '/',
  });

  // Set the refresh token in a cookie
  res.cookie('refresh_token', refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    path: '/auth/refresh', // Only sent to the refresh endpoint
  });

  // Backward compatibility - will remove in future
  res.cookie('jwt', accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000, // 15 minutes in MS
  });
};
