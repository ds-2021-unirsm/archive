//  ____ ____
// | ___|  _ |
// | ___|  __|
// |____|_|
// ___________
//
// BROKEN NEWS! (versione 02) by emanuelepizzuti [journalism, sentiment]
// 2021 © emanuelepizzuti, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to:
//
// Sentiment Analysis API, Dandelion API
// @dandelionapi (twitter.com/dandelionapi) for https://dandelion.eu/semantic-text/sentiment-analysis-demo/?appid=it%3A1568245971&exec=true
// original license: v.2 - 02/Sep/2013
//
// RiTa version 2.4 for https://rednoise.org/rita/
// original license: GPL License
//
// Unsplash API for https://unsplash.com/developers
// original license: GPL License
// -
//
// Help:
// ["try again"] Cambia una parola nel titolo
// ["save"] Salva l'articolo come png
// ["reset"] Torna alla pagina iniziale
// ___________


let timer = 2;

let interval;

let cnv; // canvas
let input;
let buttonSearch;
let buttonReset;
let buttonSalva;
let buttonRetry;

let search = "";
let NYT_APIkey = "FyvMXGFPgbJBCqvBan4LT4Eao8hiKtvK";

let occhiello = "";
let titolo = "";
let paragrafo = "";
let txt = "";

let timeout;
let counter = 0;

let coloreSentiment;
let lang = "en";
let dandelion_token = "b71129fffdf6473ea700865788dabbcd";
let dandelion_token2 = "36f142c6e1824fabad5c1a76670c69c8";

let newSentiment;
let sentimentType;

let imgsResolution = "320x240";
let img = [];

let controllo = true;

let mondwest;
let SSRegular;
let SSBold;
let inter;
let interSB;

function preload() {
  mondwest = loadFont("fonts/Mondwest-Regular.otf");
  SSRegular = loadFont("fonts/SourceSerifPro-Regular.ttf");
  SSBold = loadFont("fonts/SourceSerifPro-SemiBold.ttf");
  inter = loadFont("fonts/Inter-Regular.ttf");
  interSB = loadFont("fonts/Inter-SemiBold.ttf");
}

//-- setup
function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  
  let col = color(255);
  buttonReset = createButton("reset");
  buttonReset.position(windowWidth / 2 + 430, windowHeight / 2 - 548);
  buttonReset.size(70, 40);
  buttonReset.style("font-size", "18px");
  buttonReset.style("background-color", col);
  buttonReset.mouseOver(funzioneOver).mouseOut(noOver);
  buttonReset.mouseReleased(resetSketch);
  
  buttonSalva = createButton("salva");
  buttonSalva.position(windowWidth / 2 + 350, windowHeight / 2 - 548);
  buttonSalva.size(70, 40);
  buttonSalva.style("font-size", "18px");
  buttonSalva.style("background-color", col);
  buttonSalva.mouseOver(funzioneOver).mouseOut(noOver);
  buttonSalva.mouseReleased(saveSketch);
  
  buttonRetry = createButton("CAMBIA");
  buttonRetry.position(windowWidth / 2-200,
      windowHeight / 2 +400);
  buttonRetry.size(400, 40);
  buttonRetry.style("font-size", "18px");
  buttonRetry.style("background-color", col);
  buttonRetry.mouseOver(funzioneOver).mouseOut(noOver).mousePressed(click);
  buttonRetry.mouseReleased(retry);
  
  sfondo = createDiv();
  sfondo.position(0, 0);
  sfondo.size(windowWidth, windowHeight);
  sfondo.style("background-color", "#fff");

  BN = createP("BROKEN NEWS!");
  BN.position(windowWidth / 2 - 190, windowHeight / 2 - 160);
  BN.style("font-size", "60px");
  BN.style("font-family", "mondwest");

  inserisci = createP("Inserisci un termine di ricerca...");
  inserisci.position(windowWidth / 2 - 170, windowHeight / 2 - 40);
  inserisci.style("color", "#D3D3D3");

  input = createInput();
  input.position(windowWidth / 2 - 170, windowHeight / 2);
  input.size(250, 34);
  input.style("font-size", "20px");
  input.style("border-radius", "0px");

  buttonSearch = createButton(" ⌕    ");
  buttonSearch.position(windowWidth / 2 + 90, windowHeight / 2);
  buttonSearch.size(80, 40);
  buttonSearch.style("font-size", "40px");
  buttonSearch.style("line-height", "35px");
  buttonSearch.style("background-color", col);
  buttonSearch.style("border-radius", "0px");
  buttonSearch.mouseOver(funzioneOver).mouseOut(noOver);
  buttonSearch.mouseReleased(cancellaTutto);

    dati = createP(
    "UNIRSM Design | DS 20/21 - Daniele Tabellini, Irene Trotta | studente: Emanuele Pizzuti"
  );
  dati.position(windowWidth / 2 - 295, windowHeight - 80);
  dati.style("color", "#D3D3D3");


}

function click() {
    this.style("background-color", color(100, 0, 60));

}

