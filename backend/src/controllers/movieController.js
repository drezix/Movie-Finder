const movieService = require('../services/movieServices');
const redisClient = require('../config/redisConfig');

exports.insert = async (req, res) => {
    try {
        const userId = req.user.id;
        const movieData = { ...req.body, userId };

        const movie = await movieService.insertMovie(movieData);

        const cacheKey = `movies:${userId}`;
        await redisClient.del(cacheKey);
        
        return res.status(201).json(movie);
    } catch (error) {
        return res.status(500).json({ message: 'Error inserting movie', error: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const userId = req.user.id;
        const cacheKey = `movies:${userId}`;

        const cachedMovies = await redisClient.get(cacheKey);
        if (cachedMovies) {
          console.log('Retornando filmes do cache');
          return res.status(200).json(JSON.parse(cachedMovies));
        }

        const movies = await movieService.getMovies(userId);
            
        await redisClient.set(cacheKey, JSON.stringify(movies), { EX: 3600 });
        console.log('Retornando filmes do banco e armazenando no cache');
        return res.status(200).json(movies);
    } catch (error) {
        return res.status(500).json({ message: 'Error getting movies', error: error.message });
    }
}

exports.remove = async (req, res) => {
    try {
        const userId = req.user.id;
        const movieId = req.params.id;

        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(400).json({ message: 'Invalid movie ID format' });
        }

        const deletedMovie = await movieService.deleteMovie(
            new mongoose.Types.ObjectId(String(movieId)), 
            new mongoose.Types.ObjectId(String(userId))
        );
        const cacheKey = `movies:${userId}`;
        await redisClient.del(cacheKey);

        return res.status(200).json(deletedMovie);
    } catch (error) {
        return res.status(500).json({ message: 'Error removing movie', error: error.message });
    }
}