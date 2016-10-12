var models = require('auto-load')('models');

var formidable = require('formidable');
var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.cloud,
  api_key: process.env.key,
  api_secret: process.env.secret
});

module.exports.index = function(req, res){
  models.photos.find({}, function(err, images){
    images = images.map(image => Object.assign(image, {
      liked: image.likes.includes(req.user ? req.user.id : '')
    }));
    res.render('index', { photos: images });
  });
}

module.exports.upload = function(req, res, next){
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "You should login to upload pictures" });
  }

  function redirect(err){
    if (err) return next(err);
    return res.redirect('/');
  }

  cloudinary.uploader.upload(req.files.image.path, function (result) {
    // Let's force https in the image:
    var url = result.url.replace('http://', 'https://');

    var Photo = new models.photos({
      url: url,
      title: req.body.title,
      user: req.user.id,
    });
    Photo.save(redirect);
  });
}

module.exports.remove = function(req, res){
  if (!req.user) {
    return res.status(401).json({ error: "You should be a user to do that" });
  }
  var query = {
    _id: req.params.id,
    user: req.user.id
  };
  models.photos.findOneAndRemove(query, function(err, image){
    if (!image) {
      return res.status(404).json({ error: 'That image is not in your uploads (anymore?)' });
    }
    res.json({});
  });
}
