import axios from "axios";
import { config } from "../config.js";
import cache from "../utils/cache.js";

let tokenCache = null;

export const getToken = async () => {
  if (tokenCache && tokenCache.expires > Date.now()) {
    return tokenCache.token;
  }

  const { data } = await axios.post(config.AUTH_URL, {
    name: config.NAME,
    rollNo: config.ROLL_NO,
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    accessCode: config.ACCESS_CODE,
  });
  console.log(data);
  tokenCache = {
    token: data.access_token,
    expires: Date.now() + (data.expires_in * 1000) - 5000,
  };

  return tokenCache.token;
};

export const fetchStockPrices = async (ticker, minutes) => {
  const cacheKey = `${ticker}-${minutes}`;
  if (cache[cacheKey]) return cache[cacheKey];

  const token = await getToken();
  const { data } = await axios.get(`${config.STOCK_API_URL}/${ticker}?minutes=${minutes}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  cache[cacheKey] = data;
  return data;
};
