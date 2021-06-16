//https://www.w3schools.com/js/js_switch.asp SWITCH

//https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/ FILTER

////https://codepen.io/ahmady09/pen/PNejyN Esempio di WIKIQUOTE

let objectDetector;

let img_coco,
  travel_img,
  nature_img,
  fashion_img,
  sports_img,
  food_img,
  book_img,
  electronic_img;

let cit_trovate = [];
let unique_cit=[];

let img_poster = [];
console.log(img_poster + "qui ci sono le img");

let objects = [];
let status;
let parole = [];
let categorie_trovate = [];

var categorie = [
  {
    categoria: "travel",
    oggetti: ["car", "motorcycle", "airplane", "bus", "train"],
    img: "img_categorie/travel.png",
    cit: "Travel",
  },

  {
    categoria: "nature",
    oggetti: [
      "potted plant",
      "bench",
      "bird",
      "cat",
      "dog",
      "horse",
      "sheep",
      "cow",
      "elephant",
      "bear",
      "zebra",
      "giraffe",
      "vase",
    ],
    img: "img_categorie/nature.png",
    cit: "Carl Linnaeus",
  },

  {
    categoria: "fashion",
    oggetti: ["hat", "shoe", "suitcase", "tie", "handbag"],
    img: "img_categorie/moda.png",
    cit: "Coco Chanel",
  },

  {
    categoria: "sports",
    oggetti: [
      "bicycle",
      "frisbee",
      "skis",
      "snowboard",
      "sports ball",
      "kite",
      "baseball bat",
      "baseball glove",
      "skateboard",
      "surfboard",
      "tennis racket",
      "boat",
    ],
    img: "img_categorie/sport.png",
    cit: "Arnold Schwarzenegger",
  },

  {
    categoria: "food",
    oggetti: [
      "plate",
      "wine glass",
      "cup",
      "fork",
      "knife",
      "spoon",
      "bowl",
      "banana",
      "apple",
      "sandwich",
      "orange",
      "broccoli",
      "carrot",
      "hot dog",
      "pizza",
      "donut",
      "cake",
    ],
    img: "img_categorie/food.png",
    cit: "Ratatouille",
  },

  {
    categoria: "book",
    oggetti: ["book"],
    img: "img_categorie/book.png",
    cit: "Fahrenheit 451",
  },

  {
    categoria: "electronic",
    oggetti: ["tv", "laptop", "mouse", "remote", "keyboard", "cell phone"],
    img: "img_categorie/electronic.png",
    cit: "IBM",
  },

  {
    categoria: "mystery",
    oggetti: ["teddy bear", "fire hydrant", "stop sign", "street sign"],
    img: "img_categorie/mistery.png",
    cit: "Mystery",
  },
];

function preload() {
  img_coco = loadImage("images/stanza_assoluta.jpg");

  //for (let i = 0; i < categorie.length; i++) {
  //img_poster = loadImage(categorie[i].img);
  //}
  travel_img = loadImage("img_categorie/travel.png");
  nature_img = loadImage("img_categorie/nature.png");
  fashion_img = loadImage("img_categorie/moda.png");
  sports_img = loadImage("img_categorie/sport.png");
  food_img = loadImage("img_categorie/food.png");
  book_img = loadImage("img_categorie/book.png");
  electronic_img = loadImage("img_categorie/electronic.png");
  mystery_img = loadImage("img_categorie/mistery.png");
  vuoto_img = loadImage("img_categorie/vuoto.png");
}

function setup() {
  createCanvas(800, 600);
  background(252, 247, 242);
  line(200, 0, 200, 400);
  line(400, 0, 400, 400);
  line(600, 0, 600, 400);
  line(0, 200, 800, 200);
  line(0, 400, 800, 400);

  objectDetector = ml5.objectDetector("cocossd", modelReady);
  console.log(categorie);
}

// Change the status when the model loads.
function modelReady() {
  console.log("model Ready!");
  status = true;
  console.log("Detecting");
  objectDetector.detect(img_coco, gotResult);
}

// A function to run when we get any errors and the results
function gotResult(err, results) {
  if (err) {
    console.log(err);
  }
  console.log(results);
  objects = results;
  for (let i = 0; i < objects.length; i++) {
    //mi faccio un array con le parole trovate
    parole.push(objects[i].label);
    console.log(parole);
  }

  cerca(parole);
  getQuote();
  
}

