const movieService = require('../services/movieServices');

exports.insert = async (req, res) => {
    try {
        const movie = await movieService.insertMovie(req.body);
        return res.status(201).json(movie);
    } catch (error) {
        return res.status(500).json({ message: 'Error inserting movie', error: error.message });
    }
};