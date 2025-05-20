import { Router } from "express";
import { getTotal, getRecentVehicles } from "../controllers/dashboardController";

const router = Router();

router.get("/count", getTotal);
router.get("/vehicle-recent", getRecentVehicles);

export default router;
