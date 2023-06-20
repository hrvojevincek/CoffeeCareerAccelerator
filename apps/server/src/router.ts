import { Router } from 'express';
import EmployersController from './controllers/EmployersController';
// import UsersController from './controllers/UsersController';
import JobsController from './controllers/JobsController';

const router = Router();

//!===================================================================USER
// router.post('/users', UsersController.createUser);
// router.get('/users/:userId', UsersController.getUser);

// router.get('/users/login', UsersController.loginUser);

// router.get('/users/', UsersController.getUsers);
// router.put('/users/:userId', UsersController.updateUser);
// router.delete('/user/:userId', UsersController.deleteUser);

// router.post('/users/experiences', UsersController.createExperience);
// router.get('/users/experiences', UsersController.getExperience);
// router.put('/users/experiences/:id', UsersController.updateExperience);
// router.delete('/users/experiences/:id', UsersController.deleteExperience);

//!===================================================================EMPLOYER

router.post('/employers', EmployersController.createEmployer);
router.get('/employers/', EmployersController.getEmployers);
// router.get('/employers/login', EmployersController.loginEmployer);
// router.get('/employers/:employerId', EmployersController.getEmployer);
// router.put('/employers/:employerId', EmployersController.updateEmployer);
// router.delete('/employers/:employerId', EmployersController.deleteEmployer);

// router.post('/employer/:employerId/jobs', EmployersController.createJob);
// router.put('/employer/:employerId/jobs/:jobId', EmployersController.updateJob);
// router.delete(
//   '/employer/:employerId/jobs/:jobId',
//   EmployersController.deleteJob
// );

//!=====================================================JOBS

router.get('/jobs', JobsController.getJobs);
router.post('/jobs', JobsController.createJob);
router.get('/jobs/categories/:category', JobsController.findByCategory);
router.delete('/jobs/:id', JobsController.deleteJob);

router.get('/jobs/:id', JobsController.getJob);

export default router;
