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
    jwtSecret: (() => {
      const secret = process.env.JWT_SECRET;
      if (!secret && process.env.NODE_ENV === 'production') {
        throw new Error('JWT_SECRET is required in production');
      }
      if (secret && secret.length < 32) {
        throw new Error('JWT_SECRET must be at least 32 characters long');
      }
      return secret || 'your_jwt_secret';
    })(),
    jwtRefreshSecret: (() => {
      const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
      if (!secret && process.env.NODE_ENV === 'production') {
        throw new Error('JWT_REFRESH_SECRET is required in production');
      }
      if (secret && secret.length < 32) {
        throw new Error('JWT_REFRESH_SECRET must be at least 32 characters long');
      }
      return secret || 'your_jwt_refresh_secret';
    })(),
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    cookieMaxAge: 24 * 60 * 60 * 1000, // 1 day
    bcryptRounds: (() => {
      const rounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
      if (isNaN(rounds) || rounds < 10 || rounds > 15) {
        throw new Error('BCRYPT_ROUNDS must be between 10 and 15');
      }
      return rounds;
    })(),
    cookieSecret: (() => {
      const secret = process.env.COOKIE_SECRET;
      if (!secret && process.env.NODE_ENV === 'production') {
        throw new Error('COOKIE_SECRET is required in production');
      }
      if (secret && secret.length < 32) {
        throw new Error('COOKIE_SECRET must be at least 32 characters long');
      }
      return secret || 'your_cookie_secret';
    })(),
    maxLoginAttempts: (() => {
      const attempts = parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5');
      if (isNaN(attempts) || attempts < 1 || attempts > 100) {
        throw new Error('MAX_LOGIN_ATTEMPTS must be between 1 and 100');
      }
      return attempts;
    })(),
    lockTime: (() => {
      const time = parseInt(process.env.LOCK_TIME || '7200000');
      if (isNaN(time) || time < 0) {
        throw new Error('LOCK_TIME must be a non-negative number');
      }
      return time;
    })(),
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

  // Security
  security: {
    maxRequestSize: '1mb',
    maxFileSize: '10mb',
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  },
};
