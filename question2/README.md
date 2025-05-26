# 🌐 Stock Market Frontend

## 🧾 Overview

This is a React.js frontend application that interfaces with a stock market backend microservice. It provides two core functionalities:

1. **📉 Stock Price View** – View average stock price over a given time period.
2. **📊 Correlation Heatmap View** – Analyze the relationship between two stock tickers.

---

## 🖥️ Pages & Features

### 🔹 1. Stock Price View

* **User Inputs:**
  * Stock Ticker (e.g., `NVDA`)
  * Time Interval in Minutes (e.g., `30`)
* **Features:**
  * Fetches average stock price from backend
  * Displays:
    * Average stock price
    * Historical price data (list or chart)

---

### 🔹 2. Correlation Heatmap View

* **User Inputs:**
  * Two Stock Tickers (e.g., `AAPL` and `GOOGL`)
* **Features:**
  * Fetches correlation data from backend
  * Displays:
    * Correlation coefficient
    * Visual correlation heatmap or chart

---

## 🛠️ Technologies Used

* **React.js** – Frontend framework using functional components and hooks
* **Material UI** – UI library for styling and layout
* **Axios** – For making API requests to backend

---

## 🖼️ Screenshots

### 🔗 Heatmap Table

![Heatmap View](./HeatMapTable.png)

---

## 📌 Notes

* Make sure the backend service is running and accessible via the configured API URL.
* Customize the UI with additional charts (e.g., line graphs or heatmaps) for better visualization.

