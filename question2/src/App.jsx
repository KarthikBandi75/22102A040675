import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Home from './pages/Home';
import Correlation from './pages/Correlation';

export default function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Stock Dashboard
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Average Price
          </Button>
          <Button color="inherit" component={Link} to="/correlation">
            Correlation
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/correlation" element={<Correlation />} />
        </Routes>
      </Container>
    </>
  );
}
