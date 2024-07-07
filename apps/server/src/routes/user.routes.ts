import express from "express";
import UsersController from "../controllers/users.controller";
import { protectRoute } from "../middleware/protectRoute";

const userRoutes = express.Router();

userRoutes.get("/user/:userId", protectRoute, UsersController.getUser);

userRoutes.post(
  "/user/application",
  protectRoute,
  UsersController.createApplication
);

userRoutes.put("/user/:userId", protectRoute, UsersController.updateUser);

userRoutes.get("/users", protectRoute, UsersController.getUsers);

export default userRoutes;
