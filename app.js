var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var app = express();

// view engine setup
require('./middlewares/view')(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session
require('./middlewares/Session')(app);

require('./middlewares/local')(app);

//router
require('./middlewares/routes')(app);

require('./middlewares/ErrorHandler')(app);

module.exports = app;
