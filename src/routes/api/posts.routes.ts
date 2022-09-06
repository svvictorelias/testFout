import { Router } from "express";
import PostController from '../../controllers/posts'
import authenticate from "../../middlewares/authenticate";

const postsRoutes = Router();

postsRoutes.use(authenticate)
postsRoutes.get("/", PostController.list);
postsRoutes.get("/:id", PostController.listById); 
postsRoutes.post("/", PostController.create);
postsRoutes.put("/:id", PostController.update); 
postsRoutes.delete("/:id", PostController.delete); 

export { postsRoutes };
