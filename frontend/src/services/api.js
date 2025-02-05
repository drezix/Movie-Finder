import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const searchMovies = async (query) => {
  const response = await api.get('/search/movie', { params: { query } });
  return response.data.results;
};

export default api;
