import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import jobRoutes from './routes/jobs.routes';
import { errorHandler } from './middleware/errorHandler';
import { rateLimit } from './middleware/rateLimit';
import { config } from './config/environment';

const app = express();

// Apply middleware
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests)
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
app.use(rateLimit);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    environment: config.server.nodeEnv,
    serverUrl: config.urls.server(),
  });
});

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/jobs', jobRoutes);

// Global error handler - must be after routes
app.use(errorHandler);

app.listen(config.server.port, () => {
  console.log(`🚀 Server listening on ${config.urls.server()} 🚀`);
});

export default app;
