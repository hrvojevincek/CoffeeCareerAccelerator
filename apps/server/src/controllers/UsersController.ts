import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/Users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Experience from '../models/Experience';

dotenv.config();

const UsersController = {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, username, email, category } = req.body.data;
      if (username === undefined) {
        throw new Error('Missing parameters: username');
      }
      if (password === undefined) {
        throw new Error('Missing parameters: password');
      }
      const hashPassword = await bcrypt.hash(password, 10);

      await User.createUser(username, hashPassword, email, category);

      res.status(201).json({ message: 'User created successfully' });
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
    try {
      const { userId } = req.params;

      const user = await User.getUser(parseInt(userId));
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
      const newApplication = await prisma.application.create({
        data: {
          jobId: jobId,
          userId: userId,
        },
      });

      res.status(201).json(newApplication);
    } catch (error) {
      next(error);
    }
  },

  // function createExperience() {}
  // function getExperience() {}
  // function updateExperience() {}
  // function deleteExperience() {}
};

export default UsersController;
