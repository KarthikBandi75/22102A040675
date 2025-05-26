import express from "express";
import cors from "cors";
import stockRoutes from "./routes/stockRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/stocks", stockRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
