// src/routes/auth.routes.ts
import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
const authController = new AuthController();

router.get("/me", authenticate, authController.getProfile);

export default router;
