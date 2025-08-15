import { NextFunction, Request, Response } from 'express';

import Experience from '../models/Experience';

const ExperienceController = {
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
