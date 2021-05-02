const express = require('express');
const mongoose = require('mongoose');
const { Movie } = require('../models/movie'); 
const { Customer } = require('../models/customer'); 
const router = express.Router();

const Fawn = require('fawn');
Fawn.init(mongoose);

const { Rental, validate } = require('../models/rental');

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut'); //descending dateOut order
    res.send(rentals);
});

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if(!rental) {
        return res.status(404).send('The rental with that id was not found.');
    };
    res.send(rental);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    };
    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send("Invalid Movie");
    
    const customer = await Customer.findById(req.body.customerId);
    if(!customer) res.status(400).send('Invalid Customer');

    if (movie.numberInStock === 0) return res.status(400).send('Movie is not in stock right now.')
    //  mongoose is in charge of setting the default properties of _id and dateOut
    let rental = new Rental({
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
    });
    // these next three lines need to be performed as a unit - all or none
    // rental = await rental.save();
    // movie.numberInStock--;
    // movie.save();

    // transaction: 'a group of operations that should be preformed as a unit'
    // all operations will complete or if something fails, all will be rolled back and nothing committed
    //  read about 'two phase commit' in mongodb
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id}, {
                $inc: { numberInStock: -1 }
            })
            // .remove()
            .run();
        res.send(rental);
    }
    catch (ex) {
        res.status(500).send('Something failed.')
    }
});

// router.put('/:id', async (req, res) => {
//     const { error } = validate(req.body);
//     if(error) {
//         return res.send(400).send(error.details[0].message);
//     };

//     const movie = await Movie.findById(req.body.movieId);
//     if(!movie) return res.status(400).send("Invalid Movie");
    
//     const customer = await Customer.findById(req.body.customerId);
//     if(!customer) res.status(400).send('Invalid Customer');

//     const rental = await Rental.findByIdAndUpdate(req.params.id, {
//         movie: {
//             _id: movie._id,
//             title: movie.title,
//             dailyRentalRate: movie.dailyRentalRate
//         },
//         customer: {
//             _id: customer._id,
//             name: customer.name,
//             phone: customer.phone
//         },
//     }, { new: true });
//     if(!rental) {
//         return res.status(404).send('The rental with that id was not found.');
//     };
//     res.send(rental);
// });

router.delete('/:id', async (req, res) => {
    const rental = await Rental.findByIdAndRemove(req.params.id);
    if(!rental) {
        return res.status(404).send('The rental with that id was not found.');
    };
    res.send(rental);
});

module.exports = router;