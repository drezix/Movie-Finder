import React, { createContext, useState, useMemo } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const value = useMemo(() => ({ movies, setMovies, loading, setLoading }), [movies, loading]);

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};
