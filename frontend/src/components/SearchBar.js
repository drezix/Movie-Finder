import React, { useState, useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import { searchMovies } from '../services/api';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const { setMovies, setLoading } = useContext(MovieContext);

  const validateInput = (input) => {
    if (!input.trim()) {
      return "Search term cannot be empty.";
    }
    if (input.trim().length < 3) {
      return "Search term must be at least 3 characters long.";
    }
    if (/[^a-zA-Z0-9\s]/.test(input)) {
      return "Search term contains invalid characters.";
    }
    return null;
  };

  const handleSearch = async () => {
    const validationError = validateInput(query);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null); 
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
        onChange={(e) => {
          setQuery(e.target.value);
          setError(null); // Limpar o erro ao digitar
        }}
        className={error ? 'input-error' : ''}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error-message">{error}</p>} {/* Exibir erro */}
    </div>
  );
};

export default SearchBar;
