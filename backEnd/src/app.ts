import express from "express";
import cors from "cors";
import requestLogger from "./middlewares/requestLogger";
import categoryRoutes from "./routes/categoryRoutes";
import brandsRoutes from "./routes/brandsRoutes";
import vehiclesRoutes from "./routes/vehiclesRoutes";
import testRoutes from "./routes/testRoutes";
const app = express();

app.use(requestLogger);

app.use(cors());
app.use(express.json());

app.use("/categorys", categoryRoutes);
app.use("/brands", brandsRoutes);
app.use("/vehicles", vehiclesRoutes);
app.use("/test", testRoutes);

app.get("/", (req, res) => {
  res.send("Server is running...🚀️");
});

export default app;
