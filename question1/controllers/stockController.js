import { fetchStockData } from "../services/stockService.js";
import { calculateAverage, calculateCorrelation } from "../utils/calcUtils.js";

export const AveragePriceOfStock = async (req, res) => {
  const { minutes, aggregation, ticker: stockTicker } = req.query;

  if (aggregation !== "average") {
    return res.status(400).send({ error: "Invalid aggregation" });
  }

  try {
    const stockPriceHistory = await fetchStockData(stockTicker, minutes);
    const averagePrice = calculateAverage(stockPriceHistory);

    res.json({
      stockTicker,
      averageStockPrice: averagePrice,
      priceHistory: stockPriceHistory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const StockCorrelation = async (req, res) => {
  const { minutes, ticker: stockTickers } = req.query;

  if (!stockTickers || stockTickers.length !== 2) {
    return res.status(400).send({ error: "Provide exactly 2 stock tickers" });
  }

  try {
    const [stockDataA, stockDataB] = await Promise.all([
      fetchStockData(stockTickers[0], minutes),
      fetchStockData(stockTickers[1], minutes),
    ]);

    const correlationValue = calculateCorrelation(stockDataA, stockDataB);

    res.json({
      correlation: correlationValue,
      stocks: [
        { stockTicker: stockTickers[0], priceHistory: stockDataA },
        { stockTicker: stockTickers[1], priceHistory: stockDataB },
      ],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
