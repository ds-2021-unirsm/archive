//https://www.w3schools.com/js/js_switch.asp SWITCH

//https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/ FILTER

////https://codepen.io/ahmady09/pen/PNejyN Esempio di WIKIQUOTE

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace REPLACE
//

//variabili per l'object
let objectDetector;

let objects = [];
let status;
let parole = [];
let categorie_trovate = [];

let img_coco,
    
  travel_img,
  nature_img,
  fashion_img,
  sports_img,
  food_img,
  book_img,
  electronic_img,
  stanza1,
  stanza2,
  stanza3,
  stanza4;

let coco_img, troppo_vecchia_img;
let  vecchia_img =2;

//variabili per WIKIQUOTE
let cit_trovate = [];
let unique_cit = [];
let cit_pulita;
let cit_per_mashup = [];

//var per RiTa
let lines = [];
let markov;
let x = 50,
  y = 700;

/////////////////////
/////// Categorie///
///////////////////

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
    oggetti: ["hat", "shoe", "suitcase", "tie", "handbag", "mirror"],
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
      "dining table",
    ],
    img: "img_categorie/food.png",
    cit: "Ratatouille",
  },

  {
    categoria: "book",
    oggetti: ["book", "bottle"],
    img: "img_categorie/book.png",
    cit: "Fahrenheit 451",
  },

  {
    categoria: "electronic",
    oggetti: ["tv", "laptop", "mouse", "remote", "keyboard", "cell phone","chair"],
    img: "img_categorie/electronic.png",
    cit: "IBM",
  },

  {
    categoria: "mystery",
    oggetti: [
      "teddy bear",
      "fire hydrant",
      "stop sign",
      "street sign",
      "dining table",
      "desk",
    ],
    img: "img_categorie/mistery.png",
    cit: "Mystery",
  },
];

