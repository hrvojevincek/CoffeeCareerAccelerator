import { Request, Response, NextFunction } from 'express';
import { config } from '../config/environment';

// Simple in-memory rate limiter
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const { windowMs, maxRequests } = config.rateLimit;

export const rateLimit = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  // Get or initialize request data for this IP
  const requestData = requestCounts.get(ip) || { count: 0, resetTime: now + windowMs };

  // Reset counter if window expired
  if (now > requestData.resetTime) {
    requestData.count = 0;
    requestData.resetTime = now + windowMs;
  }

  // Increment request count
  requestData.count++;
  requestCounts.set(ip, requestData);

  // Set headers
  res.setHeader('X-RateLimit-Limit', maxRequests);
  res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - requestData.count));
  res.setHeader('X-RateLimit-Reset', requestData.resetTime);

  if (requestData.count > maxRequests) {
    return res.status(429).json({
      status: 'error',
      message: 'Too many requests, please try again later',
    });
  }

  next();
};
