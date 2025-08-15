import { Request, Response, NextFunction } from 'express';
import { config } from '../config/simple-config';

// Enhanced in-memory rate limiter with different limits for different endpoints
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// Store cleanup interval ID for proper cleanup
let cleanupInterval: NodeJS.Timeout;

// Cleanup stale entries every 10 minutes
cleanupInterval = setInterval(
  () => {
    const now = Date.now();
    let cleanedCount = 0;

    for (const [key, data] of requestCounts.entries()) {
      if (now > data.resetTime + 60000) {
        requestCounts.delete(key);
        cleanedCount++;
      }
    }

    // Log cleanup stats in development
    if (config.server.isDev && cleanedCount > 0) {
      console.log(
        `🧹 Rate limiter cleanup: removed ${cleanedCount} stale entries. Current entries: ${requestCounts.size}`
      );
    }
  },
  10 * 60 * 1000
);

export const stopCleanup = () => {
  if (cleanupInterval) {
    clearInterval(cleanupInterval);
    console.log('🧹 Rate limiter cleanup stopped');
  }
};

const MAX_ENTRIES = 10000;

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

    if (requestCounts.size > MAX_ENTRIES) {
      console.warn(`⚠️ Rate limiter emergency cleanup: ${requestCounts.size} entries`);
      for (const [mapKey, data] of requestCounts.entries()) {
        if (now > data.resetTime) {
          requestCounts.delete(mapKey);
        }
        if (requestCounts.size <= MAX_ENTRIES * 0.7) break;
      }
    }

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

export const getRateLimiterStats = () => {
  const now = Date.now();
  let activeEntries = 0;
  let staleEntries = 0;

  for (const [, data] of requestCounts.entries()) {
    if (now <= data.resetTime) {
      activeEntries++;
    } else {
      staleEntries++;
    }
  }

  return {
    totalEntries: requestCounts.size,
    activeEntries,
    staleEntries,
    memoryUsageApproxKB: Math.round((requestCounts.size * 100) / 1024), // Rough estimate
  };
};

export const generalRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,
});

export const authRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,
});

export const apiRateLimit = createRateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 30,
});
