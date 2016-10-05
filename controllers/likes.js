module.exports = function(req, res){
  console.log(req.params.id, req.query.like);
  res.send('1');
}
