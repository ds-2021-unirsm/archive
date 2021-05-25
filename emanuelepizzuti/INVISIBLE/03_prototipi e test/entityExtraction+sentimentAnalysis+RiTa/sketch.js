//  ____ ____
// | ___|    |
// | ___|  __|
// |____|_|
// ___________
//
// Entity-Extraction + Sentiment-Analysis + RiTa by emanuelepizzuti [keyword1, keyword2]
// 2021 © emanuelepizzuti, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// ___________

/*
All'algoritmo viene data in pasto una frase -> Dandelion ne estrae le entità -> RiTa cambia queste entità.
Il colore del background cambia in base al balore estratto dalla sentiment analysis.
*/

let dandelion_token = "b71129fffdf6473ea700865788dabbcd";
let dandelion_token2 = "36f142c6e1824fabad5c1a76670c69c8";

let testo = "Israel hits Gaza with airstrikes amid rocket fire by Hamas";

var output = "";

let lang = "en";

let dataArray = [];
let dataArraySentiment = [];

let a = 70;

let coloreSentiment = 0;

function setup() {
  colorMode(HSB, 360, 100, 100);
  createCanvas(windowWidth, windowHeight);
  //background(255, 255, 250);
  textSize(20);

  sentimentAnalysis(testo);

  entitiesExtraction(testo);
}

/////////////ENTITIES////////////////

function entitiesExtraction(stringaDaValutare) {
  let url =
    "https://api.dandelion.eu/datatxt/nex/v1/?" +
    lang +
    "&min_confidence=0.6&text=" +
    testo +
    "&country=-1&social=False&top_entities=8&include=image%2Cabstract%2Ctypes%2Ccategories%2Clod&token=" +
    dandelion_token2;

  loadJSON(url, response);
}

function response(risposta) {
  console.log(risposta);
  for (let i = 0; i < risposta.annotations.length; i++) {
    dataArray.push(risposta.annotations[i].spot);
    // console.log(dataArray[dataArray.length - 1]);
  }
  // console.log(dataArray);

  processRita();
}

/////////////////////////////////////////////////////////////////////////////

/////////////SENTIMENT///////////////////////////////////////////////////////

function sentimentAnalysis(testo) {
  // SENTIMENT ANALYSIS
  let url2 =
    "https://api.dandelion.eu/datatxt/sent/v1/?lang=" +
    lang +
    "&text=" +
    testo +
    "&token=" +
    dandelion_token2;

  // visualizza RESPONSE una volta che ha effettuato la SA
  loadJSON(url2, response2);
}

function response2(sentResp2) {
  console.log(sentResp2);
  dataArraySentiment.push(sentResp2.sentiment.score);
  console.log(
    dataArraySentiment[dataArraySentiment.length - 1]
  );
  scegliColore();
}

function scegliColore() {
  let sentiment = dataArraySentiment[0];
  // console.log(sentiment);
  coloreSentiment = map(sentiment, -1, 1, 0, 200);
  console.log("colore " + coloreSentiment);
  //return coloreSentiment;
}

/////////////////////////////////////////////////////////////////////////////

function draw() {
  background(coloreSentiment, 10, 100);
  textAlign(LEFT);
  textStyle(BOLD);
  textSize(20);
  fill(40);
  textFont("Helvetica");
  text("Entities:", 35, 50);

  for (let k = 0; k < dataArray.length; k++) {
    textFont("Helvetica");
    textStyle(ITALIC);
    fill(40);
    textSize(20);
    text(dataArray[k], 35, a);
    a += 35;
    if (k == dataArray.length - 1) a = 80;
  }

  textAlign(CENTER);
  textStyle(NORMAL);
  textFont("Georgia");
  fill(40);
  textSize(20);
  text(testo, windowWidth / 2, windowHeight / 2 - 45);

  textFont("Georgia");
  fill(0);
  textSize(30);
  text(output, windowWidth / 2, windowHeight / 2);
}

///////////////////RITA/////////////////////

function processRita() {
  var words = RiTa.tokenize(testo);
  var pos = RiTa.pos(testo);
  console.log(words);
  console.log(pos);

  for (var i = 0; i < words.length; i++) {
    for (var k = 0; k < dataArray.length; k++) {
      if (words[i] === dataArray[k]) {
        words[i] = RiTa.randomWord({ pos: pos[i] });

        console.log(words);
      } else {
        continue;
      }

      if ((pos[i] === "nnp") | (pos[i] === "nnps")) {
        words[i] = RiTa.capitalize(words[i]); // keep capitals
      }
    }
    // output += " ";
  }
  output = RiTa.untokenize(words);
}
