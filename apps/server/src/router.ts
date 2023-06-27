import { Router } from 'express';
import EmployersController from './controllers/EmployersController';
import UsersController from './controllers/UsersController';
import JobsController from './controllers/JobsController';
import TypeController from './controllers/TypeController';
import ExperienceController from './controllers/ExperienceController';

const router = Router();

//AUTHENTICATION
router.post('/login', TypeController.login);
router.post('/me', TypeController.authVerification);

// EXPERIENCE
router.post('/user/:userId/edit', ExperienceController.createExperience);
router.get('/user/:userId/experiences', ExperienceController.getExperience);

// USER BRO

// router.post('/user/login', UsersController.loginUser);
router.post('/user/signup', UsersController.createUser);
router.get('/users', UsersController.getUsers);
router.get('/user/:userId', UsersController.getUser);
router.put('/users/:userId', UsersController.updateUser);
// router.get('/user/username/:username', UsersController.getUser);
router.get('/user/:userId', UsersController.getUser);
router.put('/user/:userId/edit', UsersController.updateUser);
router.post('/user/application', UsersController.createApplication);

// router.delete('/user/:userId', UsersController.deleteUser);
// router.get('/users/experiences', UsersController.getExperience);
// router.delete('/users/experiences/:id', UsersController.deleteExperience);

//EMPLOYER

// router.post('/login', EmployersController.loginEmployer);
router.post('/employer/signup', EmployersController.createEmployer);
router.get('/employer/', EmployersController.getEmployers);
router.put('/employer/:employerId', EmployersController.updateEmployer);
router.get('/employer/:employerId', EmployersController.getEmployer);
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
