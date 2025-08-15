import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';
import { errorHandler } from './middleware/errorHandler';
import { apiRateLimit, getRateLimiterStats, stopCleanup } from './middleware/rateLimit';
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

app.use(mongoSanitize());

app.use(hpp());

app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        console.log('🔓 CORS: Allowing request with no origin');
        return callback(null, true);
      }

      const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
      console.log(`🌐 CORS: Checking origin: ${origin}`);
      console.log(`✅ CORS: Allowed origins: ${allowedOrigins.join(', ')}`);

      if (allowedOrigins.includes(origin)) {
        console.log(`✅ CORS: Origin ${origin} is allowed`);
        callback(null, true);
      } else {
        console.log(`🔓 CORS: Allowing origin ${origin} in development mode`);
        callback(null, true);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Set-Cookie'],
  })
);

app.use(apiRateLimit);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    serverUrl: `http://localhost:${process.env.PORT || 8080}`,
  });
});

app.get('/health/rate-limiter', (req, res) => {
  const stats = getRateLimiterStats();
  res.status(200).json({
    status: 'ok',
    rateLimiter: stats,
    timestamp: new Date().toISOString(),
  });
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/jobs', jobRoutes);
app.use('/employers', employerRoutes);

app.use(errorHandler);

if (!process.env.VERCEL && process.env.NODE_ENV !== 'test') {
  const server = app.listen(process.env.PORT || 8080, () => {
    console.log(`🚀 Server listening on http://localhost:${process.env.PORT || 8080} 🚀`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Database: Local Docker PostgreSQL (localhost:5434)`);
  });

  const gracefulShutdown = (signal: string) => {
    console.log(`\n🔄 Received ${signal}. Starting graceful shutdown...`);

    server.close(() => {
      console.log('💯 HTTP server closed.');

      stopCleanup();

      process.exit(0);
    });

    setTimeout(() => {
      console.error('⚠️ Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 30000);
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  process.on('uncaughtException', error => {
    console.error('💥 Uncaught Exception:', error);
    stopCleanup();
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
    stopCleanup();
    process.exit(1);
  });
}

export default app;
