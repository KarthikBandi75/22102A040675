import express from "express";
import {
  getAveragePriceOfStock,
  getStockCorrelation,
} from "../controllers/stockController.js";

const router = express.Router();

router.get("/ticker", AveragePriceOfStock);
router.get("/correlation", StockCorrelation);

export default router;