function funzioneOver() {
  this.style("background-color", color(100, 0, 80));
}

function noOver() {
  let col = color(255);
  this.style("background-color", col);
}

function saveSketch() {
  save(cnv, "myCanvas.jpg");
}

/*
function keyPressed() {
  if (keyCode === ENTER) {
    cancellaTutto();
  }
}
*/

function resetSketch() {
buttonSearch.hide();
  input.hide();
  inserisci.hide();
  sfondo.hide();
  dati.hide();

  occhiello = "";
  titolo = "";
  paragrafo = "";
  txt = "";
  img = [];
  sentimentType = "";
  coloreSentiment = color(0, 0, 0);

  sfondo = createDiv();
  sfondo.position(0, 0);
  sfondo.size(windowWidth, windowHeight);
  sfondo.style("background-color", "#fff");

  let col = color(255);
  buttonSearch = createButton(" ⌕    ");
  buttonSearch.position(windowWidth / 2 + 90, windowHeight / 2);
  buttonSearch.size(80, 40);
  buttonSearch.style("font-size", "40px");
  buttonSearch.style("line-height", "35px");
  buttonSearch.style("background-color", col);
  buttonSearch.mouseOver(funzioneOver).mouseOut(noOver);
  buttonSearch.mouseReleased(cancellaTutto);

  input = createInput();
  input.position(windowWidth / 2 - 170, windowHeight / 2);
  input.size(250, 35);
  input.style("font-size", "20px");

  BN = createP("BROKEN NEWS!");
  BN.position(windowWidth / 2 - 190, windowHeight / 2 - 160);
  BN.style("font-size", "60px");
  BN.style("font-family", "mondwest");

  inserisci = createP("Inserisci un termine di ricerca...");
  inserisci.position(windowWidth / 2 - 170, windowHeight / 2 - 40);
  inserisci.style("color", "#D3D3D3");

  dati = createP(
    "UNIRSM Design | DS 20/21 - Daniele Tabellini, Irene Trotta | studente: Emanuele Pizzuti"
  );
  dati.position(windowWidth / 2 - 295, windowHeight - 80);
  dati.style("color", "#D3D3D3");

}

//-- cancellaTutto - svuota tutto prima di visualizzare una nuova notizia
function cancellaTutto() {
  input.hide();
  inserisci.hide();
  sfondo.hide();
  BN.hide();
  dati.hide();
  possoColorare = false;
  buttonSearch.hide();
  occhiello = "";
  titolo = "";
  newTitolo = "";
  paragrafo = "";
  txt = "";
  counter = 0;
  coloreSentiment = color(0, 0, 0);

  
  processNYT();
}

function retry() {
  this.style("background-color", color(100, 0, 80))
  nextWord();
}

//-- Unsplash
function carica(search) {
  search = input.value();
  var url =
    "https://source.unsplash.com/" +
    imgsResolution +
    "/?" +
    search +
    "&" +
    random(5); // < un random per caricarne sempre una nuova anche sugli stessi temi

  var img_Loading = loadImage(url);
  return img_Loading;
}

//-- NewYorkTimes API
function processNYT(search) {
  search = input.value();
  let url =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
    search +
    "&api-key=" +
    NYT_APIkey;

  loadJSON(url, gotData1);
}

function gotData1(data) {
  let articles = data.response.docs;
  let casuale = int(random(0, 9));
  // console.log(articles[casuale]);
  
  occhiello = articles[casuale].section_name;
  titolo = articles[casuale].headline.main;
  paragrafo = articles[casuale].snippet;
  txt = articles[casuale].lead_paragraph;

  let imgCanvas = carica(search);
  img.push(imgCanvas);

  nextWord();
}

//-- RiTa
// sostituisce una parola a caso nel testo ////////////// ogni x secondi
function nextWord() {
  let words = RiTa.tokenize(titolo); // split into words (array)

  // loop from a random spot
  let r = floor(random(0, words.length));
  for (let i = r; i < words.length + r; i++) {
    let idx = i % words.length;
    let word = words[idx].toLowerCase();
    if (word.length < 3) continue; // len >= 3

    // find related words
    let pos = RiTa.tagger.allTags(word)[0];
    let rhymes = RiTa.rhymes(word, { pos });
    let sounds = RiTa.soundsLike(word, { pos });
    let spells = RiTa.spellsLike(word, { pos });
    let similars = [...rhymes, ...sounds, ...spells];

    // only words with 2 or more similars
    if (similars.length < 2) {
      //console.log("No sims for " + word);
      continue;
    }

    // pick a random similar
    let next = RiTa.random(similars);

    if (next.includes(word) || word.includes(next)) {
      continue; // skip substrings
    }
    if (/[A-Z]/.test(words[idx][0])) {
      next = RiTa.capitalize(next); // keep capitals
    }

    console.log("replace(" + idx + "): " + word + " -> " + next);
    words[idx] = next; // do replacement

    break;
  }

  // recombine into string and display
  titolo = RiTa.untokenize(words);

  //if (counter % 5 === 0) {
  sentimentAnalysis(titolo);
  //}
  //counter++;

  //setTimeout(nextWord, 3000);
}

