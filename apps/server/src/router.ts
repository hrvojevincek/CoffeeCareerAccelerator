import { Router } from 'express';
import EmployersController from './controllers/EmployersController';
import UsersController from './controllers/UsersController';
const router = Router();

router.post('/users', UsersController.createUser);
router.get('/users/login', UsersController.loginUser);

router.get('/users/:userId', UsersController.getUser);
router.get('/users/', UsersController.getUsers);
router.put('/users/:userId', UsersController.updateUser);
router.delete('/user/:userId', UsersController.deleteUser);

router.post('/users/experiences', UsersController.createExperience);
router.get('/users/experiences', UsersController.getExperience);
router.put('/users/experiences/:id', UsersController.updateExperience);
router.delete('/users/experiences/:id', UsersController.deleteExperience);

//EMPLOYER

router.post('/employers', EmployersController.createEmployer);
router.get('/employers/login', EmployersController.loginEmployer);
router.get('/employers/', EmployersController.getEmployers);
router.get('/employers/:employerId', EmployersController.getEmployer);
router.put('/employers/:employerId', EmployersController.updateEmployer);
router.delete('/employers/:employerId', EmployersController.deleteEmployer);

router.post('/employer/:employerId/jobs', EmployersController.createJob);
router.put('/employer/:employerId/jobs/:jobId', EmployersController.updateJob);
router.delete(
  '/employer/:employerId/jobs/:jobId',
  EmployersController.deleteJob
);

// router.get('/job', jobController.getJobs); ????

export default router;
