import { Router } from "express";
import { ElectionController } from "../controllers/election.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();
const electionController = new ElectionController();

router.post(
  "/party",
  authenticate,
  authorize("EC"),
  electionController.createParty,
);


router.post(
  "/candidate",
  authenticate,
  authorize("EC"),
  electionController.addCandidate,  
);




export default router;
