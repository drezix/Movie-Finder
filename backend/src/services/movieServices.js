const movieModel = require('../models/movieModel');

exports.insertMovie = async ({ title, director, year, genre, description }) => {
    const existingMovie = await movieModel.findOne({
        title,
        director,
        year,
        genre
    })
    if (existingMovie) throw new Error('Movie already exists');
    
    const newMovie = new movieModel({ title, director, year, genre, description });
    return newMovie.save();
}