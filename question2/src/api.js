import axios from 'axios';

const BASE_URL = 'http://localhost:5000/stocks';

export const getAverageStock = async (ticker, minutes) => {
  const res = await axios.get(`${BASE_URL}/ticker`, {
    params: { ticker, minutes },
  });
  return res.data;
};

export const getStockCorrelation = async (tickers, minutes) => {
  const res = await axios.get(`${BASE_URL}/correlation`, {
    params: { ticker: tickers, minutes },
    paramsSerializer: (params) =>
      `ticker=${params.ticker[0]}&ticker=${params.ticker[1]}&minutes=${params.minutes}`,
  });
  return res.data;
};
