var express = require('express');
var router = express.Router();
var controllers = require('auto-load')('controllers');

router.get('/', controllers.photos.index);

router.post('/photos', controllers.photos.upload);

module.exports = router;
