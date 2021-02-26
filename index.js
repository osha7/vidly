const Joi = require('joi');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Welcome to the home page!");
})

const port =  process.env.PORT || 3010;

app.listen(port, () => console.log(`Listening on port ${port}...`));
