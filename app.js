const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const app = express();
const logger = require('morgan');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/vinventory', { useNewUrlParser: true });


app.use(logger('dev'));
app.use(bodyParser.json());


routes(app);

// middleware for error handling
app.use(function(err, req, res, next) {
    res.status(422).send({ error: err.message });
});

module.exports = app;
