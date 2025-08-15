import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { generateTokenAndSetCookie } from '../lib/generateToken';
import jwt from 'jsonwebtoken';
import { config } from '../config/simple-config';

export const signup = async (req: Request, res: Response) => {
  try {
    const { password, username, email, category } = req.body;

    const [existingUser, existingEmail] = await Promise.all([
      prisma.user.findUnique({ where: { username } }),
      prisma.user.findUnique({ where: { email } }),
    ]);

    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    if (existingEmail) {
      return res.status(400).json({ error: 'Email is already taken' });
    }

    // Hash password with higher salt rounds for better security
    const salt = await bcrypt.genSalt(config.auth.bcryptRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword, email, category },
    });

    generateTokenAndSetCookie(String(newUser.id), res);

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      category: newUser.category,
    });
  } catch (error) {
    console.error('Error in signup controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    const dummyHash = '$2b$12$7Sl5OLm/x4HeRzvfP3hP8OpKOA.J0Xcbw3oUjHvy9heM/1bsenYsG';
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || dummyHash);

    if (!user || !isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    generateTokenAndSetCookie(String(user.id), res);

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      category: user.category,
    });
  } catch (error) {
    console.error('Error in login controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: config.server.isProd,
      sameSite: config.server.isProd ? ('none' as const) : ('lax' as const),
    };

    res.clearCookie('access_token', cookieOptions);
    res.clearCookie('refresh_token', cookieOptions);
    res.clearCookie('jwt', cookieOptions); // Backward compatibility

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error in logout controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user?.id,
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
        isActive: true,
        lastLogin: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error in getMe controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.status(401).json({ error: 'No refresh token provided' });
    }

    const decoded = jwt.verify(refreshToken, config.auth.jwtRefreshSecret) as {
      userId: string;
    };

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(decoded.userId),
      },
      select: {
        id: true,
        username: true,
        email: true,
        category: true,
        isActive: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.isActive) {
      return res.status(403).json({ error: 'Account deactivated' });
    }

    generateTokenAndSetCookie(decoded.userId, res);

    res.status(200).json({
      message: 'Token refreshed successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        category: user.category,
      },
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Refresh token expired' });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }
    console.error('Error in refreshToken controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
