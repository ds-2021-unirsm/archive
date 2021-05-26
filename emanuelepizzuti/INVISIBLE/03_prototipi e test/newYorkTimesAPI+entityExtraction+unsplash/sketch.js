//  ____ ____
// | ___|    |
// | ___|  __|
// |____|_|
// ___________
//
// NewYorkTimes API + Entity Extraction + Unsplash by emanuelepizzuti [keyword1, keyword2]
// 2021 © emanuelepizzuti, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// ___________

/*
L'algoritmo permette di cercare un termine da cui ricavare la notizia
*/

let input;
let button;

let search = "";
let APIkey = "FyvMXGFPgbJBCqvBan4LT4Eao8hiKtvK";

let titolo;
let paragrafo;

//--

//let quote = "trump didn't win elections";
let entities = [];
let keyword = "";

var imgsResolution = "320x240";
var img = [];

function setup() {
  createCanvas(windowWidth, windowHeight - 100);

  input = createInput();
  button = createButton("submit");
  // input.changed(processNYT);
  button.mouseReleased(processNYT);
  input.size(300);
}

//--

function processNYT(search) {
  search = input.value();

  let url =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
    search +
    "&api-key=" +
    APIkey;

  loadJSON(url, gotData1);
}

function gotData1(data) {
  var articles = data.response.docs;

  let casuale = int(random(0, 9));

  titolo = articles[casuale].headline.main;
  paragrafo = articles[casuale].snippet;

  console.log(titolo + "     " + paragrafo);

  dandelion();
}

//--

function dandelion() {
  search = input.value();
  console.log("oooooooo" + search);
  loadJSON(
    "https://api.dandelion.eu/datatxt/nex/v1/?lang=en%20&text=" +
      search +
      "&include=types%2Cabstract%2Ccategories%2Clod&include=image&min_confidence=0,0&token=5db5cba74eb741bba4068e13c54c917b",
    gotData
  );
}

 function gotData(datatxt) {
  for (let i = 0; i < datatxt.annotations.length; i++) {
    entities.push(datatxt.annotations[i].spot);
  }
  console.log(entities);
  keyword = datatxt.annotations[0].spot;
  console.log(keyword);

  let imgCanvas =  carica(keyword);
  img.push(imgCanvas);
}

 function carica(search) {
  var url =
    "https://source.unsplash.com/" +
    imgsResolution +
    "/?" +
    search +
    "&" +
    random(5); // < un random per caricarne sempre una nuova anche sugli stessi temi

  var img_Loading =  loadImage(url);
  return img_Loading;
}

function draw() {
  background(245);

  textFont("Georgia");
  textSize(40);
  textStyle(BOLD);
  text(titolo, 50, 70, windowWidth / 2 - 50, 200);
  textSize(25);
  textStyle(NORMAL);
  text(paragrafo, 50, 300, windowWidth / 2 - 50, 400);

  for (var i = 0; i < img.length; i++) {
    image(img[img.length-1], windowWidth / 2, 70, 400, 400);
  }
}
