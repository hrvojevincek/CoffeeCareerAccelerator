//USER

router.post('/users', UsersController.createUser);
router.get('/login', UsersController.loginUser);

router.get('/users/:userId', UsersController.getUser);
router.get('/users/', UsersController.getUsers);
router.put('/users/:userId', UsersController.updateUser);
router.delete('/user/:userId', UserController.deleteUser);

router.post('/users/experience', UsersController.createExperience);
router.get('/users/experience', UsersController.getExperience);
router.put('/users/experience/:id', UsersController.updateExperience);
router.delete('/users/experience/:id', UsersController.deleteExperience);

//EMPLOYER

router.post('/employer', EmployerController.createEmployer);
router.get('/login', EmployerController.loginEmployer);
router.get('/employer/', EmployerController.getEmployers);
router.get('/employer/:employerId', EmployerController.getEmployer);
router.put('/employer/:employerId', EmployerController.updateEmployer);
router.delete('/employer/:employerId', EmployerController.deleteEmployer);

router.post('/employer/:employerId/job', EmployerController.createJob);
router.put('/employer/:employerId/job/:jobId', EmployerController.updateJob);
router.delete('/employer/:employerId/job/:jobId', EmployerController.deleteJob);

// router.get('/job', jobController.getJobs); ????
