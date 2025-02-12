const movieService = require('../services/movieServices');
const redisClient = require('../config/redisConfig');

exports.insert = async (req, res) => {
    try {
        const userId = req.user.id;
        const movieData = { ...req.body, userId };

        const movie = await movieService.insertMovie(movieData);
        
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