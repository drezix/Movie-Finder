import React, { createContext, useState, useMemo } from 'react';
import axios from "axios";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]); 
  const [loading, setLoading] = useState(false);

  
  const addMovieToFavorites = (movie) => {
    console.log("Adicionando filme aos favoritos:", movie); 
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };


  const removeMovieFromFavorites = async (movieId) => {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/movies/${movieId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    } catch (err) {
        console.error("Delete error:", err);
    }
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