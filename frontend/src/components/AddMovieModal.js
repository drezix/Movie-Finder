import React, { useState, useContext } from "react";
import axios from "axios";
import { MovieContext } from "../context/MovieContext"; 

const AddMovieModal = ({ onClose }) => {
  const { addMovieToFavorites } = useContext(MovieContext); 
  const [ formData, setFormData ] = useState({
    title: "",
    director: "",
    year: "",
    genre: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token ausente!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/movies/insert", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Filme inserido:", response.data);
      
      addMovieToFavorites(response.data);

      onClose(); 
    } catch (err) {
      console.error("Erro ao inserir filme:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Inserir Filmes Favoritos</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="director"
            placeholder="Diretor"
            value={formData.director}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="year"
            placeholder="Ano"
            value={formData.year}
            onChange={(e) => { const numericValue = e.target.value.replace(/[^0-9]/g, '');
              setFormData({ ...formData, year: numericValue });
            }}
            onKeyDown={(e) => {
              // Prevent non-numeric key input
              if (!/[0-9]/.test(e.key) && 
                  e.key !== 'Backspace' && 
                  e.key !== 'Delete' && 
                  e.key !== 'ArrowLeft' && 
                  e.key !== 'ArrowRight') {
                e.preventDefault();
              }
            }}
            required
          />
          <input
            type="text"
            name="genre"
            placeholder="Gênero"
            value={formData.genre}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Descrição"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <button type="submit" className="save-button">Salvar Filme</button>
        </form>
        <button onClick={onClose} className="close-button">Fechar</button>
      </div>
    </div>
  );
};

export default AddMovieModal;