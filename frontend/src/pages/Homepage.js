import React, { useState, useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { CircularProgress } from "@mui/material";
import "./HomePage.css";
import logo from "../assets/moviefinderlogo.png";
import RegisterModal from "../components/RegisterModal";

const HomePage = () => {
  const { movies, loading } = useContext(MovieContext);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div>
      <header className="header">
        <img src={logo} alt="Movie Finder Logo" className="logo" />
        <div className="search-bar">
          <SearchBar />
        </div>
        <button onClick={() => setIsRegisterOpen(true)} className="register-button">Registrar</button>
      </header>

      <div className="main-container">
        <h1>Movie Search</h1>
        {loading ? <CircularProgress /> : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>

      {isRegisterOpen && <RegisterModal onClose={() => setIsRegisterOpen(false)} />}
    </div>
  );
};

export default HomePage;
