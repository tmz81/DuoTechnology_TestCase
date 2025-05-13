import express from "express";
import cors from "cors";
import { logger } from "./middlewares/logger";
import categoriasRoutes from "./routes/categoriasRoutes";
import marcasRoutes from "./routes/marcasRoutes";
import veiculosRoutes from "./routes/veiculosRoutes";
import testRoutes from "./routes/testRoutes";
const app = express();

app.use(logger);

app.use(cors());
app.use(express.json());

app.use("/categorias", categoriasRoutes);
app.use("/marcas", marcasRoutes);
app.use("/veiculos", veiculosRoutes);
app.use("/test", testRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!...");
});

export default app;
