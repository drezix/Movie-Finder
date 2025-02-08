import React, { useState } from "react";
import axios from "axios";
import "./RegisterModal.css"; 

const RegisterModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    console.log("Enviando dados:", formData);
  
    try {
      const response = await axios.post("http://localhost:5000/auth/register", formData);
      console.log("Resposta da API:", response.data); // Log da resposta
      setSuccess("Usuário registrado com sucesso!");
      setFormData({ username: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      console.log("Erro na resposta:", err.response?.data); // Log do erro
      setError(err.response?.data?.message || "Erro ao registrar usuário.");
    }
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Registro</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Usuário" value={formData.username} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} required />
          <button type="submit">Registrar</button>
        </form>
        <button onClick={onClose} className="close-button">Fechar</button>
      </div>
    </div>
  );
};

export default RegisterModal;
