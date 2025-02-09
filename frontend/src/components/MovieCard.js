import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  // Verificando se o filme tem dados válidos
  if (!movie || !movie.title) {
    console.error("Invalid movie data:", movie);
    return <div className="movie-card error">Invalid movie data</div>;
  }

  // Definindo a URL do poster, com uma imagem padrão caso não exista
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Image';

  // Extrair o ano da release_date (caso exista)
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown";

  // Verificar se os gêneros existem
  const genres = movie.genres && movie.genres.length > 0 ? movie.genres.map(genre => genre.name).join(", ") : "No genres available";

  return (
    <div className="movie-card">
      <img
        src={posterUrl}
        alt={movie.title || "Movie Poster"}
        className="movie-poster"
      />
      <div className="movie-details">
        <h3>{movie.title}</h3>
        <p><strong>Ano:</strong> {releaseYear}</p> {/* Exibe o ano extraído */}
        <p><strong>Gênero:</strong> {genres}</p> {/* Exibe os gêneros, se existirem */}
      </div>
    </div>
  );
};

export default MovieCard;
