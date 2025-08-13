import { Router } from 'express';
import JobsController from '../controllers/JobsController';
import { protectRoute } from '../middleware/protectRoute';

const jobRoutes = Router();

jobRoutes.post('/', protectRoute, JobsController.createJob);

jobRoutes.get('/', JobsController.getJobs);

jobRoutes.get('/categories/:category', JobsController.findByCategory);

jobRoutes.get('/:id', JobsController.getJob);

jobRoutes.delete('/:id', protectRoute, JobsController.deleteJob);

export default jobRoutes;
