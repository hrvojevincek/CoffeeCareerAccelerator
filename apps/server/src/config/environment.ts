// Centralized environment configuration
export const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 8080,
    nodeEnv: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV !== 'production',
    isProd: process.env.NODE_ENV === 'production',
  },

  // URLs and endpoints
  urls: {
    client: process.env.FRONTEND_URL || ['http://localhost:3000', 'http://localhost:5173'],
    server: () => `http://localhost:${config.server.port}`,
  },

  // Auth configuration
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    jwtRefreshSecret:
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'your_jwt_refresh_secret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    cookieMaxAge: 24 * 60 * 60 * 1000, // 1 day
  },

  // Database configuration (via prisma env vars)
  database: {
    url: process.env.DIRECT_DATABASE_URL,
  },

  // Rate limiting
  rateLimit: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100, // 100 requests per minute
  },
};
