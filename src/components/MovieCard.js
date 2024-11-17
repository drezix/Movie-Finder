import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-details">
        <h3>{movie.title}</h3>
        <p>{movie.overview}</p>
        <p>Release Date: {movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
