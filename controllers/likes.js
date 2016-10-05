var models = require('auto-load')('models');

module.exports = function(req, res){

  var query;
  if (req.body.liked === 'true') {
    query = {$addToSet: {"likes": req.cookies.token}};
  } else {
    query = {$pull: {"likes": req.cookies.token}};
  }

  console.log(req.params.id);

  models.photos.findByIdAndUpdate(req.params.id, query, { new: true }, function(err, photo){
    if (!photo) return next(new Error('No image'));
    console.log(photo.likes);
    res.send();
  });
}
