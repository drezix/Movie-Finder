const Movie = require('../models/movieModel');

exports.insertMovie = async ({ userId, title, director, year, genre, description }) => {
    const existingMovie = await Movie.findOne({
        title,
        director,
        year,
        genre
    })
    if (existingMovie) throw new Error('You have already added this movie');
    
    const newMovie = new Movie({ userId, title, director, year, genre, description });
    return newMovie.save();
}

exports.getMovies = async (userId) => {
    const movies = await Movie.find({ userId });
    return movies;
}

exports.deleteMovie = async (movieId, userId) => {
    const movie = await Movie.findOneAndDelete({
        _id: movieId,
        userId: userId
    });
    
    if (!movie) {
        throw new Error(`Movie not found or unauthorized | MovieID: ${movieId} | UserID: ${userId}`);
    }
    return movie;
};