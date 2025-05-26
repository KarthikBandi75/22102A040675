import express from "express";
import {
  getAverageStockPrice,
  getStockCorrelation,
} from "../controllers/stockController.js";

const router = express.Router();

router.get("/ticker", getAverageStockPrice);
router.get("/correlation", getStockCorrelation);

export default router;
