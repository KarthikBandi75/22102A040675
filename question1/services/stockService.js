import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

let accessToken = null;

async function getAuthToken() {
  if (accessToken) return accessToken;

  const response = await axios.post(`${process.env.BASE_URL}/auth`, {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    rollNo: process.env.ROLL_NO,
    name: process.env.NAME,
    accessCode: process.env.ACCESS_CODE,
    email: process.env.EMAIL,
  });

  accessToken = response.data.access_token;
  console.log(accessToken);
  console.log("Got access token");
  return accessToken;
}

export async function fetchStockData(ticker, minutes) {
  const token = await getAuthToken();

  const url = `${process.env.BASE_URL}/stocks/${ticker}?minutes=${minutes}`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data);

  return response.data.map((entry) => entry.price);
}

export async function fetchStockList() {
  const token = await getAuthToken();

  const url = `${process.env.BASE_URL}/stocks`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}