//-- Sentiment Analysis
function sentimentAnalysis(testo) {
  //console.log("nuovo titolo da analizzare: " + newTitolo);
  // SENTIMENT ANALYSIS
  let url2 =
    "https://api.dandelion.eu/datatxt/sent/v1/?lang=" +
    lang +
    "&text=" +
    titolo +
    "&token=" +
    dandelion_token;

  // visualizza RESPONSE una volta che ha effettuato la SA
  loadJSON(url2, response2);
}

function response2(sentResp2) {
  //console.log(sentResp2);
  newSentiment = sentResp2.sentiment.score;
  sentimentType = "A " + sentResp2.sentiment.type + " \nNewspaper";
  console.log("sentimento trovato: " + sentResp2.sentiment.type);

  scegliColore();
}

function scegliColore() {
  let sentiment = newSentiment;
  //console.log("LEGGI QUESTO" + sentiment);
  coloreSentiment = map(sentiment, -1, 1, 0, 200);
  //console.log("colore " + coloreSentiment);
}

//-- Draw
function draw() {
  background(100);
  textFont("Georgia");

  // PERIMETRO
  rectMode(CENTER);
  noFill();
  stroke(0);
  strokeWeight(2);
  rect(windowWidth / 2, windowHeight / 2, 1000, 1000);

  // BROKEN NEWS!
  push();
  rectMode(CENTER);

  rect(windowWidth / 2 - 370, windowHeight / 2 - 427, 160, 70);
  rect(windowWidth / 2 + 370, windowHeight / 2 - 427, 160, 70);
  pop();

  noStroke();
  fill(0);
  textAlign(CENTER);
  textFont(mondwest);
  textSize(75);
  textStyle(BOLD);
  text("BROKEN NEWS!  ", windowWidth / 2, windowHeight / 2 - 400);

  // SENTIMENT
  push();
  noStroke();
  fill(0);
  textSize(18);
  textLeading(20);
  textFont(mondwest);
  textAlign(CENTER);
  text(sentimentType, windowWidth / 2 - 370, windowHeight / 2 - 430);
  text(sentimentType, windowWidth / 2 + 370, windowHeight / 2 - 430);
  pop();

  // INTESTAZIONE
  rectMode(CENTER);
  fill(0);
  rect(windowWidth / 2, windowHeight / 2 - 360, 900, 1);

  textAlign(CENTER);
  textFont(inter);
  textSize(16);
  textStyle(BOLD);
  text(
    "Clicca su CAMBIA per trasformare il titolo!",
    windowWidth / 2,
    windowHeight / 2 - 338
  );

  rectMode(CENTER);
  fill(0);
  rect(windowWidth / 2, windowHeight / 2 - 330, 900, 1);

  textSize(12);
  text(
    "UNIRSM Design | DS 20/21 - Daniele Tabellini, Irene Trotta | studente: Emanuele Pizzuti",
    windowWidth / 2,
    windowHeight / 2 + 485
  );

  // KEYWORDS DEL TITOLO (OCCHIELLO)
  fill(60);
  textAlign(LEFT);
  textFont(interSB);
  textSize(20);
  textStyle(NORMAL);
  text(occhiello, windowWidth / 2 - 450, windowHeight / 2 - 275);

  // TITOLO CHE VIENE CAMBIATO
  fill(0);
  rectMode(CORNER);
  textFont(SSBold);
  textAlign(LEFT);
  textSize(40);
  textLeading(40);
  textStyle(BOLD);
  text(titolo, windowWidth / 2 - 450, windowHeight / 2 - 265, 480, 600);

  // SOTTOTITOLO
  textSize(22);
  textLeading(25);
  textFont(SSBold);
  textStyle(NORMAL);
  text(paragrafo, windowWidth / 2 - 450, windowHeight / 2 - 80, 480, 400);

  // TESTO ARTICOLO
  textSize(18);
  textLeading(25);
  textFont(SSRegular);
  textStyle(NORMAL);
  text(txt, windowWidth / 2 - 450, windowHeight / 2 + 50, 480, 400);

  // IMMAGINE
  for (var i = 0; i < img.length; i++) {
    push();
    image(
      img[img.length - 1],
      windowWidth / 2 + 50,
      windowHeight / 2 - 260,
      400,
      400
    );

    filter(GRAY);

    blendMode(MULTIPLY);
    squareColor = color(coloreSentiment, 20, 100);
    squareColor.setAlpha(1);
    fill(squareColor);
    rect(windowWidth / 2 + 50, windowHeight / 2 - 260, 400, 400);

    pop();
  }
  push();
  blendMode(MULTIPLY);
  squareColor = color(coloreSentiment, 20, 100);
  squareColor.setAlpha(1);
  fill(squareColor);
  rectMode(CENTER);
  rect(windowWidth / 2 - 370, windowHeight / 2 - 427, 160, 70);
  rect(windowWidth / 2 + 370, windowHeight / 2 - 427, 160, 70);

  pop();
}
