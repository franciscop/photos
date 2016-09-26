var express = require('express');
var bodyparser = require('body-parser');
var app = express();

app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/contact', function(req, res){
  console.log(req.body);
  res.redirect('/');
});


// An array with the ids of the things we liked
var likes = [];

// Retrieve all of our likes
app.get('/likes', function(req, res){
  res.json(likes);
});

// Create a new like
app.post('/likes/:id', function(req, res){
  var id = req.params.id;
  likes.push(req.params.id);
  res.json({ added: true });
});

app.delete('/likes/:id', function(req, res){
  var id = req.params.id;
  var index = likes.indexOf(id);
  likes.splice(index, 1)
  res.json({ deleted: true });
});

app.post('/likes/:id', function(req, res){

});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
