import express from "express";
import loginController from "./controller/LoginController";
import { ProjectController }  from "./controller/ProjectController";
import authMiddleware from "./middleware/auth";

const router = express.Router();
const projectController = new ProjectController();

router.post("/login", loginController.login);
router.post("/auth", loginController.authenticate);

router.post("/project", authMiddleware, projectController.create);
router.put("/project", authMiddleware, projectController.update);
router.delete("/project", authMiddleware, projectController.delete);
router.get("/projects", authMiddleware, projectController.list);

export default router;