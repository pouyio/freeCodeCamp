//TO-DO check to improve: http://ejohn.org/blog/how-javascript-timers-work/

//VARIABLES
var mode = "waiting"; //working pause
var session, sessionDefault, breaking, breakingDefault, intervalID;
var workPhrase = 'Let\'s work!';
var intervalTime = 1000;
var myCircle;

$(document).ready(function() {

  //JQUERY VARIABLES
  sessionDefault = $('#session-time').text();
  breakingDefault = $('#break-time').text();
  $('#stop-button').prop("disabled", true);
  //INITIAL CIRCLE
  myCircle = circle1();

  //CONTROLS
  //=================================
  // Session controls
  $('#session-plus').click(function() {
    sessionDefault++;
    myCircle.update(sessionDefault, 0);
    $('#session-time').text(sessionDefault);
    $('#session-minus').removeAttr('disabled');
  });
  $('#session-minus').click(function() {
    if (sessionDefault > 1) {
      sessionDefault--;
      $('#session-time').text(sessionDefault);
    }
    if (sessionDefault === 1) {
      $('#session-minus').attr('disabled', 'true');
    }
    myCircle.update(sessionDefault, 0);
  });

  // Break controls
  $('#break-plus').click(function() {
    myCircle = Circles.create({
      maxValue: 300,
    });
    breakingDefault++;
    $('#break-time').text(breakingDefault);
    $('#break-minus').removeAttr('disabled');
  });
  $('#break-minus').click(function() {
    if (breakingDefault > 1) {
      breakingDefault--;
      $('#break-time').text(breakingDefault);
    }
    if (breakingDefault === 1) {
      $('#break-minus').attr('disabled', 'true');
    }
  });


  //ACTIONS
  //=================================
  // Play-Pause-Resume button
  $('#play-button').click(function() {
    switch (mode) {
      case "waiting":
        {
          mode = "working";
          $(".controls, h1").fadeTo(1000, 0);
          session = $('#session-time').text() * 60;
          myCircle = circle2();
          myCircle.update(session, 0);
          breaking = $('#break-time').text() * 60;
          intervalID = setInterval(counter, intervalTime);
          $('.controls *').prop("disabled", true);
          $('#play-button').text('Pause');
          $('#stop-button').prop("disabled", false);
          break;
        }
      case "working":
        {
          mode = "pause";
          clearInterval(intervalID);
          $('#play-button').text('Resume');
          $('#stop-button').prop("disabled", false);
          break;
        }
      case "pause":
        mode = "working";
        intervalID = setInterval(counter, intervalTime);
        $('.controls *').prop("disabled", true);
        $('#play-button').text('Pause');
        $('#stop-button').prop("disabled", false);
        break;
      default:
        alert('Error: mode no\'t set');
    }
  });

  //Stop button
  $('#stop-button').click(finished);


  //FUNCTIONS
  function counter() {
    if (session > 0) {
      myCircle.update(session, intervalTime);
      session--;
      $('#clock2').text('Working Time Remaining');
    } else if (session === 0 && breaking > 0) {
      if (session === 0 && breaking === breakingDefault * 60) {
        myCircle = circle3();
        myCircle.update(0, 0);
        $('body').animate({
          'background-color': "#CCE0EB"
        }, 1000);
      }
      myCircle.update(breakingDefault * 60 - breaking, intervalTime);
      breaking--;
      $('#clock2').text('Breaking Time Remaining');
    } else if (session === 0 && breaking === 0) {
      finished();
    }
  }

  function finished() {
    clearInterval(intervalID);
    myCircle = circle1();
    mode = "waiting";
    $('body').animate({
      "background-color": "#FFF"
    }, 1000);
    $(".controls, h1").fadeTo(1000, 1);
    $('#clock2').text(workPhrase);
    $('.controls *').prop("disabled", false);
    $('#play-button').text('Start');
    $('#stop-button').prop('disabled', true);
  }

  //Set up timer
  function circle1() {
    var circle = Circles.create({
      id: 'circles-1',
      radius: 100,
      value: sessionDefault,
      maxValue: 100,
      width: 10,
      colors: ['#CCE0EB', '#CCE0EB'],
      duration: 0,
      wrpClass: 'circles-wrp',
      textClass: 'circles-text',
      valueStrokeClass: 'circles-valueStroke',
      maxValueStrokeClass: 'circles-maxValueStroke',
      styleWrapper: true,
      styleText: true
    });
    return circle;
  }

  //Working timer
  function circle2() {
    var circle = Circles.create({
      id: 'circles-1',
      radius: 100,
      value: 0,
      maxValue: session,
      width: 10,
      text: function() {
        if (session < 60) {
          return session;
        } else {
          return Math.floor(session / 60) + "<small>:" + ("0"+(session % 60)).slice(-2) + "</small>";
        }
      },
      colors: ['#006699', '#CCE0EB'],
      duration: 0,
      wrpClass: 'circles-wrp',
      textClass: 'circles-text',
      valueStrokeClass: 'circles-valueStroke',
      maxValueStrokeClass: 'circles-maxValueStroke',
      styleWrapper: true,
      styleText: true
    });
    return circle;
  }

  //Break timer
  function circle3() {
    var circle = Circles.create({
      id: 'circles-1',
      radius: 100,
      value: 0,
      maxValue: breakingDefault * 60,
      width: 10,
      text: function() {
        if (breaking < 60) {
          return breaking;
        } else {
          return Math.floor(breaking / 60) + ":<small>" + ("0" + (breaking % 60)).slice(-2) + "</small>";
        }
      },
      colors: ['#FF9933', '#FFEFDE'],
      duration: 0,
      wrpClass: 'circles-wrp',
      textClass: 'circles-text',
      valueStrokeClass: 'circles-valueStroke',
      maxValueStrokeClass: 'circles-maxValueStroke',
      styleWrapper: true,
      styleText: true
    });
    return circle;
  }
});
