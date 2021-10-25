import express from "express";
import loginController from "./controller/LoginController";
import authMiddleware from "./middleware/auth";

const router = express.Router();

router.post("/login", loginController.login);
router.post("/auth", loginController.authenticate);

export default router;