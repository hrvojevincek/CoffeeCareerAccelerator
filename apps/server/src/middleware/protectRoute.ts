import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { config } from '../config/environment';
import { AuthenticatedUser } from '../../types';

interface JWTPayload {
  userId: number;
  iat: number;
  exp: number;
}

// Auth middleware to protect routes
export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({
        error: 'Unauthorized: No Token Provided',
        code: 'NO_TOKEN',
      });
    }

    const decoded = jwt.verify(token, config.auth.jwtSecret) as JWTPayload;

    if (!decoded) {
      return res.status(401).json({
        error: 'Unauthorized: Invalid Token',
        code: 'INVALID_TOKEN',
      });
    }

    // Check if user still exists and is active
    const user = (await prisma.user.findUnique({
      where: {
        id: Number(decoded.userId),
      },
      select: {
        id: true,
        username: true,
        email: true,
        category: true,
        name: true,
        surname: true,
        city: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
        isActive: true,
        lastLogin: true,
      },
    })) as AuthenticatedUser | null;

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        error: 'Account deactivated',
        code: 'ACCOUNT_DEACTIVATED',
      });
    }

    // Update last activity
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    req.user = user;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        error: 'Token expired',
        code: 'TOKEN_EXPIRED',
      });
    }

    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        error: 'Invalid token',
        code: 'INVALID_TOKEN',
      });
    }

    console.error('Error in protectRoute middleware:', err);
    return res.status(500).json({
      error: 'Internal Server Error',
      code: 'INTERNAL_ERROR',
    });
  }
};

// Role-based access control
export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
        code: 'AUTH_REQUIRED',
      });
    }

    const user = req.user as AuthenticatedUser;
    if (!user.category || !roles.includes(user.category)) {
      return res.status(403).json({
        error: 'Insufficient permissions',
        code: 'INSUFFICIENT_PERMISSIONS',
      });
    }

    next();
  };
};
