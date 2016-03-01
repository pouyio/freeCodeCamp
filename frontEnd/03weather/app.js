var tempF = 0;
var backgrounds = {
  2: "http://i.imgur.com/LbXGI56.jpg",
  3: "http://cloud-maven.com/wp-content/uploads/2014/10/DSC_0128.jpg",
  5: "http://www.cominoforlag.no/ragnhild/wp-content/uploads/sites/17/2015/02/rainning-wallpaper-hd-background-73.jpg",
  6: "http://cdn.playbuzz.com/cdn/43855897-a291-4adb-8612-644b90e139de/2f103744-195f-460a-a7ec-2d51e753d5b8.jpg",
  7: "http://nc.hcpress.com/img/aerosols_research.jpeg",
  8: "http://globe-views.com/dcim/dreams/clouds/clouds-01.jpg",
  9: "http://i.huffpost.com/gen/2176456/images/o-TORNADO-facebook.jpg"
};
$(document).ready(function() {
  // Set current date
  var date = new Date();
  $('.date').text(date.getUTCDate() + " / " + date.getMonth() + " / " + date.getFullYear());

  //API call to retrieve weather
  getLocation();

  // Switch C to F and vice cersa
  $('#mySwitch').click(function() {
    if ($('#mySwitch').is(':checked')) {
      var tempC = (tempF - 32) * 5 / 9;
      $('.temperature').fadeOut(200, function() {
        $('.temperature').html(parseInt(tempC) + "&deg");
      });
      $('.temperature').fadeIn(200);
    } else {
      $('.temperature').fadeOut(200, function() {
        $('.temperature').html(tempF + "&deg");
      });
      $('.temperature').fadeIn(200);
    }
  });
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else {
    alert('Browser not supported');
  }
}

function getWeather(position) {
  $.getJSON('http://api.openweathermap.org/data/2.5/weather?&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + "&units=imperial", function(data) {
    //Loading data into their placeholders
    $('.location').text(data.name + ", " + data.sys.country);
    $('.description').text(data.weather[0].description);
    $('#mySwitch').prop('checked', false);
    tempF = parseInt(data.main.temp);
    $('.temperature').html(tempF + "&deg");
    var icon = "owf-" + data.weather[0].id;
    $('#image').removeClass("owf-200");
    $('#image').addClass(icon);

    //Showing data with animations
    $('#progress-bar').hide();
    $('main').fadeOut(800, function() {
      $('main').css('background-image', "url(" + backgrounds[parseInt(data.weather[0].id / 100)] + ")");
      $('main').fadeIn(800, function() {
        $('.card').fadeIn(1000);
      });
    });
  });
}
