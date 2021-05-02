const express = require('express');
const mongoose = require('mongoose');
const { Genre } = require('../models/genre');
const router = express.Router();

const { Movie, validate } = require('../models/movie');

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
});

router.get('/:id', async (req, res) => {
    const movie = await Genre.findById(req.params.id);

    if(!movie) {
        return res.status(404).send('The movie with that id was not found.');
    };
    res.send(movie);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    };

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid Genre');

    // let movie = new Movie({
    const movie = new Movie({
        title: req.body.title,
        genre: { // read both of the properties below directly from genre don't do this: genre: genre, bc an attribute is also the version property, and we don't want that
            _id: genre._id,
            name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    // movie = await movie.save();
    await movie.save();
    res.send(movie);
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.send(400).send(error.details[0].message);
    };

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {
    new: true
    });
    if(!movie) {
        return res.status(404).send('The movie with that id was not found.');
    };
    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if(!movie) {
        return res.status(404).send('The movie with that id was not found.');
    };
    res.send(movie);
});

module.exports = router;