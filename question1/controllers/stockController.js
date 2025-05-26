import { fetchStockData, fetchStockList } from "../services/stockService.js";
import { calculateAverage, calculateCorrelation } from "../utils/calcUtils.js";


export const getStockList = async (req, res) => {
  try {
    const stocks = await fetchStockList();
    res.json({ stocks });
  } catch (error) {
    console.error("Error fetching stock list:", error);
    res.status(500).json({ error: error.message });
  }
};


export const getStockPriceHistory = async (req, res) => {
  const { ticker, minutes } = req.query;

  if (!ticker || !minutes) {
    return res.status(400).json({ error: "ticker and minutes are required" });
  }

  try {
    const stockPriceHistory = await fetchStockData(ticker, minutes);
    res.json({
      stockTicker: ticker,
      priceHistory: stockPriceHistory,
    });
  } catch (error) {
    console.error("Error fetching stock price history:", error);
    res.status(500).json({ error: error.message });
  }
};


export const AveragePriceOfStock = async (req, res) => {
  const { minutes, aggregation, ticker } = req.query;

  if (aggregation !== "average") {
    return res.status(400).send({ error: "Invalid aggregation" });
  }

  try {
    const stockPriceHistory = await fetchStockData(ticker, minutes);
    const averagePrice = calculateAverage(stockPriceHistory);

    res.json({
      stockTicker: ticker,
      averageStockPrice: averagePrice,
      priceHistory: stockPriceHistory,
    });
  } catch (error) {
    console.error("Error calculating average stock price:", error);
    res.status(500).json({ error: error.message });
  }
};


export const StockCorrelation = async (req, res) => {
  const { minutes, ticker } = req.query;

  
  if (!ticker || ticker.length !== 2) {
    return res
      .status(400)
      .json({ error: "Provide exactly 2 stock tickers as ?ticker=NVDA&ticker=PYPL" });
  }

  try {
    const [stockDataA, stockDataB] = await Promise.all([
      fetchStockData(ticker[0], minutes),
      fetchStockData(ticker[1], minutes),
    ]);

    const correlationValue = calculateCorrelation(stockDataA, stockDataB);

    res.json({
      correlation: correlationValue,
      stocks: [
        { stockTicker: ticker[0], priceHistory: stockDataA },
        { stockTicker: ticker[1], priceHistory: stockDataB },
      ],
    });
  } catch (error) {
    console.error("Error calculating correlation:", error);
    res.status(500).json({ error: error.message });
  }
};
