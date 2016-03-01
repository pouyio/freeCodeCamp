var quote = {
  quotes: ["Here come the facts"],
  pointer: 1,
  backgrounds: ["http://24.media.tumblr.com/tumblr_m1jnblPxKm1rqpogjo1_500.jpg", "http://25.media.tumblr.com/tumblr_m44wdkCP9N1qhwmnpo1_1280.jpg"],
  init: function() {
    this.cacheDom();
    this.bindEvents();
    this.factsRequest();
    this.newQuote();
    this.setBackground(this.$background, 0);
    this.setBackground(this.$cache, 1);
  },
  factsRequest: function() {
    var url = 'http://json2jsonp.com/?url=catfacts-api.appspot.com/api/facts?number=100';
    $.ajax({
      url: url,
      dataType: 'jsonp',
      success: this.collectFacts.bind(this)
    });
  },
  collectFacts: function(data) {
    this.quotes = this.quotes.concat(data.facts)
  },
  cacheDom: function() {
    this.$block = $('.wrapper');
    this.$blockquote = this.$block.find('blockquote p');
    this.$background = this.$block.find('.background-image');
    this.$cache = this.$block.find('.cache-image');
    // buttons
    this.$quoteButton = this.$block.find('.new-quote');
    this.$tweetButton = this.$block.find('.twitter-link');
  },
  bindEvents: function() {
    this.$quoteButton.on('click', this.newQuote.bind(this));
    this.$quoteButton.on('click', this.animate.bind(this));
    this.$quoteButton.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', this.removeAnimate.bind(this));
  },
  animate: function() {
    this.$quoteButton.addClass('animated');
  },
  removeAnimate: function() {
    this.$quoteButton.removeClass('animated');
  },
  newQuote: function() {
    if (this.quotes.length == 1) {
      this.factsRequest();
    }
    var factString = this.quotes[0];
    this.$blockquote.html(factString);
    if (factString.length > 127) {
      factString = factString.substr(0, 127) + "...";
    }
    factString += " %23CatFacts";
    this.$tweetButton.attr('href', 'https://twitter.com/intent/tweet?text=' + factString);
    this.quotes.shift();

    // BACKGROUND THINKGS
    this.requestBackground();
    this.shiftBackground("background");
  },
  requestBackground: function() {
    $.ajax({
        url: "http://exhibitionnest.com/cat",
        dataType: 'jsonp'
      })
      .always(function() {
        quote.shiftBackground("cache");
      });
  },
  shiftBackground: function(imageHolder) {
    switch (imageHolder) {
      case "background":
        this.setBackground(this.$background, this.pointer);
        break;
      case "cache":
        this.setBackground(this.$cache, this.pointer + 1);
        this.pointer++;
        break
      default:
    }
  },
  setBackground: function(imageHolder, pointer) {
    imageHolder.css('background-image', 'url(' + this.backgrounds[pointer] + ')');
  }
};

//Jsonp callback, impossible to put inside the quote module
var theCatIsCute = function(data) {
  quote.backgrounds.push(data.cat);
};

quote.init();
