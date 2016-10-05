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
    images = images.map(image => ({
      id: image.id,
      url: image.url,
      title: image.title,
      liked: image.likes.indexOf(req.cookies.token) >= 0
    }));
    console.log(images);
    res.render('index', { photos: images });
  });
}

module.exports.upload = function(req, res, next){
  var form = new formidable.IncomingForm();

  function redirect(err){
    if (err) next(err);
    res.redirect('/');
  }

  function parseForm(err, fields, files) {
    if (err) next(err);

    cloudinary.uploader.upload(files.image.path, function (result) {
      // Let's force https in the image:
      var url = result.url.replace('http://', 'https://');

      var Photo = new models.photos({
        url: url,
        title: fields.title,
        nickname: fields.nick,
      });
      Photo.save(redirect);
    });
  }

  form.parse(req, parseForm);
}
