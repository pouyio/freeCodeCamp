var baseURL = "https://en.wikipedia.org/w/api.php?";
var searchItem = "action=opensearch&callback=?&limit=7&search=";
var random = "action=query&list=random&rnnamespace=0&rnlimit=1&format=json&callback=?";
$("document").ready(function() {
  //hovering keys on suggestions
  $('.search-block').keySelection();
  $('.search-block').on("keySelection.keyHover", function(e) {
    if ($('#search-input').hasClass('key-hover')) {
      $('#search-input').focus();
    } else {
      $('#search-input').blur();
    }
  });

  //selection keys on suggestions
  $(".search-block").on("keySelection.selection", function(e) {
    var v = $('ul.suggestions li.key-hover').text();
    if ($('#search-input').val() != "" && v != "") {
      $('#search-input').val(v)
      searchAction();
    } else if($('#search-input').val() != "") {
      searchAction();
    }
  });

  //event listening on writing and key (enter) pressed
  $('#search-input').keyup(suggestAction)

  //event listening to search button
  $('button.search-button').click(searchAction);

  //event listening to random button
  $('button.random-button').click(function() {
    var wikiURL = "https://en.wikipedia.org/?curid=";
    $.getJSON(baseURL + random, function(data) {
      window.open(wikiURL + data.query.random[0].id, '_blank');
    });
  });
});

function suggestAction() {
  var value = encodeURIComponent($(this).val().toLowerCase());
  if (value != "") {
    $.getJSON(baseURL + searchItem + value, function(data) {
      $('ul.suggestions').css('visibility', 'visible');
      $('ul.suggestions li').remove();
      data[1].forEach(function(val) {
        $('ul.suggestions').append('<li class="selection-item">' + val + '</li>')
      });
    });
  } else {
    $('ul.suggestions li').remove();
    $('ul.suggestions').css('visibility', 'hidden');
  }
}

function searchAction() {
  var value = encodeURIComponent($('#search-input').val().toLowerCase());
  $('#search-input').blur();
  $('.suggestions').css('visibility', 'hidden');
  $('ul.suggestions li').remove();
  $('ul.results a').remove();
  $.getJSON(baseURL + searchItem + value, function(data) {
    var titles = $.makeArray(data[1]);
    var snippets = $.makeArray(data[2]);
    var links = $.makeArray(data[3]);
    if (titles.length == 0) {
      $('ul.results').append('<a><li>No results were found.</li></a>');
    } else {
      titles.forEach(function(element, index) {
        var link = $('<a target="_blank" href="' + links[index] + '"></li>');
        var tit = $('<li><h3> ' + element + '</h3></li>');
        var snip = $('<p class="snippet"> ' + snippets[index] + '</p>');
        $('ul.results').append(link);
        $('ul.results a:last-child').append(tit);
        $('ul.results li:last').append(snip);
      });
    }
  });
}
