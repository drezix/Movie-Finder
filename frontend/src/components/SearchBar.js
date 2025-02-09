import React, { useState, useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';
import { searchMovies } from '../services/api';
import { Snackbar, Alert } from '@mui/material'; // Importando o Snackbar e o Alert
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const { setMovies, setLoading } = useContext(MovieContext);
  const [user, setUser] = useState(null);  // Adicionando o estado de usuário

  const [openSnackbar, setOpenSnackbar] = useState(false);  // Estado para controle do Snackbar

  useEffect(() => {
    const username = localStorage.getItem("username");  // Verifica se o usuário está logado
    if (username) {
      setUser(username);  // Se o nome de usuário for encontrado no localStorage, define o estado
    }
  }, []);

  const validateInput = (input) => {
    if (!input.trim()) {
      return "O termo de pesquisa não pode estar vazio.";
    }
    if (input.trim().length < 3) {
      return "O termo de pesquisa deve ter pelo menos 3 caracteres.";
    }
    if (/[^a-zA-Z0-9\s]/.test(input)) {
      return "O termo de pesquisa contém caracteres inválidos.";
    }
    return null;
  };

  const handleSearch = async () => {
    if (!user) {  // Verifica se o usuário está logado
      setError("Você precisa estar logado para pesquisar filmes.");
      setOpenSnackbar(true);  // Abre o Snackbar
      return;
    }

    const validationError = validateInput(query);
    if (validationError) {
      setError(validationError);
      setOpenSnackbar(true);  // Abre o Snackbar
      return;
    }

    setLoading(true);
    setError(null); 
    try {
      const results = await searchMovies(query);
      if (results.length === 0) {
        setError("Nenhum filme encontrado para esta pesquisa.");
        setOpenSnackbar(true);  // Abre o Snackbar
      } else {
        setMovies(results);
      }
    } catch (error) {
      setError("Ocorreu um erro ao buscar os filmes. Tente novamente mais tarde.");
      setOpenSnackbar(true);  // Abre o Snackbar
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar filmes..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setError(null); // Limpar o erro ao digitar
        }}
        className={error ? 'input-error' : ''}
      />
      <button onClick={handleSearch}>Pesquisar</button>

      {/* Exibindo o Snackbar com a mensagem de erro */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}  // O Snackbar ficará visível por 6 segundos
        onClose={() => setOpenSnackbar(false)}  // Fecha o Snackbar
      >
        <Alert severity="error" onClose={() => setOpenSnackbar(false)}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SearchBar;
