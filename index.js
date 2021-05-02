const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');

const express = require('express');
const app = express();
const port =  process.env.PORT || 3010;


// Connect to Mongoose:
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-genre', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error('Could not connect to MongoDB...'.indexOf, err))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));   
app.use(helmet());

app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
};

app.listen(port, () => console.log(`Listening on port ${port}...`));
