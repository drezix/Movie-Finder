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