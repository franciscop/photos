
module.exports.one = function(req, res){
  res.render('user');
};

// Render the login template
module.exports.login = function(req, res){
  res.render('login');
};

// Perform session logout and redirect to homepage
module.exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};

// Perform the final stage of authentication and redirect to '/user'
module.exports.callback = function(req, res) {
  res.redirect(req.session.returnTo || '/user');
};
