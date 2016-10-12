var models = require('auto-load')('models');

module.exports = function(req, res, next){

  if (!req.user) {
    return res.status(401).json({ error: 'You should log in first' });
  }

  var query;
  if (req.body.liked === 'true') {
    query = {$addToSet: {"likes": req.user.id}};
  } else {
    query = {$pull: {"likes": req.user.id}};
  }

  models.photos.findByIdAndUpdate(req.params.id, query, { 'new': true }, function(err, photo){
    if (!photo) return next(new Error('No image'));
    res.json({
      likes: photo.likes.length
    });
  });
}
