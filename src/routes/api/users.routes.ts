import { Router } from "express";
import UserController from '../../controllers/users'

const usersRoutes = Router();

usersRoutes.get("/", UserController.list);
usersRoutes.post("/signup", UserController.signup);
usersRoutes.post("/signin", UserController.signin);

export { usersRoutes };
