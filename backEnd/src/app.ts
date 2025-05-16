import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import requestLogger from "./middlewares/requestLogger";
import categoryRoutes from "./routes/categoryRoutes";
import brandsRoutes from "./routes/brandsRoutes";
import vehiclesRoutes from "./routes/vehiclesRoutes";
import homeRoutes from "./routes/homeRoutes";

const app = express();

app.use(requestLogger);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...🚀️");
});

app.use("/auth", authRoutes);
app.use("/total", homeRoutes);
app.use("/vehicles", vehiclesRoutes);
app.use("/brands", brandsRoutes);
app.use("/categorys", categoryRoutes);

export default app;
