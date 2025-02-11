import React, { createContext, useState, useMemo } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]); 
  const [loading, setLoading] = useState(false);

  
  const addMovieToFavorites = (movie) => {
    console.log("Adicionando filme aos favoritos:", movie); 
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };


  const removeMovieFromFavorites = (movieId) => {
    console.log("Removendo filme com ID:", movieId); 
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter((movie) => movie.id !== movieId);
      console.log("Novos favoritos após remoção:", newFavorites); 
      return newFavorites;
    });
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