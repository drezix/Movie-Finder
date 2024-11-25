import React, { useState, useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import { searchMovies } from '../services/api';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null); // Novo estado para mensagens de erro
  const { setMovies, setLoading } = useContext(MovieContext);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a valid search term.");
      return;
    }

    setLoading(true);
    setError(null); // Resetar o erro antes de buscar
    try {
      const results = await searchMovies(query);
      if (results.length === 0) {
        setError("No movies found for this query.");
      } else {
        setMovies(results);
      }
    } catch (error) {
      setError("An error occurred while searching for movies. Please try again later.");
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error-message">{error}</p>} {/* Exibir erro */}
    </div>
  );
};

export default SearchBar;
