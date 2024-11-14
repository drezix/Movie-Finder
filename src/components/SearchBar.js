import React, { useState, useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import { searchMovies } from '../services/api';
import { TextField, Button } from '@mui/material';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { setMovies, setLoading } = useContext(MovieContext);

  const handleSearch = async () => {
    if (!query) {
      alert("Please enter a search term");
      return;
    }

    setLoading(true);
    try {
      const movies = await searchMovies(query);
      setMovies(movies);
    } catch (error) {
      alert("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <TextField
        label="Search Movies"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <Button variant="contained" onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default SearchBar;
