import { Router } from 'express';
import EmployersController from './controllers/EmployersController';
import UsersController from './controllers/UsersController';
import JobsController from './controllers/JobsController';

const router = Router();

router.post('/users/login', UsersController.loginUser);
router.post('/user/signup', UsersController.createUser);
router.get('/users', UsersController.getUsers);
router.get('/users/:userId', UsersController.getUser);
router.put('/users/:userId', UsersController.updateUser);
router.get('/user/username/:username', UsersController.getUser);

// router.delete('/user/:userId', UsersController.deleteUser);

// router.post('/users/experiences', UsersController.createExperience);
// router.get('/users/experiences', UsersController.getExperience);
// router.put('/users/experiences/:id', UsersController.updateExperience);
// router.delete('/users/experiences/:id', UsersController.deleteExperience);

router.post('/employers/login', EmployersController.loginEmployer);
router.post('/employers/singup', EmployersController.createEmployer);
router.get('/employers/', EmployersController.getEmployers);
router.put('/employer/:employerId', EmployersController.updateEmployer);
router.get('/employers/:employerId', EmployersController.getEmployer);
router.post('/employer/:employerId/jobs', EmployersController.createJob);

// router.delete('/employers/:employerId', EmployersController.deleteEmployer);
// router.put('/employer/:employerId/jobs/:jobId', EmployersController.updateJob);
// router.delete('/employer/:employerId/jobs/:jobId', EmployersController.deleteJob);

//!=====================================================JOBS

router.get('/jobs', JobsController.getJobs);
router.get('/jobs/:id', JobsController.getJob);
router.post('/jobs', JobsController.createJob);
router.get('/jobs/categories/:category', JobsController.findByCategory);
router.delete('/jobs/:id', JobsController.deleteJob);

export default router;
