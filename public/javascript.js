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
  $.post('/likes/' + id, { liked: !liked }, function(){
    var text = liked ? 'Like' : 'Unlike';
    $(e.target).toggleClass('liked').text(text);
  });
});
