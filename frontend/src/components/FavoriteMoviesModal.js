import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MovieContext } from "../context/MovieContext";

const FavoriteMoviesModal = ({ onClose }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { removeMovieFromFavorites } = useContext(MovieContext);

  useEffect(() => {
    const fetchMovies = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/movies/allmovies", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovies(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Meus Filmes Favoritos</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : movies.length > 0 ? (
          <div>
            {movies.map((movie) => (
              <div key={movie._id} className="favorite-movie-card">
                <div>
                  <h3>{movie.title}</h3>
                  <p><strong>Gênero:</strong> {movie.genre}</p>
                  <p><strong>Ano:</strong> {movie.year}</p>
                </div>
                <button
                    onClick={async () => {
                        try {
                            await removeMovieFromFavorites(movie._id);
                            const updatedMovies = movies.filter(m => m._id !== movie._id);
                            setMovies(updatedMovies);
                        } catch (error) {
                            console.error("Failed to delete:", error);
                        }
                    }}
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

export default FavoriteMoviesModal;