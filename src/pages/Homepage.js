import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { CircularProgress } from '@mui/material';

const HomePage = () => {
  const { movies, loading } = useContext(MovieContext);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Movie Search</h1>
      <SearchBar />
      {loading ? (
        <CircularProgress />
      ) : (
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      )}
    </div>
  );
};

export default HomePage;