function cerca(parole) {
  for (let i = 0; i < parole.length; i++) {
    // trova la prima categoria che contiene un oggetto utile
    let categoria = categorie.find((c) => c.oggetti.includes(parole[i]));
    console.log(parole[i] + " trovato nella categoria " + categoria.categoria); //dentro la var categoria metto l'oggetto in cui si trova la parola

    // switchcase basato sulla categoria trovata
    switch (categoria.categoria) {
      case "travel":
        loadImage(categorie[0].img, (img) => {
          image(img, 0, 0, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        cit_trovate.push(categoria.cit);
        break;

      case "nature":
        loadImage(categorie[1].img, (img) => {
          image(img, 200, 0, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        cit_trovate.push(categoria.cit);
        break;

      case "fashion":
        loadImage(categorie[2].img, (img) => {
          image(img, 400, 0, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        cit_trovate.push(categoria.cit);
        break;

      case "sports":
        loadImage(categorie[3].img, (img) => {
          image(img, 600, 0, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        cit_trovate.push(categoria.cit);
        break;

      case "food":
        loadImage(categorie[4].img, (img) => {
          image(img, 0, 200, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        cit_trovate.push(categoria.cit);
        break;

      case "book":
        loadImage(categorie[5].img, (img) => {
          image(img, 200, 200, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        cit_trovate.push(categoria.cit);
        break;

      case "electronic":
        loadImage(categorie[6].img, (img) => {
          image(img, 400, 200, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        cit_trovate.push(categoria.cit);
        break;

      case "mystery":
        loadImage(categorie[7].img, (img) => {
          image(img, 600, 200, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        cit_trovate.push(categoria.cit);
        break;
    }
  }
  //console.log(categorie_trovate);
  console.log(cit_trovate + "FUORI switch");
  
  //con il metodo filter elimino i doppioni delle categorie per non dare a Rita due citazioni della stessa categoria
  unique_cit = cit_trovate.filter((c, index) => {
  return cit_trovate.indexOf(c) === index;
});
  
  console.log(unique_cit + " sono unica cit");

//if per fargli stampare la quadrettatura nel caso in cui non dovesse trovare le altre categorie che quindi rimangono nascoste   
  if (categorie_trovate.includes("travel")) {
  } else {
    image(vuoto_img, 0, 0, 200, 200);
  }
  if (categorie_trovate.includes("nature")) {
  } else {
    image(vuoto_img, 200, 0, 200, 200);
  }
  if (categorie_trovate.includes("fashion")) {
  } else {
    image(vuoto_img, 400, 0, 200, 200);
  }
  if (categorie_trovate.includes("sports")) {
  } else {
    image(vuoto_img, 600, 0, 200, 200);
  }
  if (categorie_trovate.includes("food")) {
  } else {
    image(vuoto_img, 0, 200, 200, 200);
  }
  if (categorie_trovate.includes("book")) {
  } else {
    image(vuoto_img, 200, 200, 200, 200);
  }
  if (categorie_trovate.includes("electronic")) {
  } else {
    image(vuoto_img, 400, 200, 200, 200);
  }
  if (categorie_trovate.includes("mystery")) {
  } else {
    image(vuoto_img, 600, 200, 200, 200);
  }
}

var Wikiquote = (function() {

    var wqa = {};

    var API_URL = "https://en.wikiquote.org/w/api.php";

    /**
     * Query based on "titles" parameter and return page id.
     * If multiple page ids are returned, choose the first one.
     * Query includes "redirects" option to automatically traverse redirects.
     * All words will be capitalized as this generally yields more consistent results.
     */
    wqa.queryTitles = function(titles, success, error) {
        $.ajax({
            url: API_URL,
            dataType: "jsonp",
            data: {
                format: "json",
                action: "query",
                redirects: "",
                titles: titles
            },

            success: function(result, status) {
                var pages = result.query.pages;
                var pageId = -1;
                for(var p in pages) {
                    var page = pages[p];
                    // api can return invalid recrods, these are marked as "missing"
                    if(!("missing" in page)) {
                        pageId = page.pageid;
                        break;
                    }
                }
                if(pageId > 0) {
                    success(pageId);
                } else {
                    error("No results");
                }
            },

            error: function(xhr, result, status){
                error("Error processing your query");
            }
        });
    };

    /**
     * Get the sections for a given page.
     * This makes parsing for quotes more manageable.
     * Returns an array of all "1.x" sections as these usually contain the quotes.
     * If no 1.x sections exists, returns section 1. Returns the titles that were used
     * in case there is a redirect.
     */
    wqa.getSectionsForPage = function(pageId, success, error) {
        $.ajax({
            url: API_URL,
            dataType: "jsonp",
            data: {
                format: "json",
                action: "parse",
                prop: "sections",
                pageid: pageId
            },

            success: function(result, status){
                var sectionArray = [];
                var sections = result.parse.sections;
                for(var s in sections) {
                    var splitNum = sections[s].number.split('.');
                    if(splitNum.length > 1 && splitNum[0] === "1") {
                        sectionArray.push(sections[s].index);
                    }
                }
                // Use section 1 if there are no "1.x" sections
                if(sectionArray.length === 0) {
                    sectionArray.push("1");
                }
                success({ titles: result.parse.title, sections: sectionArray });
            },
            error: function(xhr, result, status){
                error("Error getting sections");
            }
        });
    };

    /**
     * Get all quotes for a given section.  Most sections will be of the format:
     * <h3> title </h3>
     * <ul>
     *   <li>
     *     Quote text
     *     <ul>
     *       <li> additional info on the quote </li>
     *     </ul>
     *   </li>
     * <ul>
     * <ul> next quote etc... </ul>
     *
     * The quote may or may not contain sections inside <b /> tags.
     *
     * For quotes with bold sections, only the bold part is returned for brevity
     * (usually the bold part is more well known).
     * Otherwise the entire text is returned.  Returns the titles that were used
     * in case there is a redirect.
     */
    wqa.getQuotesForSection = function(pageId, sectionIndex, success, error) {
        $.ajax({
            url: API_URL,
            dataType: "jsonp",
            data: {
                format: "json",
                action: "parse",
                noimages: "",
                pageid: pageId,
                section: sectionIndex
            },

            success: function(result, status){
                var quotes = result.parse.text["*"];
                var quoteArray = []

                // Find top level <li> only
                var $lis = $(quotes).find('li:not(li li)');
                $lis.each(function() {
                    // Remove all children that aren't <b>
                    $(this).children().remove(':not(b)');
                    var $bolds = $(this).find('b');

                    // If the section has bold text, use it.  Otherwise pull the plain text.
                    if($bolds.length > 0) {
                        quoteArray.push($bolds.html());
                    } else {
                        quoteArray.push($(this).html());
                    }
                });
                success({ titles: result.parse.title, quotes: quoteArray });
            },
            error: function(xhr, result, status){
                error("Error getting quotes");
            }
        });
    };

    /**
     * Search using opensearch api.  Returns an array of search results.
     */
    wqa.openSearch = function(titles, success, error) {
        $.ajax({
            url: API_URL,
            dataType: "jsonp",
            data: {
                format: "json",
                action: "opensearch",
                namespace: 0,
                suggest: "",
                search: titles
            },

            success: function(result, status){
                success(result[1]);
            },
            error: function(xhr, result, status){
                error("Error with opensearch for " + titles);
            }
        });
    };

    /**
     * Get a random quote for the given title search.
     * This function searches for a page id for the given title, chooses a random
     * section from the list of sections for the page, and then chooses a random
     * quote from that section.  Returns the titles that were used in case there
     * is a redirect.
     */
    wqa.getRandomQuote = function(titles, success, error) {

        var errorFunction = function(msg) {
            error(msg);
        };

        var chooseQuote = function(quotes) {
            var randomNum = Math.floor(Math.random()*quotes.quotes.length);
            success({ titles: quotes.titles, quote: quotes.quotes[randomNum] });
        };

        var getQuotes = function(pageId, sections) {
            var randomNum = Math.floor(Math.random()*sections.sections.length);
            wqa.getQuotesForSection(pageId, sections.sections[randomNum], chooseQuote, errorFunction);
        };

        var getSections = function(pageId) {
            wqa.getSectionsForPage(pageId, function(sections) { getQuotes(pageId, sections); }, errorFunction);
        };

        wqa.queryTitles(titles, getSections, errorFunction);
    };

    /**
     * Capitalize the first letter of each word
     */
    wqa.capitalizeString = function(input) {
        var inputArray = input.split(' ');
        var output = [];
        for(s in inputArray) {
            output.push(inputArray[s].charAt(0).toUpperCase() + inputArray[s].slice(1));
        }
        return output.join(' ');
    };

    return wqa;
}());
/* random qoutes from WikiQoutes api */
// il mio script wiki 


  
    randInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
 
   

    getQuote =  function() {     
        Wikiquote.getRandomQuote(unique_cit[randInt(0,1)],
            function (quote) {
                console.log(quote.quote);
            }, function (e) {
        });
    };
let quote
$(function() {
    getQuote();
    $('#new-quote').on('click', getQuote);
});
// fine il mio script wiki
