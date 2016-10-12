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

$('button.upload').click(function(){
  lock.show();
});

$('.delete').click(function(e){
  $photo = $(e.target).closest('.photo');
  $frame = $photo.closest('.frame').addClass('remove');
  $.ajax('/photos/' + $photo.attr('id'), {
    method: 'DELETE',
    data: {},
    success: function(){
      setTimeout(function(){
        $photo.closest('.frame').remove();
      }, /localhost/.test(window.location.href) ? 300 : 0);
    },
    error: function (res) {
      $frame.removeClass('remove');
      $('.error').show().text(res.error);
    }
  });
});

$('.like').click(function(e){
  var $photo = $(e.currentTarget).closest('.photo');
  var liked = $photo.hasClass('liked');
  var id = $photo.attr('id');

  if (!user.id) {
    lock.show();
    return true;
  }

  $.post('/likes/' + id, { liked: !liked, token: user.id }, function(data){
    var text = liked ? '<i class="fa fa-heart-o like"></i>' : '<i class="fa fa-heart like"></i>';
    $photo.toggleClass('liked');
    $photo.find('.fa-heart, .fa-heart-o').toggleClass('fa-heart fa-heart-o');
    $photo.closest('.frame').find('.info .count').html(data.likes);
  });
});

$('#clearbox').get(0).checked = false;
$('.photo a').click(function (e) {
  e.preventDefault();
  $frame = $(e.target).closest('.frame');
  $('#clearbox').get(0).checked = true;
  $('.modal h3').text($frame.find('.title').text());
  $('.modal img').attr('src', $frame.find('img').attr('src'));
});
