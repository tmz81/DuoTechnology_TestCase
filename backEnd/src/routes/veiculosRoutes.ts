import { Router } from "express";
import {
  getAllVeiculos,
  getVeiculoById,
  createVeiculo,
  updateVeiculo,
  deleteVeiculo,
} from "../controllers/veiculosController";

const router = Router();

router.get("/", getAllVeiculos);
router.get("/:id", getVeiculoById);
router.post("/", createVeiculo);
router.put("/:id", updateVeiculo);
router.delete("/:id", deleteVeiculo);

export default router;
