import { NextFunction, Request, Response } from 'express';
import Jobs from '../models/Jobs';
import dotenv from 'dotenv';

dotenv.config();

const JobsController = {
  async createJob(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, title, description, location, employerId } = req.body;
      const job = await Jobs.create(
        id,
        title,
        description,
        location,
        employerId
      );
      res.status(201).json(job);
    } catch (error) {
      next(error);
    }
  },
  async getJobs(req: Request, res: Response, next: NextFunction) {
    try {
      const jobs = await Jobs.getAll();
      res.json(jobs);
    } catch (e) {
      next(e);
    }
  },
  async deleteJob(req: Request, res: Response, next: NextFunction) {},
};

export default JobsController;
