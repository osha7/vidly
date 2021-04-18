const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');

const genres = require('./routes/genres');
const home = require('./routes/home');

const express = require('express');
const app = express();
const port =  process.env.PORT || 3010;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));   
app.use(helmet());
app.use('/api/genres', genres);
app.use('/', home);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
};

app.listen(port, () => console.log(`Listening on port ${port}...`));
