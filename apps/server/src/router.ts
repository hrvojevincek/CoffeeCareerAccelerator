import { Router } from "express";
const router = Router();

router.post("/users", UsersController.createUser);
router.get("/users/login", UsersController.loginUser);

router.get("/users/:userId", UsersController.getUser);
router.get("/users/", UsersController.getUsers);
router.put("/users/:userId", UsersController.updateUser);
router.delete("/user/:userId", UserController.deleteUser);

router.post("/users/experiences", UsersController.createExperience);
router.get("/users/experiences", UsersController.getExperience);
router.put("/users/experiences/:id", UsersController.updateExperience);
router.delete("/users/experiences/:id", UsersController.deleteExperience);

//EMPLOYER

router.post("/employers", EmployerController.createEmployer);
router.get("/employers/login", EmployerController.loginEmployer);
router.get("/employers/", EmployerController.getEmployers);
router.get("/employers/:employerId", EmployerController.getEmployer);
router.put("/employers/:employerId", EmployerController.updateEmployer);
router.delete("/employers/:employerId", EmployerController.deleteEmployer);

router.post("/employer/:employerId/jobs", EmployerController.createJob);
router.put("/employer/:employerId/jobs/:jobId", EmployerController.updateJob);
router.delete(
  "/employer/:employerId/jobs/:jobId",
  EmployerController.deleteJob
);

// router.get('/job', jobController.getJobs); ????

export default router;
