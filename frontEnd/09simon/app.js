var SERIES = [];
var SERIESID;
var LASTING_TIME = [850, 500, 300, 150];
var TURN = 0;

var SOUNDS = [];
var frequencies = [415, 310, 252, 209, 42];
var audioContext = new AudioContext();
var gainNode = audioContext.createGain();
gainNode.gain.value = 0.1;
gainNode.connect(audioContext.destination);

function Simon() {
  this.buttons = [$('#push0'), $('#push1'), $('#push2'), $('#push3')];
  this.counter = $('.counter');
  this.start = $('#start');
  this.strict = $('#strict');
  this.globalSwitch = $('.switch-inside');
  this.oscillator = null;

  //START EVENT
  // TO-DO Arrow function, check compatibilty and create fallback
  this.start.click(() => {
    TURN = 0;
    SERIES = [];
    this.showSeries(true);
  });

  // STRICT EVENT
  this.strict.click(function() {
    $(this).toggleClass('activated');
  });

  //GLOBAL SWITCH EVENT
  // TO-DO Arrow function
  $('.switch').click(() => {
    this.globalSwitch.toggleClass('off');
    if (this.globalSwitch.hasClass('off')) {
      clearInterval(SERIESID);
      this.turnOff();
    } else this.turnOn();
  });
}

Simon.prototype.setCounter = function(rounds) {
  this.counter.html(rounds);
};

Simon.prototype.turnOff = function() {
  TURN = 0;
  SERIES = [];
  this.setCounter('');
  for (var i in this.buttons) {
    this.buttons[i].css('pointer-events', 'none');
  }
  this.start.css('pointer-events', 'none');
  this.strict.css('pointer-events', 'none');
};

Simon.prototype.inactive = function() {
  for (var i in this.buttons) {
    this.buttons[i].css('pointer-events', 'none');
  }
  this.start.css('pointer-events', 'none');
  this.strict.css('pointer-events', 'none');
};

Simon.prototype.turnOn = function() {
  this.setCounter('--');
  this.start.css('pointer-events', 'auto');
  this.strict.css('pointer-events', 'auto');
};

Simon.prototype.active = function() {
  for (var i in this.buttons) {
    this.buttons[i].css('pointer-events', 'auto');
  }
  this.start.css('pointer-events', 'auto');
  this.strict.css('pointer-events', 'auto');
};

Simon.prototype.isStrict = function() {
  return this.strict.hasClass('activated');
};

Simon.prototype.glow = function(pushNumber, time) {
  this.buttons[pushNumber].addClass('glow');
  this.playSound(pushNumber);
  // TO-DO Arrow function
  setTimeout(() => {
    this.buttons[pushNumber].removeClass('glow');
    this.stopSound(pushNumber);
  }, time);
};

Simon.prototype.playSound = function(pushNumber) {
  this.oscillator = audioContext.createOscillator();
  this.oscillator.type = "square";
  this.oscillator.frequency.value = frequencies[pushNumber];
  this.oscillator.connect(gainNode);
  this.oscillator.start();
};

Simon.prototype.stopSound = function() {
  this.oscillator.stop();
};

Simon.prototype.showSeries = function(newBool) {
  var counter = 0;
  this.inactive();
  if (newBool || SERIES.length == 0) {
    SERIES.push(Math.floor(Math.random() * 4));
  }
  // TO-DO Arrow function
  SERIESID = setInterval(() => {
    this.glow(SERIES[counter], LASTING_TIME[this.period(SERIES.length)]);
    counter++;
    if (SERIES.length == counter) {
      setTimeout(() => {
        clearInterval(SERIESID);
        this.active();
      }, LASTING_TIME[this.period(SERIES.length)]);
    }
  }, LASTING_TIME[this.period(SERIES.length)] + 200);
  this.counter.html(SERIES.length);
};

Simon.prototype.check = function(buttonPushed) {
  if (buttonPushed == SERIES[TURN]) {
    TURN++;
    if (TURN == SERIES.length) {
      TURN = 0;
      if (this.isWinner(SERIES.length)) {} else this.showSeries(true);
    }
  } else {
    this.counter.html("!!");
    this.inactive();
    setTimeout(() => {
      if (this.isStrict()) {
        TURN = 0;
        SERIES = [];
        this.showSeries(true);
      } else {
        TURN = 0;
        this.showSeries(false);
      }
    }, LASTING_TIME[this.period(SERIES.length)]);
  }
};

Simon.prototype.period = function(number) {
  if (number < 5) return 0;
  else if (number >= 5 && number < 9) return 1;
  else if (number >= 9 && number < 13) return 2;
  else if (number >= 13) return 3;
};

Simon.prototype.isWinner = function(number) {
  if (number >= 20) {
    $('.winner').addClass('visible');
    setTimeout(() => {
      $('.winner').removeClass('visible');
      setTimeout(() => {
        TURN = 0;
        SERIES = [];
        this.showSeries(true);
      }, 1000);
    }, 3000);
    return true;
  } else return false;
};

$('document').ready(function() {
  var simon = new Simon();
  simon.showSeries(true);

  for (var i in simon.buttons) {
    simon.buttons[i].click(function(e) {
      simon.check(e.target.attributes.number.value);
    });

    simon.buttons[i].mousedown(function(e) {
      if (e.target.attributes.number.value == SERIES[TURN]) {
        simon.playSound(e.target.attributes.number.value);
      } else simon.playSound(4);

    });

    simon.buttons[i].mouseout(function(e) {
      simon.stopSound();
    });

    simon.buttons[i].mouseup(function(e) {
      simon.stopSound();
    });
  }
});
