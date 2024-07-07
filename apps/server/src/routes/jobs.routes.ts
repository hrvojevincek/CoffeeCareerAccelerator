import { Router } from "express";
import JobsController from "../controllers/JobsController";
import { protectRoute } from "../middleware/protectRoute";

const jobRoutes = Router();

jobRoutes.post("/jobs", protectRoute, JobsController.createJob);

jobRoutes.get("/jobs", protectRoute, JobsController.getJobs);

jobRoutes.get("/jobs/:id", protectRoute, JobsController.getJob);

jobRoutes.get(
  "/jobs/categories/:category",
  protectRoute,
  JobsController.findByCategory
);

jobRoutes.delete("/jobs/:id", protectRoute, JobsController.deleteJob);

export default jobRoutes;
