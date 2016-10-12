// Load the environment configuration from ".env"
require('dotenv').config({silent: true});

// Import the modules that we will use in this file
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var redis = require('connect-redis')(session);
var dataParser = require('express-data-parser');
var cookieParser = require('cookie-parser');
var formidable = require('formidable');

var routes = require('./routes');

// Server configuration
var app = express();
app.set('view engine', 'pug');  // The "html engine"
app.use(express.static('public'));  // Where the static files are
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('foo'));
app.use(session({
  store: new redis({}),
  secret: 'dfbdfilsjpergnsjkdafnweofnwevre',
  resave: true,
  saveUninitialized: false
}));
app.use(dataParser());

app.locals.env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

var passport = require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
  if (req.query.returnTo) req.session.returnTo = req.query.returnTo;
  res.locals.user = req.user;
  next();
});

// Connect to the database before accepting any request
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test');
var db = mongoose.connection;
db.once('open', function(){

  // Use the routes stored in ./routes.js
  app.use(routes);

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  // Actually start listening to the requests
  app.listen(process.env.PORT || 3000);
});
