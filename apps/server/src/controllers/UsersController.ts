import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/Users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body.data;
      if (!username || !password) {
        throw new Error('Username or password missing');
      }

      const user = await User.findUserByUsername(username);

      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET as string,
        {
          expiresIn: '1h',
        }
      );

      res.status(200).json({ token });
    } catch (e) {
      next(e);
    }
  },

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const jobs = await User.getAllUsers();
      res.json(jobs);
    } catch (e) {
      next(e);
    }
  },

  async getUser(req: Request, res: Response, next: NextFunction) {
    const { username } = req.params;

    try {
      const user = await User.getUser(String(username));
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
