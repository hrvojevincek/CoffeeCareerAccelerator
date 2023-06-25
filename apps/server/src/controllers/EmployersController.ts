import { NextFunction, Request, Response } from 'express';

import Employers from '../models/Employers';
import jwt from 'jsonwebtoken';
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

  async loginEmployer(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body.data;
      if (!username || !password) {
        throw new Error('Username or password missing');
      }

      const employer = await Employers.findEmployerByUsername(username);

      if (!employer) {
        throw new Error('Employer not found');
      }

      const isPasswordValid = await bcrypt.compare(password, employer.password);

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign(
        { id: employer.id, username: employer.username },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );

      res.status(200).json({ token });
    } catch (e) {
      next(e);
    }
  },

  async getEmployers(req: Request, res: Response, next: NextFunction) {
    try {
      const employers = await Employers.getAll();
      res.json(employers);
    } catch (error) {
      next(error);
    }
  },

  async getEmployer(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const employer = await Employers.getEmployer(Number(id));
      if (employer) {
        res.json(employer);
      } else {
        res.status(404).json({ message: 'employer not found' });
      }
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

  async createJob(req: Request, res: Response, next: NextFunction) {
    try {
      req.body;
    } catch (error) {
      next(error);
    }
  },

  // function deleteEmployer() {}

  // function updateJob() {}

  // function deleteJob() {}
};

export default EmployersController;
