// Simple configuration for local development
export const config = {
  server: {
    port: process.env.PORT || 8080,
    nodeEnv: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV !== 'production',
    isProd: process.env.NODE_ENV === 'production',
  },
  auth: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12'),
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'your_jwt_secret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    cookieMaxAge: 24 * 60 * 60 * 1000, // 1 day
    cookieSecret: process.env.COOKIE_SECRET || 'your_cookie_secret',
    maxLoginAttempts: parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5'),
    lockTime: parseInt(process.env.LOCK_TIME || '7200000'),
  },
  database: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5434/jobsboard',
    type: 'local-docker',
    host: 'localhost:5434',
  },
  urls: {
    client: ['http://localhost:3000', 'http://localhost:5173'],
    server: () => `http://localhost:${process.env.PORT || 8080}`,
  },
  rateLimit: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100, // 100 requests per minute
  },
  security: {
    maxRequestSize: '1mb',
    maxFileSize: '10mb',
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  },
};
