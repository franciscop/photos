document.addEventListener("DOMContentLoaded", function() {
  [].forEach.call(document.querySelectorAll('.dropimage'), function(img){
    img.onchange = function(e){
      var inputfile = this, reader = new FileReader();
      reader.onloadend = function(){
        inputfile.style['background-image'] = 'url('+reader.result+')';
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  });
});

$('.like').on('click', function(e){
  var liked = $(e.target).hasClass('liked');
  var id = $(e.target).attr('id');
  
  var token = cookies('token');
  if (!token) {
    token = cookies({
      token: parseInt(Math.random() * 1000000)
    })('token');
  }

  $.post('/likes/' + id, { liked: !liked, token: token }, function(){
    var text = liked ? 'Like' : 'Unlike';
    $(e.target).toggleClass('liked').text(text);
  });
});
