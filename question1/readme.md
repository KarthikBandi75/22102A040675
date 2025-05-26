# 📈 Stock Market Backend Microservice

## 🧾 Overview

This backend microservice provides APIs to interact with stock market data. It serves as a middleware between the frontend application and external stock data providers.

---

## 🚀 Features

### 🔹 Get Average Stock Price

* **Endpoint:** `GET /stocks/:ticker/average-price?minutes=<minutes>`
* **Description:** Fetches the average price of a specific stock over the past N minutes.
* **Query Parameters:**
  * `minutes` (Number): Time range in minutes.

---

### 🔹 Get Stock Correlation

* **Endpoint:** `GET /stocks/correlation?ticker1=<TICKER_1>&ticker2=<TICKER_2>`
* **Description:** Calculates the correlation coefficient between two stock tickers based on recent price data.
* **Query Parameters:**
  * `ticker1` (String): First stock ticker.
  * `ticker2` (String): Second stock ticker.

---

## 🛠️ Technologies Used

* **Node.js** – Server-side JavaScript runtime  
* **Express.js** – Web framework for handling routes  
* **Axios** – For making HTTP requests to external APIs  
* **Custom Utilities** – Helper functions for average and correlation calculations  
* **External API** – Stock data provider integration

---

## 🖼️ Screenshots

### 📊 Average Stock Price Response

![Average Stock Price](./Stockpriceview.png) 

---

## 📌 Notes

* Make sure you have access to the external stock API key if needed.
* For development, use environment variables to securely manage API credentials.
