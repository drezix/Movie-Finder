import React, { useState } from "react";
import axios from "axios";
import "./LoginModal.css"; 

const LoginModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
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

    try {
      const response = await axios.post("http://localhost:5000/auth/login", formData);
      
      // Armazena o token no localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.user.username);
      
      setSuccess("Login realizado com sucesso!");
      
      setTimeout(() => {
        onClose(); 
        window.location.reload(); 
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Erro ao fazer login.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} required />
          <button type="submit">Entrar</button>
        </form>
        <button onClick={onClose} className="close-button">Fechar</button>
      </div>
    </div>
  );
};

export default LoginModal;
