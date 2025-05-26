import { fetchStockData } from "../services/stockService.js";
import { calculateAverage, calculateCorrelation } from "../utils/calcUtils.js";

export const getAveragePriceOfStock = async (req, res) => {
  const { minutes, aggregation, ticker } = req.query;
  if (aggregation !== "average")
    return res.status(400).send({ error: "Invalid aggregation" });

  try {
    const priceHistory = await fetchStockData(ticker, minutes);
    const average = calculateAverage(priceHistory);
    res.json({ ticker, averageStockPrice: average, priceHistory });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const getStockCorrelation = async (req, res) => {
  const { minutes, ticker } = req.query;
  if (!ticker || ticker.length !== 2) {
    return res.status(400).send({ error: "Provide exactly 2 tickers" });
  }

  try {
    const [dataX, dataY] = await Promise.all([
      fetchStockData(ticker[0], minutes),
      fetchStockData(ticker[1], minutes),
    ]);

    const correlation = calculateCorrelation(dataX, dataY);
    res.json({
      correlation,
      stocks: [
        { ticker: ticker[0], priceHistory: dataX },
        { ticker: ticker[1], priceHistory: dataY },
      ],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};