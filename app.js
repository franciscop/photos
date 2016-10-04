// Load the environment configuration from ".env"
require('dotenv').config();

// Import the modules that we will use in this file
var express = require('express');
var mongoose = require('mongoose');
var routes = require('./routes');

// Server configuration
var app = express();
app.set('view engine', 'pug');  // The "html engine"
app.use(express.static('public'));  // Where the static files are

// Connect to the database before accepting any request
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.once('open', function(){

  // Use the routes stored in ./routes.js
  app.use(routes);

  // Actually start listening to the requests
  app.listen(process.env.PORT || 3000);
});
