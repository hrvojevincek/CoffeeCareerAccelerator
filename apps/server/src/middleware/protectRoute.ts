import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { config } from '../config/environment';

// ! DO KOKIES IN SESSION - as youll have clerk

// Auth middleware to protect routes
export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check for access token first, then fall back to old jwt token for backward compatibility
    const token = req.cookies.access_token || req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No Token Provided' });
    }

    const decoded = jwt.verify(token, config.auth.jwtSecret) as {
      userId: number;
    };

    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized: Invalid Token' });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(decoded.userId),
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        category: true,
        name: true,
        surname: true,
        city: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    // Check if the error is because the token is expired
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        error: 'Token expired',
        code: 'TOKEN_EXPIRED',
      });
    }

    console.log('Error in protectRoute middleware', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
