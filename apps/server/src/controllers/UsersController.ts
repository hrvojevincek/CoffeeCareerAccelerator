import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/Users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Prisma } from '@prisma/client';

dotenv.config();

const UsersController = {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, username, email } = req.body.data;
      if (!password || !username || !email) {
        throw new Error('missing pass, username or email');
      }
      const hashPassword = await bcrypt.hash(password, 10);

      await User.createUser(username, hashPassword, email);

      res.status(201).json({ message: 'User created successfully' });
    } catch (e) {
      next(e);
    }
  },

  // async loginUser(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     const authHeader = req.headers.authorization;
  //     if (!authHeader || !authHeader.startsWith('Basic ')) {
  //       res.status(401).json({ error: 'Unauthorized' });
  //       return;
  //     }
  //     const credentials = Buffer.from(
  //       authHeader.split(' ')[1],
  //       'base64'
  //     ).toString();
  //     const [username, password] = credentials.split(':');
  //     const user: Prisma.User | null = await user.findUnique({
  //       where: { username },
  //       select: {
  //         password: true,
  //         username: true,
  //         id: true,
  //       },
  //     });
  //     if (
  //       user &&
  //       (await bcrypt.compare(password, user.password)) &&
  //       user?.username === username
  //     ) {
  //       const secret = process.env.SECRET_SIGN as string;

  //       if (!secret) {
  //         throw new Error('missing secret in .env');
  //       }

  //       const token = jwt.sign({ userId: user.id }, secret, {
  //         expiresIn: '1h',
  //       });
  //       res.status(201).json({ username, token });
  //     } else {
  //       res.status(401).json({ error: 'incorrect authentification' });
  //     }
  //   } catch (e) {
  //     next(e);
  //   }
  // },

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const jobs = await User.getAllUsers();
      res.json(jobs);
    } catch (e) {
      next(e);
    }
  },

  async getUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const user = await User.getUser(Number(id));
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      next(error);
    }
  },

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const { name, city } = req.body;

      const updatedUser = await User.updateUser(parseInt(userId), name, city);
      return res.json(updatedUser);
    } catch (error) {
      res;
      next(error);
    }
  },

  // async deleteUser(req: Request, res: Response, next: NextFunction) {
  // },

  // function createExperience() {}
  // function getExperience() {}
  // function updateExperience() {}
  // function deleteExperience() {}
};

export default UsersController;
