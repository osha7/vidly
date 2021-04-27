const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
// const Joi = require('joi');
const { Genre, validate } = require('../models/genre');

// const genreSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 50
//     }
// });

// const Genre = mongoose.model('Genre', genreSchema);

// or cleaner(?) to write:
// const Genre = mongoose.model('Genre', new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 50
//     }
// }));

// ------------No longer need this:-------------------
// const genres = [
//     { id: 1, name: 'comedy' },
//     { id: 2, name: 'drama' },
//     { id: 3, name: 'horror' },
//     { id: 4, name: 'romance' },
//     { id: 5, name: 'action' },
//     { id: 6, name: 'science fiction' },
//     { id: 7, name: 'musical' },
// ];


router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    // const genre = genres.find(g => g.id === parseInt(req.params.id));
    const genre = await Genre.findById(req.params.id);

    if(!genre) {
        return res.status(404).send('That genre was not found.');
    };
    res.send(genre);
});

// function validateGenre(genre) {
//     const schema = {
//         name: Joi.string().min(3).required()
//     };
//     return Joi.validate(genre, schema);
// };

router.post('/', async (req, res) => {
    // const { error } = validateGenre(req.body);
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    };

    let genre = new Genre({
        // id: genres.length + 1, // now id set by DB automatically
        name: req.body.name
    });
    // genres.push(genre);
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async (req, res) => {
    c// const { error } = validateGenre(req.body);
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    };

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    // const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) {
        return res.status(404).send('That genre was not found.');
    };

    // genre.name = req.body.name;

    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    // const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) {
        return res.status(404).send('That genre was not found.');
    };

    // const index = genres.indexOf(genre);
    // genres.splice(index, 1);

    res.send(genre);
});

module.exports = router;