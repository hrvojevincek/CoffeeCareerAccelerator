import { NextFunction, Request, Response } from 'express';

import Employers from '../models/Employers';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const EmployersController = {
  async createEmployer(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, email } = req.body.data;
      if (!password || !username || !email) {
        throw new Error('missing pass, username or email');
      }
      const hashPassword = await bcrypt.hash(password, 10);

      await Employers.createEmployer(username, hashPassword, email);

      res.status(201).json({ message: 'Employer created successfully' });
    } catch (e) {
      next(e);
    }
  },
  // async loginEmployer(req: Request, res: Response, next: NextFunction) {}

  async getEmployers(req: Request, res: Response, next: NextFunction) {
    try {
      const employers = await Employers.getAll();
      res.json(employers);
    } catch (error) {
      next(error);
    }
  },

  async updateEmployer(req: Request, res: Response, next: NextFunction) {
    try {
      const { employerId } = req.params;

      const { name, logoUrl, website, location } = req.body;

      const updatedEmployer = await Employers.updateEmployer(
        parseInt(employerId),
        name,
        logoUrl,
        website,
        location
      );
      return res.json(updatedEmployer);
    } catch (error) {
      res;
      next(error);
    }
  },

  // function deleteEmployer() {}

  // function createJob() {}

  // function updateJob() {}

  // function deleteJob() {}
};

export default EmployersController;
