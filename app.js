require('dotenv').config();

// Imports
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var dbRoute = process.env.DB_ROUTE;
var dbRoute = process.env.MONGODB_URI || 'mongodb://localhost/forum'
var port = process.env.PORT || 3000;

// Create Admin Account 
require('./config/admin');

mongoose.connect(dbRoute, { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database Connection Error'));
db.once('open', () => console.log("DATABASE CONNECTION SUCCESSFUL"))

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var apiRouter = require('./routes/api');

// Routing
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port);
console.log("App listening on port " + port);