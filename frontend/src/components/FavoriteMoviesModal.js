import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard"; // Componente para renderizar os filmes

const FavoritesModal = ({ onClose }) => {
  const { favorites, removeMovieFromFavorites } = useContext(MovieContext); // Acesso ao contexto

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Meus Filmes Favoritos</h2>
        {favorites.length > 0 ? (
          <div>
            {favorites.map((movie) => (
              <div key={movie.id} className="favorite-movie-card">
                <MovieCard movie={movie} />
                <button
                  onClick={() => removeMovieFromFavorites(movie.id)} // Passando o id do filme
                  className="remove-button"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Você ainda não tem filmes favoritos.</p>
        )}
        <button onClick={onClose} className="close-button">Fechar</button>
      </div>
    </div>
  );
};

export default FavoritesModal;
