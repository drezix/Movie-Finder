import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  if (!movie || !movie.title) {
    console.error("Invalid movie data:", movie);
    return <div className="movie-card error">Invalid movie data</div>;
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Image';

  return (
    <div className="movie-card">
      <img
        src={posterUrl}
        alt={movie.title || "Movie Poster"}
        className="movie-poster"
      />
      <div className="movie-details">
        <h3>{movie.title}</h3>
        <p>{movie.overview || "No overview available."}</p> {/* Exibe texto padrão se overview faltar */}
        <p>Release Date: {movie.release_date || "Unknown"}</p> {/* Texto padrão para data faltante */}
      </div>
    </div>
  );
};

export default MovieCard;
