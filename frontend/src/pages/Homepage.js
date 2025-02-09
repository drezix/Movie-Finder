import React, { useState, useContext, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { CircularProgress } from "@mui/material";
import "./HomePage.css";
import logo from "../assets/moviefinderlogo.png";
import RegisterModal from "../components/RegisterModal";
import LoginModal from "../components/LoginModal"; // Modal de login
import AddMovieModal from "../components/AddMovieModal";  // Modal de Adicionar Filme
import '../components/modal.css'; // Adicione o caminho correto para o seu arquivo CSS

const HomePage = () => {
  const { movies, loading } = useContext(MovieContext);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);  // Estado para abrir o modal de adicionar filme
  const [user, setUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setUser(username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    window.location.reload();
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
              {/* Mostrar o botão de adicionar filme apenas se o usuário estiver logado */}
              <button onClick={() => setIsAddMovieOpen(true)} className="auth-button add-movie-button">Inserir Filmes Favoritos</button>
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
      {/* Modal de Adicionar Filme */}
      {isAddMovieOpen && <AddMovieModal onClose={() => setIsAddMovieOpen(false)} />}
    </div>
  );
};

export default HomePage;
