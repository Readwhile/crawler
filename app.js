const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const errorHandlers = require('./handlers/errorHandlers');

const app = express();

mongoose.connect('mongodb://mongo:27017/articles');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);
app.use(errorHandlers.notFound);
app.use(errorHandlers.catchAllErrors);

module.exports = app;
