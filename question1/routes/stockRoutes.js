import express from "express";
import {
  AveragePriceOfStock,
  StockCorrelation,
  getStockList,
  getStockPriceHistory,
} from "../controllers/stockController.js";

const router = express.Router();


router.get("/list", getStockList); 


router.get("/history", getStockPriceHistory); 


router.get("/ticker", AveragePriceOfStock); 


router.get("/correlation", StockCorrelation); 

export default router;
