module.exports = function(req, res){
  console.log(req.params.id, req.body.liked);
  res.send('1');
}
