const movieService = require('../services/movieServices');

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
        const movies = await movieService.getMovies(userId);
        
        return res.status(200).json(movies);
    } catch (error) {
        return res.status(500).json({ message: 'Error getting movies', error: error.message });
    }
}