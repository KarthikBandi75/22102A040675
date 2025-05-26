import {
  fetchStockPrices,
  getToken,
} from "../services/stockService.js";
import {
  calculateAverage,
  calculateCorrelation,
} from "../utils/calcUtils.js";

export const getAverageStockPrice = async (req, res) => {
  const { minutes, ticker } = req.query;
  if (!minutes || !ticker)
    return res.status(400).json({ error: "ticker and minutes are required" });

  try {
    const prices = await fetchStockPrices(ticker, minutes);
    const averageStockPrice = calculateAverage(prices.map(p => p.price));

    res.json({
      ticker,
      averageStockPrice,
      priceHistory: prices,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStockCorrelation = async (req, res) => {
  const { minutes, ticker } = req.query;
  if (!minutes || !ticker || ticker.length !== 2)
    return res.status(400).json({ error: "Exactly 2 tickers are required" });

  try {
    const [ticker1, ticker2] = ticker;

    const prices1 = await fetchStockPrices(ticker1, minutes);
    const prices2 = await fetchStockPrices(ticker2, minutes);

    const timeAlignedPrices1 = prices1.map(p => p.price);
    const timeAlignedPrices2 = prices2.map(p => p.price);

    const correlation = calculateCorrelation(timeAlignedPrices1, timeAlignedPrices2);

    res.json({
      correlation,
      stock1: {
        ticker: ticker1,
        average: calculateAverage(timeAlignedPrices1),
        priceHistory: prices1,
      },
      stock2: {
        ticker: ticker2,
        average: calculateAverage(timeAlignedPrices2),
        priceHistory: prices2,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
