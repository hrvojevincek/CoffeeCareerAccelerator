import { NextFunction, Request, Response } from 'express';
import Jobs from '../models/Jobs';
import dotenv from 'dotenv';

dotenv.config();

const JobsController = {
  async createJob(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, categories, description, location, money, employer } =
        req.body;
      const job = await Jobs.create(
        title,
        categories,
        description,
        location,
        money,
        employer
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

  async getJob(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const job = await Jobs.getJob(Number(id));
      if (job) {
        res.json(job);
      } else {
        res.status(404).json({ message: 'Job not found' });
      }
    } catch (error) {
      next(error);
    }
  },

  async deleteJob(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const job = await Jobs.deleteJob(Number(id));
      if (job) {
        res.json(job);
      } else {
        res.status(404).json({ message: 'Job not found' });
      }
    } catch (error) {
      next(error);
    }
  },

  async findByCategory(req: Request, res: Response, next: NextFunction) {
    const { category } = req.params;

    try {
      const jobs = await Jobs.findByCategory(category);
      res.json(jobs);
    } catch (error) {
      next(error);
    }
  },
};

export default JobsController;
