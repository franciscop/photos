var express = require('express');
var router = express.Router();
var controllers = require('auto-load')('controllers');

router.get('/', controllers.photos.index);
//router.get('/:id', controllers.photos.one);

router.post('/photos', controllers.photos.upload);
router.post('/likes/:id', controllers.likes);

module.exports = router;
