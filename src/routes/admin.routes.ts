// src/routes/admin.routes.ts
import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();
const adminController = new AdminController();


router.get(
  "/users",
  authenticate,
  authorize("ADMIN"),
  adminController.getAllUsers,
);

router.post(
  "/constituency",
  authenticate,
  authorize("ADMIN"),
  adminController.createConstituency,
);

router.patch(
  "/promote-ec/:userId",
  authenticate,
  authorize("ADMIN"),
 adminController.promoteUserToEC,
);

export default router;