import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import Application from '../models/Application';
import User from '../models/Users';

dotenv.config();

const UsersController = {
  async findUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body.data;

      const user = User.getUserByEmail(email);

      req.body = user;
    } catch (error) {
      next(error);
    }
  },

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, username, email, category } = req.body.data;
      if (!username) {
        throw new Error('Missing parameters: username');
      }
      if (!password) {
        throw new Error('Missing parameters: password');
      }
      const hashPassword = await bcrypt.hash(password, 10);

      await User.createUser(username, hashPassword, email, category);

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      next(error);
    }
  },

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const jobs = await User.getAllUsers();
      res.json(jobs);
    } catch (error) {
      next(error);
    }
  },

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const user = await User.getUserById(parseInt(userId));
      if (user) {
        res.status(201).json(user);
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

      const { email, name, surname, city, bio } = req.body.data || {};

      const updatedUser = await User.updateUser(
        parseInt(userId),
        email || '',
        name || '',
        surname || '',
        city || '',
        bio || ''
      );
      return res.json(updatedUser);
    } catch (error) {
      res;
      next(error);
    }
  },
  async createApplication(req: Request, res: Response, next: NextFunction) {
    try {
      const { jobId, userId } = req.body;
      const newApplication = await Application.createApplication({
        jobId,
        userId,
      });

      res.status(201).json(newApplication);
    } catch (error) {
      res.status(500).json({ message: 'createApp controller fault' });
      next(error);
    }
  },
};

export default UsersController;
