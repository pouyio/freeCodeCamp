$("document").ready(function() {
  $.getJSON("http://www.freecodecamp.com/news/hot", function(data) {
    data.forEach(function(object, index) {
      if (object.image != '') {
        var bgImage = object.image;
      } else if (object.author.picture != '') {
        bgImage = object.author.picture;
      } else {
        bgImage = "http://edurolearning.com/images/2014/09/coding-1024x768.jpg";
      }
      var time = new Date(object.timePosted);
      var day = time.getDate();
      var monthName = [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October', 'November', 'December'
      ];
      var month = time.getMonth();

      $('#columns').append('<div class="box" id="box' + index + '"></div>');
      $('div#box' + index).append('<a id="link' + index + '" target="_blank" href="' + object.link + '"></a>');
      $('a#link' + index).append('<div class="hoverable"></div>');
      $('a#link' + index).children().append('<figure></figure');
      $('a#link' + index).children().children().append('<img id="main-image' + index + '"/>');
      $('#main-image' + index).error(fixImage).attr('src', bgImage);

      $('a#link' + index).children().children().append('<figcaption id="figcaption' + index + '"></figcaption');
      if (object.metaDescription != "") {
        $('figcaption#figcaption' + index).append('<p class="metadata">' + object.metaDescription + '</p>');
      }
      $('figcaption#figcaption' + index).append('<p class="date">' + time.getDate() + '-' + monthName[month] + '</p>');
      $('a#link' + index).append('<h4>' + object.headline + '</h4>');

      $('div#box' + index).append('<span class="left-float value"><i class="fa fa-thumbs-o-up"></i> ' + object.upVotes.length + '</span>');
      $('div#box' + index).append('<span title="Last vote by" class="right-float value">' + object.upVotes[object.upVotes.length - 1].upVotedByUsername + '</span>');
      $('div#box' + index).append('</br>');
      $('div#box' + index).append('<a class="author-link" target="_blank" href="http://www.freecodecamp.com/' + object.author.username + '" id="author-link' + index + '"></a>');
      $('a#author-link' + index).append('<p class="author-text"></p>');
      $('a#author-link' + index).children().append('<img class="author-icon vertical-a" src="' + object.author.picture + '">');
      $('a#author-link' + index).children().append('<span class="author-name"> ' + object.author.username + '</span>')
    })
  });

  $('#search').keyup(searchNews);
});

function fixImage(e) {
  $(e.target).attr('src', 'http://edurolearning.com/images/2014/09/coding-1024x768.jpg');
}

function searchNews() {
  var value = $(this).val().toLowerCase();
  $('.box').each(function() {
    var content = $(this).find('p.metadata').html();
    var title = $(this).find('h4').html().toLowerCase();
    var user = $(this).find('span.author-name').html();
    if (title.indexOf(value) != -1) {
      $(this).removeClass('noMatch');
    } else if (user.indexOf(value) != -1) {
      $(this).removeClass('noMatch');
    } else if (content != undefined && content.indexOf(value) != -1) {
      $(this).removeClass('noMatch');
    } else {
      $(this).addClass('noMatch');
    }
  });
}
