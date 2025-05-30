import express from 'express';
import { getMe, login, logout, signup, refreshToken } from '../controllers/auth.controller';
import { protectRoute } from '../middleware/protectRoute';
import { validateRequest } from '../middleware/validateRequest';
import { loginSchema, signupSchema } from '../lib/validations';
import { createRateLimit } from '../middleware/rateLimit';

const router = express.Router();

const authRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000,
  maxRequests: 5,
});

const signupRateLimit = createRateLimit({
  windowMs: 60 * 60 * 1000,
  maxRequests: 3,
});

router.get('/cookie-test', (req, res) => {
  res.status(200).json({
    message: 'Cookie test endpoint',
    cookies: req.cookies,
    headers: {
      origin: req.headers.origin,
      referer: req.headers.referer,
    },
  });
});

router.get('/me', protectRoute, getMe);
router.post('/signup', signupRateLimit, validateRequest(signupSchema), signup);
router.post('/login', authRateLimit, validateRequest(loginSchema), login);
router.post('/logout', logout);
router.post('/refresh', refreshToken);

export default router;
