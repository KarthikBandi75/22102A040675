import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import { getStockCorrelation } from '../api';

export default function CorrelationCalculator() {
  const [ticker1, setTicker1] = useState('NVDA');
  const [ticker2, setTicker2] = useState('PYPL');
  const [minutes, setMinutes] = useState(30);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCorrelation = async () => {
    try {
      setLoading(true);
      const res = await getStockCorrelation([ticker1, ticker2], minutes);
      setData(res);
    } catch (err) {
      alert('Error fetching correlation data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          📊 Calculate Stock Correlation
        </Typography>

        <TextField
          label="Ticker 1"
          value={ticker1}
          onChange={(e) => setTicker1(e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Ticker 2"
          value={ticker2}
          onChange={(e) => setTicker2(e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Minutes"
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={fetchCorrelation}>
          Get Correlation
        </Button>

        {loading && <CircularProgress sx={{ mt: 2 }} />}
        {data && (
          <Typography sx={{ mt: 2 }}>
            Correlation between <strong>{data.stock1.ticker}</strong> and{' '}
            <strong>{data.stock2.ticker}</strong>:{' '}
            <strong>{data.correlation}</strong>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
