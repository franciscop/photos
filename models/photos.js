var mongoose = require('mongoose');

var photosSchema = mongoose.Schema({
  title: { type: String, required: true },
  user: { type: String, required: true },
  url: { type: String, required: true },
  likes: [{ type: String }]
});

module.exports = mongoose.model('Photos', photosSchema);
