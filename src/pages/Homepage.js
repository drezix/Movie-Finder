import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { CircularProgress } from '@mui/material';
import './HomePage.css'; 
import logo from '../assets/moviefinderlogo.png'; 

const HomePage = () => {
  const { movies, loading } = useContext(MovieContext);

  return (
    <div>
      {/* Header */}
      <header className="header">
        {/* Substituindo o texto "Movie Finder" por uma logo */}
        <img src={logo} alt="Movie Finder Logo" className="logo" />
        <div className="search-bar">
          <SearchBar />
        </div>
      </header>

      {/* Container principal */}
      <div className="main-container">
        <h1>Movie Search</h1>
        {loading ? (
          <CircularProgress />
        ) : (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        )}
      </div>
    </div>
  );
};

export default HomePage;
