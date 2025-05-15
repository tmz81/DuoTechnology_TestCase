import { Router } from "express";
import { login, getCurrentUser, createUser } from "../controllers/authController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", login);
router.post("/signup", createUser);
router.get("/me", authenticate, getCurrentUser);

export default router;
