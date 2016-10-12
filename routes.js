var express = require('express');
var router = express.Router();
var controllers = require('auto-load')('controllers');
var passport = require('passport');

router.get('/', controllers.photos.index);
router.post('/photos', controllers.photos.upload);
router.delete('/photos/:id', controllers.photos.remove);
router.post('/likes/:id', controllers.likes);

router.get('/user', controllers.users.one);
router.get('/login', controllers.users.login);
router.get('/logout', controllers.users.logout);
router.get('/callback', passport.authenticate('auth0', {
  failureRedirect: '/error',
  failureFlash: true
}), controllers.users.callback);

module.exports = router;
