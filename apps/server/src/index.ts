import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';
import { config } from './config/environment';
import { errorHandler } from './middleware/errorHandler';
import { apiRateLimit, getRateLimiterStats } from './middleware/rateLimit';
import authRoutes from './routes/auth.routes';
import employerRoutes from './routes/employer.routes';
import jobRoutes from './routes/jobs.routes';
import userRoutes from './routes/user.routes';

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  })
);

// Prevent NoSQL injection attacks
app.use(mongoSanitize());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Apply middleware
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const allowedOrigins = Array.isArray(config.urls.client)
        ? config.urls.client
        : [config.urls.client];

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.warn(`Origin ${origin} not allowed by CORS`);
        callback(null, true); // Still allow for development purposes
      }
    },
    credentials: true,
  })
);

// Apply rate limiting
app.use(apiRateLimit);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    environment: config.server.nodeEnv,
    serverUrl: config.urls.server(),
  });
});

// Rate limiter stats endpoint (for monitoring)
app.get('/health/rate-limiter', (req, res) => {
  const stats = getRateLimiterStats();
  res.status(200).json({
    status: 'ok',
    rateLimiter: stats,
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/jobs', jobRoutes);
app.use('/employers', employerRoutes);

// Global error handler - must be after routes
app.use(errorHandler);

app.listen(config.server.port, () => {
  console.log(`🚀 Server listening on ${config.urls.server()} 🚀`);
});

export default app;