//precarico i pittogrammi
function preload() {
  //img_coco = loadImage("images/stanza_assoluta.jpg");
  stanza1 = loadImage("images/stanza_assoluta.jpg");
  stanza2 = loadImage("images/desk_space.jpg");
  stanza3 = loadImage("images/stanza3.jpg");
  stanza4 = loadImage("images/desk_space2.jpg");

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

///////////////
/////// GUI///
/////////////

let parametri = {
  foto: "Seleziona una foto", //Menù a tendina: inserire valore all'avvio dello sketch
  Invia_a_Wunderkammer: function () {
    troppo_vecchia_img=parametri.foto;
        clear();
      createCanvas(640, 840);
  background(252, 247, 242);
  line(20, 20, 20, 620);
  line(220, 20, 220, 620);
  line(420, 20, 420, 620);
  line(620, 20, 620, 620);
  line(20, 20, 620, 20);
  line(20, 220, 620, 220);
  line(20, 420, 620, 420);
  line(20, 620, 620, 620);
        textFont("Roboto", 22);
  text("Wunderkammer", 50, 650, 420, 440);
  },

};

window.onload = function gui() {
  var gui = new dat.GUI();
  var f1 = gui.addFolder("Scegli la stanza");
  f1.add(parametri, "foto", [
    "room1", // valore dentro la tendina
    "room2",
    "room3",
    "room4",
  ]);
  gui.add(parametri, "Invia_a_Wunderkammer");
};

//////////////////////////////////
//////////////////////// SETUP///
////////////////////////////////

function setup() {
  createCanvas(640, 840);
  background(252, 247, 242);
  line(20, 20, 20, 620);
  line(220, 20, 220, 620);
  line(420, 20, 420, 620);
  line(620, 20, 620, 620);
  line(20, 20, 620, 20);
  line(20, 220, 620, 220);
  line(20, 420, 620, 420);
  line(20, 620, 620, 620);
      textFont("Roboto", 22);
  text("Wunderkammer", 50, 650, 420, 440);



  //evento1.onFinishChange(function() {

    //objectDetector = ml5.objectDetector("cocossd", modelReady);

  //console.log(categorie);
}




function draw(){

if (vecchia_img!= troppo_vecchia_img && vecchia_img!=parametri.foto && vecchia_img != undefined) {
    vecchia_img = parametri.foto;
    refresh_immagine();
  }

}



function pronto(){
  objectDetector = ml5.objectDetector("cocossd", modelReady);
}

function refresh_immagine() {
  if (parametri.foto == "room1") {
  coco_img = stanza1;
    pronto();
  }
  else if (parametri.foto == "room2") {
  coco_img = stanza3;
    pronto();
  }
}



// Change the status when the model loads.
function modelReady() {
  
    console.log("model Ready!");
    status = true;
    console.log("Detecting");

    objectDetector.detect(coco_img, gotResult);

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
    image(vuoto_img, 420, 420, 200, 200);
    // switchcase basato sulla categoria trovata
    switch (categoria.categoria) {
      case "travel":
        loadImage(categorie[0].img, (img) => {
          image(img, 20, 20, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        cit_trovate.push(categoria.cit);
        break;

      case "nature":
        loadImage(categorie[1].img, (img) => {
          image(img, 220, 20, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        cit_trovate.push(categoria.cit);
        break;

      case "fashion":
        loadImage(categorie[2].img, (img) => {
          image(img, 420, 20, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        cit_trovate.push(categoria.cit);
        break;

      case "sports":
        loadImage(categorie[3].img, (img) => {
          image(img, 20, 220, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        cit_trovate.push(categoria.cit);
        break;

      case "food":
        loadImage(categorie[4].img, (img) => {
          image(img, 220, 220, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        cit_trovate.push(categoria.cit);
        break;

      case "book":
        loadImage(categorie[5].img, (img) => {
          image(img, 420, 220, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        cit_trovate.push(categoria.cit);
        break;

      case "electronic":
        loadImage(categorie[6].img, (img) => {
          image(img, 20, 420, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        cit_trovate.push(categoria.cit);
        break;

      case "mystery":
        loadImage(categorie[7].img, (img) => {
          image(img, 220, 420, 200, 200);
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
    image(vuoto_img, 20, 20, 200, 200);
  }
  if (categorie_trovate.includes("nature")) {
  } else {
    image(vuoto_img, 220, 20, 200, 200);
  }
  if (categorie_trovate.includes("fashion")) {
  } else {
    image(vuoto_img, 420, 20, 200, 200);
  }
  if (categorie_trovate.includes("sports")) {
  } else {
    image(vuoto_img, 20, 220, 200, 200);
  }
  if (categorie_trovate.includes("food")) {
  } else {
    image(vuoto_img, 220, 220, 200, 200);
  }
  if (categorie_trovate.includes("book")) {
  } else {
    image(vuoto_img, 420, 220, 200, 200);
  }
  if (categorie_trovate.includes("electronic")) {
  } else {
    image(vuoto_img, 20, 420, 200, 200);
  }
  if (categorie_trovate.includes("mystery")) {
  } else {
    image(vuoto_img, 220, 420, 200, 200);
  }
  

}

//////////////////////////
/////// Ajax Wikiquote///
////////////////////////

var Wikiquote = (function () {
  var wqa = {};

  var API_URL = "https://en.wikiquote.org/w/api.php";

  /**
   * Query based on "titles" parameter and return page id.
   * If multiple page ids are returned, choose the first one.
   * Query includes "redirects" option to automatically traverse redirects.
   * All words will be capitalized as this generally yields more consistent results.
   */
  wqa.queryTitles = function (titles, success, error) {
    $.ajax({
      url: API_URL,
      dataType: "jsonp",
      data: {
        format: "json",
        action: "query",
        redirects: "",
        titles: titles,
      },

      success: function (result, status) {
        var pages = result.query.pages;
        var pageId = -1;
        for (var p in pages) {
          var page = pages[p];
          // api can return invalid recrods, these are marked as "missing"
          if (!("missing" in page)) {
            pageId = page.pageid;
            break;
          }
        }
        if (pageId > 0) {
          success(pageId);
        } else {
          error("No results");
        }
      },

      error: function (xhr, result, status) {
        error("Error processing your query");
      },
    });
  };

  /**
   * Get the sections for a given page.
   * This makes parsing for quotes more manageable.
   * Returns an array of all "1.x" sections as these usually contain the quotes.
   * If no 1.x sections exists, returns section 1. Returns the titles that were used
   * in case there is a redirect.
   */
  wqa.getSectionsForPage = function (pageId, success, error) {
    $.ajax({
      url: API_URL,
      dataType: "jsonp",
      data: {
        format: "json",
        action: "parse",
        prop: "sections",
        pageid: pageId,
      },

      success: function (result, status) {
        var sectionArray = [];
        var sections = result.parse.sections;
        for (var s in sections) {
          var splitNum = sections[s].number.split(".");
          if (splitNum.length > 1 && splitNum[0] === "1") {
            sectionArray.push(sections[s].index);
          }
        }
        // Use section 1 if there are no "1.x" sections
        if (sectionArray.length === 0) {
          sectionArray.push("1");
        }
        success({ titles: result.parse.title, sections: sectionArray });
      },
      error: function (xhr, result, status) {
        error("Error getting sections");
      },
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
  wqa.getQuotesForSection = function (pageId, sectionIndex, success, error) {
    $.ajax({
      url: API_URL,
      dataType: "jsonp",
      data: {
        format: "json",
        action: "parse",
        noimages: "",
        pageid: pageId,
        section: sectionIndex,
      },

      success: function (result, status) {
        var quotes = result.parse.text["*"];
        var quoteArray = [];

        // Find top level <li> only
        var $lis = $(quotes).find("li:not(li li)");
        $lis.each(function () {
          // Remove all children that aren't <b>
          $(this).children().remove(":not(b)");
          var $bolds = $(this).find("b");

          // If the section has bold text, use it.  Otherwise pull the plain text.
          if ($bolds.length > 0) {
            quoteArray.push($bolds.html());
          } else {
            quoteArray.push($(this).html());
          }
        });
        success({ titles: result.parse.title, quotes: quoteArray });
      },
      error: function (xhr, result, status) {
        error("Error getting quotes");
      },
    });
  };

  /**
   * Search using opensearch api.  Returns an array of search results.
   */
  wqa.openSearch = function (titles, success, error) {
    $.ajax({
      url: API_URL,
      dataType: "jsonp",
      data: {
        format: "json",
        action: "opensearch",
        namespace: 0,
        suggest: "",
        search: titles,
      },

      success: function (result, status) {
        success(result[1]);
      },
      error: function (xhr, result, status) {
        error("Error with opensearch for " + titles);
      },
    });
  };

  /**
   * Get a random quote for the given title search.
   * This function searches for a page id for the given title, chooses a random
   * section from the list of sections for the page, and then chooses a random
   * quote from that section.  Returns the titles that were used in case there
   * is a redirect.
   */
  wqa.getRandomQuote = function (titles, success, error) {
    var errorFunction = function (msg) {
      error(msg);
    };

    var chooseQuote = function (quotes) {
      var randomNum = Math.floor(Math.random() * quotes.quotes.length);
      success({ titles: quotes.titles, quote: quotes.quotes[randomNum] });
    };

    var getQuotes = function (pageId, sections) {
      var randomNum = Math.floor(Math.random() * sections.sections.length);
      wqa.getQuotesForSection(
        pageId,
        sections.sections[randomNum],
        chooseQuote,
        errorFunction
      );
    };

    var getSections = function (pageId) {
      wqa.getSectionsForPage(
        pageId,
        function (sections) {
          getQuotes(pageId, sections);
        },
        errorFunction
      );
    };

    wqa.queryTitles(titles, getSections, errorFunction);
  };

  /**
   * Capitalize the first letter of each word
   */
  wqa.capitalizeString = function (input) {
    var inputArray = input.split(" ");
    var output = [];
    for (s in inputArray) {
      output.push(
        inputArray[s].charAt(0).toUpperCase() + inputArray[s].slice(1)
      );
    }
    return output.join(" ");
  };

  return wqa;
})();
/* random qoutes from WikiQoutes api */
// il mio script wiki

(randInt = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min) + min;
}),
  (getQuote = function () {
    for (j = 0; j < 2; j++) {
      //faccio ripetere due volte l'estrazione della citazione per avere due cit diverse da dare a RiTa per il mashup
      Wikiquote.getRandomQuote(
        unique_cit[randInt(0, unique_cit.length - 1)],

        function (quote) {
          //console.log(quote.quote);
          cit_pulita = quote.quote.replace(/<[a-zA-Z/][^>]*>/g, ""); //uso il replace per pulire la stringa dai residui dell'html
          //console.log(cit_pulita + " sono cit PULITA");
          cit_per_mashup.push(cit_pulita);
          console.log(cit_per_mashup + " sono cit PER RITA");
          if (cit_per_mashup.length === 2) {
            mashup();
            cit_per_mashup.length =0;
          }
        }
      );
    }
  });
let quote;
// fine il mio script wiki

function mashup() {
  markov = RiTa.markov(2);
  markov.addText(cit_per_mashup[0]);
  markov.addText(cit_per_mashup[1]);
  lines = markov.generate(2); //n di linee
  textFont("Roboto", 18);
   text(lines.join(" "), x, y, 420, 440);
  console.log(lines + "sono MASHUP");
  lines = [""];
  objects.length=0;
parole.length=0;
                categorie_trovate.length=0;
 
}
