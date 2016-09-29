require('dotenv').config();

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.once('open', function(){

  app.use(require('./routes'));

  app.listen(process.env.PORT || 3000);
});
