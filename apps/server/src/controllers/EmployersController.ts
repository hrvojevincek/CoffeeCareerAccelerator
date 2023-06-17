import { NextFunction, Request, Response } from 'express';
import Employers from '../models/Employers';

import dotenv from 'dotenv';

dotenv.config();

const EmployersController = {
  async createEmployer(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, name, logoUrl, website } = req.body;
      const employer = await Employers.create(id, name, logoUrl, website);
      res.status(201).json(employer);
    } catch (error) {
      next(error);
    }
  },

  // function loginEmployer() {}

  // function getEmployers() {}

  async getEmployers(req: Request, res: Response, next: NextFunction) {
    try {
      const employers = await Employers.getAll();
      res.json(employers);
    } catch (error) {
      next(error);
    }
  },

  // function updateEmployer() {}

  // function deleteEmployer() {}

  // function createJob() {}

  // function updateJob() {}

  // function deleteJob() {}
};

export default EmployersController;
