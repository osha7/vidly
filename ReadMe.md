# Starting a new node.js backend for Movie Genres endpoint

    - create a new folder in desired location
    - cd into folder
    - check npm version up to date: npm -v
    - check node version up to date: node -v
    - create package.json file: npm init --yes
    - install underscore npm package: npm i underscore
    - install mongoose npm package: npm i mongoose
    - push to git:
            git init
            git status

            create    .gitignore file
                add line of code:    node_modules/
            git remote add origin git@github.com:<yourgitname>/<projectname>.git
            git add .
            git commit -m "first commit"
            git push
    - install JS Hint npm package: npm i jshint --save-dev
    - install Express: npm i express
    - install this version of Joi: npm i joi@13.1.0
    - add index.js file

## Initial lines of code to get server running:

    * Express handles the server:

    index.js:

        const Joi = require('joi');
        const express = require('express');
        const app = express();

        app.get('/', (req, res) => {
            res.send("Welcome to the home page!");
        })

        const port =  process.env.PORT || 3000;

        app.listen(port, () => console.log(`Listening on port ${port}...`));
