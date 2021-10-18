import express from "express";
import loginController from "./controller/LoginController";

const router = express.Router();

router.post("/login", loginController.login);

export default router;