import { NextFunction, Request, Response } from 'express';

import dotenv from 'dotenv';
import Experience from '../models/Experience';

dotenv.config();

const ExperienceController = {
  async createExperience(req: Request, res: Response, next: NextFunction) {
    console.log('EXPERIENCE====>', req.body.data);
    try {
      const { userId } = req.params;

      const { jobtitle, company, dates, description } = req.body.data || {};

      const createExp = await Experience.createExp(
        jobtitle,
        company,
        dates,
        description,
        parseInt(userId)
      );
      return res.status(201).json(createExp);
    } catch (error) {
      res;
      next(error);
    }
  },

  async getExperience(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const experience = await Experience.getAll(parseInt(userId));
      res.status(200).json(experience);
    } catch (e) {
      next(e);
    }
  },
};

export default ExperienceController;
