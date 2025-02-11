import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

const FavoriteMoviesModal = ({ onClose }) => {
  const { favorites, removeMovieFromFavorites } = useContext(MovieContext); // Acesso ao contexto

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Meus Filmes Favoritos</h2>
        {favorites.length > 0 ? (
          <div>
            {favorites.map((movie) => {
              console.log("Filme na lista de favoritos:", movie); // Log do filme
              return (
                <div key={movie.id} className="favorite-movie-card">
                  <div>
                    <h3>{movie.title}</h3>
                    <p><strong>Gênero:</strong> {movie.genre}</p>
                    <p><strong>Ano:</strong> {movie.year}</p>
                  </div>
                  <button
                    onClick={() => {
                      console.log("Clicou para remover:", movie.id); // Log do ID que está sendo removido
                      removeMovieFromFavorites(movie.id);
                    }} // Passando o id do filme
                    className="remove-button"
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Você ainda não tem filmes favoritos.</p>
        )}
        <button onClick={onClose} className="close-button">Fechar</button>
      </div>
    </div>
  );
};

export default FavoriteMoviesModal;