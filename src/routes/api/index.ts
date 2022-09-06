import { Router } from "express";
import { postsRoutes } from "./posts.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/api/posts", postsRoutes);
router.use("/api/users", usersRoutes);

export { router };
