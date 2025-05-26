import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import { getAverageStock } from '../api';

export default function AverageStockPrice() {
  const [ticker, setTicker] = useState('NVDA');
  const [minutes, setMinutes] = useState(30);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAverage = async () => {
    try {
      setLoading(true);
      const res = await getAverageStock(ticker, minutes);
      setData(res);
    } catch (err) {
      alert('Error fetching stock data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
         Get Average Stock Price
        </Typography>

        <TextField
          label="Ticker"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Minutes"
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={fetchAverage}>
          Get Price
        </Button>

        {loading && <CircularProgress sx={{ mt: 2 }} />}
        {data && (
          <Typography sx={{ mt: 2 }}>
            {data.ticker} Average Price: <strong>${data.averageStockPrice}</strong>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
