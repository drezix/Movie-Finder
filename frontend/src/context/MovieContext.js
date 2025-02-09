import React, { createContext, useState, useMemo } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]); // Lista de favoritos
  const [loading, setLoading] = useState(false);

  // Função para adicionar filme aos favoritos
  const addMovieToFavorites = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };

  // Função para remover filme dos favoritos
  const removeMovieFromFavorites = (movieId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.id !== movieId) // Remove o filme pelo id
    );
  };

  const value = useMemo(() => ({
    movies, setMovies, loading, setLoading, favorites, addMovieToFavorites, removeMovieFromFavorites
  }), [movies, loading, favorites]);

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};
