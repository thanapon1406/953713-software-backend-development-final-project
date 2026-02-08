// src/routes/admin.routes.ts
import { Router } from "express";

import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();


router.post(
  "/constituency",
  authenticate,
  authorize("ADMIN"),
 
);
router.patch(
  "/promote-ec/:userId",
  authenticate,
  authorize("ADMIN"),
 
);

export default router;