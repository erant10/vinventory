const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const app = express();

const mongoHost = 'localhost',
    mongoPort = '27017',
    collectionName = 'vinventory';

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${mongoHost}:${mongoPort}/${collectionName}`, { useNewUrlParser: true });

app.use(bodyParser.json());

routes(app);

// middleware for error handling
app.use(function(err, req, res, next) {
    res.status(422).send({ error: err.message });
});

module.exports = app;
