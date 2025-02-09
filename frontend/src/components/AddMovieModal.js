// AddMovieModal.js
import React, { useState } from "react";
import axios from "axios";

const AddMovieModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
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
    try {
      const response = await axios.post("http://localhost:5000/movies/add", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Filme inserido:", response.data);
      onClose();  // Fecha o modal após sucesso
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
            onChange={handleChange}
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
