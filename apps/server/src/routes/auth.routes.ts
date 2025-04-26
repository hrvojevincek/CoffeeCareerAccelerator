import express from 'express';
import { getMe, login, logout, signup, refreshToken } from '../controllers/auth.controller';
import { protectRoute } from '../middleware/protectRoute';
import { validateRequest } from '../middleware/validateRequest';
import { loginSchema, signupSchema } from '../lib/validations';

const router = express.Router();

router.get('/me', protectRoute, getMe);
router.post('/signup', validateRequest(signupSchema), signup);
router.post('/login', validateRequest(loginSchema), login);
router.post('/logout', logout);
router.post('/refresh', refreshToken);

export default router;
