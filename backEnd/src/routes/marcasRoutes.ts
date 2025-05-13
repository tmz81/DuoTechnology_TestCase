import { Router } from "express";
import {
  getAllMarcas,
  getMarcaById,
  createMarca,
  updateMarca,
  deleteMarca,
} from "../controllers/marcasController";

const router = Router();

router.get("/", getAllMarcas);
router.get("/:id", getMarcaById);
router.post("/", createMarca);
router.put("/:id", updateMarca);
router.delete("/:id", deleteMarca);

export default router;
