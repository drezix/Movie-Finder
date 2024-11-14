import React from 'react';
import { MovieProvider } from './context/MovieContext';
import HomePage from './pages/Homepage';

function App() {
  return (
    <MovieProvider>
      <HomePage />
    </MovieProvider>
  );
}

export default App;
