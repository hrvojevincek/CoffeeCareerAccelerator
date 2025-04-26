import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import jobRoutes from './routes/jobs.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

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
