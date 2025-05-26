import express from "express";
import {
  getAveragePriceOfStock,
  getStockCorrelation,
} from "../controllers/stockController.js";

const router = express.Router();

router.get("/ticker", getAveragePriceOfStock);
router.get("/correlation", getStockCorrelation);

export default router;