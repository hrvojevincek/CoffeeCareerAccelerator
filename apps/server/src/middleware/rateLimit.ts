import { Request, Response, NextFunction } from 'express';
import { config } from '../config/environment';

// Enhanced in-memory rate limiter with different limits for different endpoints
const requestCounts = new Map<string, { count: number; resetTime: number }>();

interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

export const createRateLimit = (options: RateLimitOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const key = `${ip}:${req.route?.path || req.path}`;
    const now = Date.now();

    const requestData = requestCounts.get(key) || {
      count: 0,
      resetTime: now + options.windowMs,
    };

    if (now > requestData.resetTime) {
      requestData.count = 0;
      requestData.resetTime = now + options.windowMs;
    }

    requestData.count++;
    requestCounts.set(key, requestData);

    // Set headers
    res.setHeader('X-RateLimit-Limit', options.maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, options.maxRequests - requestData.count));
    res.setHeader('X-RateLimit-Reset', requestData.resetTime);

    if (requestData.count > options.maxRequests) {
      return res.status(429).json({
        status: 'error',
        message: 'Too many requests, please try again later',
        retryAfter: Math.ceil((requestData.resetTime - now) / 1000),
      });
    }

    next();
  };
};

// Different rate limits for different endpoints
export const generalRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,
});

export const authRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // Stricter for auth endpoints
});

export const apiRateLimit = createRateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 30,
});
