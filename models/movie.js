const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

// const Movie = mongoose.model('Movie', new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 5,
//         maxlength: 255
//     },
//     genre: {
//         type: genreSchema,
//         required: true
//     },
//     numberInStock: {
//         type: Number,
//         required: true,
//         min: 0,
//         max: 1000
//     },
//     dailyRentalRate: {
//         type: Number,
//         required: true,
//         min: 0,
//         max: 1000
//     }
// }));

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 1000
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 1000
    }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(3).required(),
        genreId: Joi.objectId().required(), // we just want the client to send the id # not the genre
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };
    return Joi.validate(movie, schema);
};

module.exports.Movie = Movie;
module.exports.validate = validateMovie;
module.exports.movieSchema = movieSchema;