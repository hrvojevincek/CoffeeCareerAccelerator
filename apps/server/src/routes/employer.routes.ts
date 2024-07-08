import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute";
import EmployersController from "../controllers/EmployersController";

const employerRoutes = Router();

employerRoutes.post(
  "/employer/signup",
  protectRoute,
  EmployersController.createEmployer
);

employerRoutes.get(
  "/employer/",
  protectRoute,
  EmployersController.getEmployers
);

employerRoutes.put(
  "/employer/:employerId",
  protectRoute,
  EmployersController.updateEmployer
);
employerRoutes.get(
  "/employer/:employerId",
  protectRoute,
  EmployersController.getEmployer
);
employerRoutes.post(
  "/employer/:employerId/jobs",
  protectRoute,
  EmployersController.createJob
);

export default employerRoutes;
