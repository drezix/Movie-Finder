import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { MovieContext } from "../context/MovieContext";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { CircularProgress } from "@mui/material";
import "./HomePage.css";
import logo from "../assets/moviefinderlogo.png";
import RegisterModal from "../components/RegisterModal";
import LoginModal from "../components/LoginModal";
import AddMovieModal from "../components/AddMovieModal";
import FavoriteMoviesModal from "../components/FavoriteMoviesModal"; 
import '../components/modal.css'; 

const HomePage = () => {
  const { movies, loading, favorites, addMovieToFavorites, removeMovieFromFavorites } = useContext(MovieContext);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setUser(username);
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        await axios.post(
          "http://localhost:5000/auth/logout",
          null,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
      }
    } catch (err) {
      console.error("Erro ao deslogar:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setUser(null);
      window.location.reload();
    }
  };

  return (
    <div>
      <header className="header">
        <img src={logo} alt="Movie Finder Logo" className="logo" />
        <div className="search-bar">
          <SearchBar />
        </div>

        <div className="auth-buttons">
          {user ? (
            <>
              <span className="username">Olá, {user}!</span>
              <button onClick={handleLogout} className="auth-button">Sair</button>
              <button onClick={() => setIsAddMovieOpen(true)} className="auth-button add-movie-button">Inserir Filmes Favoritos</button>
              <button onClick={() => setIsFavoritesOpen(true)} className="auth-button favorites-button">Favoritos</button>
            </>
          ) : (
            <>
              <button onClick={() => setIsLoginOpen(true)} className="auth-button">Login</button>
              <button onClick={() => setIsRegisterOpen(true)} className="auth-button">Registrar</button>
            </>
          )}
        </div>
      </header>

      <div className="main-container">
        <h1>Movie Search</h1>
        {loading ? <CircularProgress /> : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>

      {/* Modais */}
      {isRegisterOpen && <RegisterModal onClose={() => setIsRegisterOpen(false)} />}
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
      {isAddMovieOpen && <AddMovieModal onClose={() => setIsAddMovieOpen(false)} />}
      
      {/* Modal de Favoritos */}
      {isFavoritesOpen && (
        <FavoriteMoviesModal onClose={() => setIsFavoritesOpen(false)} />
      )}
    </div>
  );
};

export default HomePage;