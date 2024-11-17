import React, { useState, useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import { searchMovies } from '../services/api';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { setMovies, setLoading } = useContext(MovieContext);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (error) {
      console.error('Error searching movies:', error);
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
    </div>
  );
};

export default SearchBar;
