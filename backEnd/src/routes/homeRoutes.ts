import { Router } from "express";
import { getTotal } from "../controllers/homeController";

const router = Router();

router.get("/", getTotal);

export default router;
