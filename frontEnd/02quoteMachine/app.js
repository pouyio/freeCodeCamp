var quote = {
  backgrounds: ["http://24.media.tumblr.com/tumblr_m1jnblPxKm1rqpogjo1_500.jpg", "http://25.media.tumblr.com/tumblr_m44wdkCP9N1qhwmnpo1_1280.jpg"],
  init: function () {
    this.cacheDom();
    this.bindEvents();
    this.newQuote();
    this.requestBackgrounds();
  },
  cacheDom: function () {
    this.$block = $('.wrapper');
    this.$blockquote = this.$block.find('blockquote p');
    this.$background = this.$block.find('.background-image');
    // buttons
    this.$quoteButton = this.$block.find('.new-quote');
    this.$tweetButton = this.$block.find('.twitter-link');
  },
  bindEvents: function () {
    this.$quoteButton.on('click', this.newQuote.bind(this));
    this.$quoteButton.on('click', this.animate.bind(this));
    this.$quoteButton.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', this.removeAnimate.bind(this));
  },
  animate: function () {
    this.$quoteButton.addClass('animated');
  },
  removeAnimate: function () {
    this.$quoteButton.removeClass('animated');
  },
  newQuote: function () {
    var factString = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    this.$blockquote.html(factString);
    if (factString.length > 127) {
      factString = factString.substr(0, 127) + "...";
    }
    factString += " %23CatFacts";
    this.$tweetButton.attr('href', 'https://twitter.com/intent/tweet?text=' + factString);
    this.randomBackground();
  },
  requestBackgrounds: function () {
    $.ajax({
      url: "http://thecatapi.com/api/images/get?format=xml&results_per_page=20"
    })
      .done((data) =>  {
        this.backgrounds = this.backgrounds.concat($(data).find('image url').toArray().map(d => d.innerHTML));
      });
  },
  randomBackground: function () {
    this.$background.css('background-image', 'url(' + this.backgrounds[Math.floor(Math.random() * this.backgrounds.length)] + ')');
  },
  quotes: ["Unlike dogs, cats do not have a sweet tooth. Scientists believe this is due to a mutation in a key taste receptor.",
    "When a cat chases its prey, it keeps its head level. Dogs and humans bob their heads up and down.",
    "The technical term for a cat’s hairball is a “bezoar.”",
    "A group of cats is called a “clowder.”",
    "A cat can’t climb head first down a tree because every claw on a cat’s paw points the same way. To get down from a tree, a cat must back down.",
    "Cats make about 100 different sounds. Dogs make only about 10.",
    "Many people in China consider cats a warning food that is perfect to eat during the winter",
    "Every year, nearly four million cats are eaten in Asia.",
    "There are more than 500 million domestic cats in the world, with approximately 40 recognized breeds.",
    "Approximately 24 cat skins can make a coat.",
    "While it is commonly thought that the ancient Egyptians were the first to domesticate cats, the oldest known pet cat was recently found in a 9,500-year-old grave on the Mediterranean island of Cyprus. This grave predates early Egyptian art depicting cats by 4,000 years or more.",
    "During the time of the Spanish Inquisition, Pope Innocent VIII condemned cats as evil and thousands of cats were burned. Unfortunately, the widespread killing of cats led to an explosion of the rat population, which exacerbated the effects of the Black Death.",
    "During the Middle Ages, cats were associated with withcraft, and on St. John’s Day, people all over Europe would stuff them into sacks and toss the cats into bonfires. On holy days, people celebrated by tossing cats from church towers.",
    "The first cat in space was a French cat named Felicette (a.k.a. “Astrocat”) In 1963, France blasted the cat into outer space. Electrodes implanted in her brains sent neurological signals back to Earth. She survived the trip.",
    "The group of words associated with cat (catt, cath, chat, katze) stem from the Latin catus, meaning domestic cat, as opposed to feles, or wild cat.",
    "The term “puss” is the root of the principal word for “cat” in the Romanian term pisica and the root of secondary words in Lithuanian (puz) and Low German puus. Some scholars suggest that “puss” could be imitative of the hissing sound used to get a cat’s attention. As a slang word for the female pudenda, it could be associated with the connotation of a cat being soft, warm, and fuzzy.",
    "Approximately 40,000 people are bitten by cats in the U.S. annually.",
    "Cats are the world's most popular pets, outnumbering dogs by as many as three to one",
    "Cats are North America’s most popular pets: there are 73 million cats compared to 63 million dogs. Over 30% of households in North America own a cat.",
    "According to Hebrew legend, Noah prayed to God for help protecting all the food he stored on the ark from being eaten by rats. In reply, God made the lion sneeze, and out popped a cat.",
    "A cat’s hearing is better than a dog’s. And a cat can hear high-frequency sounds up to two octaves higher than a human.",
    "A cat can travel at a top speed of approximately 31 mph (49 km) over a short distance.",
    "A cat rubs against people not only to be affectionate but also to mark out its territory with scent glands around its face. The tail area and paws also carry the cat’s scent.",
    "Researchers are unsure exactly how a cat purrs. Most veterinarians believe that a cat purrs by vibrating vocal folds deep in the throat. To do this, a muscle in the larynx opens and closes the air passage about 25 times per second.",
    "When a family cat died in ancient Egypt, family members would mourn by shaving off their eyebrows. They also held elaborate funerals during which they drank wine and beat their breasts. The cat was embalmed with a sculpted wooden mask and the tiny mummy was placed in the family tomb or in a pet cemetery with tiny mummies of mice.",
    "In 1888, more than 300,000 mummified cats were found an Egyptian cemetery. They were stripped of their wrappings and carted off to be used by farmers in England and the U.S. for fertilizer.",
    "Most cats give birth to a litter of between one and nine kittens. The largest known litter ever produced was 19 kittens, of which 15 survived.",
    "Smuggling a cat out of ancient Egypt was punishable by death. Phoenician traders eventually succeeded in smuggling felines, which they sold to rich people in Athens and other important cities.",
    "The earliest ancestor of the modern cat lived about 30 million years ago. Scientists called it the Proailurus, which means “first cat” in Greek. The group of animals that pet cats belong to emerged around 12 million years ago.",
    "The biggest wildcat today is the Siberian Tiger. It can be more than 12 feet (3.6 m) long (about the size of a small car) and weigh up to 700 pounds (317 kg).",
    "Cats have 300 million neurons; dogs have about 160 million",
    "A cat’s brain is biologically more similar to a human brain than it is to a dog’s. Both humans and cats have identical regions in their brains that are responsible for emotions.",
    "Many Egyptians worshipped the goddess Bast, who had a woman’s body and a cat’s head.",
    "Mohammed loved cats and reportedly his favorite cat, Muezza, was a tabby. Legend says that tabby cats have an “M” for Mohammed on top of their heads because Mohammad would often rest his hand on the cat’s head.",
    "While many parts of Europe and North America consider the black cat a sign of bad luck, in Britain and Australia, black cats are considered lucky.",
    "The most popular pedigreed cat is the Persian cat, followed by the Main Coon cat and the Siamese cat.",
    "The smallest pedigreed cat is a Singapura, which can weigh just 4 lbs (1.8 kg), or about five large cans of cat food. The largest pedigreed cats are Maine Coon cats, which can weigh 25 lbs (11.3 kg), or nearly twice as much as an average cat weighs.",
    "Some cats have survived falls of over 65 feet (20 meters), due largely to their “righting reflex.” The eyes and balance organs in the inner ear tell it where it is in space so the cat can land on its feet. Even cats without a tail have this ability.",
    "Some Siamese cats appear cross-eyed because the nerves from the left side of the brain go to mostly the right eye and the nerves from the right side of the brain go mostly to the left eye. This causes some double vision, which the cat tries to correct by “crossing” its eyes.",
    "Researchers believe the word “tabby” comes from Attabiyah, a neighborhood in Baghdad, Iraq. Tabbies got their name because their striped coats resembled the famous wavy patterns in the silk produced in this city.",
    "Cats have nine lives thanks to a flexible spine and powerful leg and back muscles",
    "A cat can jump up to five times its own height in a single bound.",
    "Cats hate the water because their fur does not insulate well when it’s wet. The Turkish Van, however, is one cat that likes swimming. Bred in central Asia, its coat has a unique texture that makes it water resistant.",
    "The Egyptian Mau is probably the oldest breed of cat. In fact, the breed is so ancient that its name is the Egyptian word for “cat.”",
    "The first commercially cloned pet was a cat named Little Nicky. He cost his owner $50,000, making him one of the most expensive cats ever.",
    "A cat usually has about 12 whiskers on each side of its face.",
    "A cat’s eyesight is both better and worse than humans. It is better because cats can see in much dimmer light and they have a wider peripheral view. It’s worse because they don’t see color as well as humans do. Scientists believe grass appears red to cats.",
    "Spanish-Jewish folklore recounts that Adam’s first wife, Lilith, became a black vampire cat, sucking the blood from sleeping babies. This may be the root of the superstition that a cat will smother a sleeping baby or suck out the child’s breath.",
    "Perhaps the most famous comic cat is the Cheshire Cat in Lewis Carroll’s Alice in Wonderland. With the ability to disappear, this mysterious character embodies the magic and sorcery historically associated with cats.",
    "The smallest wildcat today is the Black-footed cat. The females are less than 20 inches (50 cm) long and can weigh as little as 2.5 lbs (1.2 kg).",
    "On average, cats spend 2/3 of every day sleeping. That means a nine-year-old cat has been awake for only three years of its life.",
    "Most cats sleep around 16 hours a day",
    "In the original Italian version of Cinderella, the benevolent fairy godmother figure was a cat.",
    "The little tufts of hair in a cat’s ear that help keep out dirt direct sounds into the ear, and insulate the ears are called “ear furnishings.”",
    "The ability of a cat to find its way home is called “psi-traveling.” Experts think cats either use the angle of the sunlight to find their way or that cats have magnetized cells in their brains that act as compasses."
  ]
};

quote.init();
