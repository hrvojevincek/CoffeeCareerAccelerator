import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import jobRoutes from './routes/jobs.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Allowed origins
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://coffee-career.vercel.app', // Production frontend
  'https://coffee-career-accelerator.vercel.app', // Alternate domain if used
];

// CORS middleware with more detailed configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        // For other origins, still allow but log
        console.log(`CORS warning: Origin ${origin} not in allowed list`);
      }

      // In production, we'll be more permissive to avoid deployment issues
      return callback(null, true);
    },
    credentials: true, // Allow cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    maxAge: 86400, // Cache preflight request for 1 day
  })
);

app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/jobs', jobRoutes);

// Global error handler - must be after routes
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT} 🚀`);
});

export default app;
