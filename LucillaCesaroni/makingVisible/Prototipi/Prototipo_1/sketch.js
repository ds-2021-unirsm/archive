//         ___       ________
//        |\  \     |\   ____\
//        \ \  \    \ \  \___|
//         \ \  \    \ \  \
//          \ \  \____\ \  \____
//           \ \_______\ \_______\
//            \|_______|\|_______|

// -
//
// Metamorfosi 0.1 by Lucilla Cesaroni [translations, images, words]
// 2021 Lucilla @LucillaCesaroni, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm - github.com/fupete - github.com/LucillaCesaroni
// Educational purposes, MIT License, 2021, San Marino
//
// -
//
// Credits/Thanks to:
// p5.speech.js Speech Recognition, Speech synthesis, R.Luke DuBois
// The ABILITY lab, New York University for
// https://github.com/IDMNYU/p5.js-speech/blob/master/LICENSE
// original license: MIT License 2017
//
// A2Z F18, Daniel Shiffman for
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18
// original license: MIT License 2018
//
// Sentiment Analysis API & Entity Extraction, Dandelion API for
// https://dandelion.eu
// original license: v.2 - 02/Sep/2013
//
// Photos from Unsplash for
// https://unsplash.com
//
// —
//
// Help:
// [speech] traduction
// [click] buttons for activate start, pause, stop, new
//
// —

let canvas;

// Settings
let w, h;
let lang = "it";
let token = "436c5baef9e54af1a0de6a370e4ade38";
//  let token = "36f142c6e1824fabad5c1a76670c69c8";

// Immagini
let immagini = []; // array immagini da visualizzare
var imgsResolution = "640x480"; // risoluzione immagini

// Speech Object
let speechRec;
let recordingAvviato = false;

// Sentiment
let sentiment = 0;
let sentimentColor;
let analisiCompletata = false;

// Speech racconto
let racconto = "";
let raccontoSplittato = [];

// per mettere testo sopra img
let variabile;
let contatoreEntita = 0;

let myFont, myFont2;

function preload() {
  // Fonts per il testo
  myFont = loadFont("GTAmerica-UltraLight.otf");
  myFont2 = loadFont("GTAmerica-Regular.otf");
}

function setup() {
  canvas = createCanvas((w = windowWidth), (h = windowHeight - 91)); // -91 altezza bottoni

  colorMode(HSB, 360, 100, 100);

  textFont(myFont2, 30);

  //background(240, 100, 25);

  // Al click del bottone inizia la registrazione
  $("#speakbutton").on("click", function () {
    console.log("Hai cliccato raccontami");

    //racconto = "";
    recordingAvviato = true;
    startRec();
  });

  // Al click del bottone pausa
  $("#pausespeakbutton").on("click", function () {
    console.log("Hai cliccato pausa");

    recordingAvviato = false;
  });

  // Al click del bottone stoppa la registrazione e invia la risposta
  $("#stopspeakbutton").on("click", function () {
    console.log("Hai cliccato stop rec");

    recordingAvviato = false;
    // Se hai stoppato la registrazione parte l'analisi del sentiment
    if (recordingAvviato == false) {
      analisiSentiment(racconto);
    }
  });

  // Al click del bottone cancella tutto
  $("#cancellaspeakbutton").on("click", function () {
    console.log("Hai cliccato cancella tutto");

    background(60, 6, 100);
    contatoreEntita = 0;
    recordingAvviato = false;
    racconto = "";
    raccontoSplittato = [];
    immagini = [];
    //$("#registrazione").html(""); // Pulisci la frase sopra
  });
}

function startRec() {
  console.log("Sono qua, inizia a raccontare...");

  // Crea un'oggetto Speech Recognition con una callback
  speechRec = new p5.SpeechRec("it-IT", gotSpeech);

  // "Continuous recognition"
  let continuous = true;
  // Recognition parziale (più veloce, meno accurata)
  let interimResults = false;

  speechRec.start(continuous, interimResults);

  // Scrivi nell'id registrazione l'output della registrazione
  let output = select("#registrazione");

  // Evento Speech recognized
  function gotSpeech() {
    //console.log(speechRec);

    if (speechRec.resultValue && recordingAvviato == true) {
      racconto = racconto + " " + speechRec.resultString; // Salvo il racconto in una variabile
      //output.html(racconto); // Visualizza nell'html
      console.log("Racconto: " + racconto);
      raccontoSplittato = racconto.split(" "); // metto nell'array raccontoSplittato le singole parole del racconto
      raccontoSplittato.splice(0, 1);
      console.log("Racconto splittato: " + raccontoSplittato);
    }
  }
}

function analisiSentiment(racconto) {
  // Parte l'analisi x il sentimento del racconto
  let sentimenturl =
    "https://api.dandelion.eu/datatxt/sent/v1/?lang=" +
    lang +
    "&text=" +
    racconto +
    "&token=" +
    token;
  loadJSON(sentimenturl, showResponse); // Callback showResponse
}

// Sentiment analysis della frase per il colore del font
function showResponse(r_) {
  console.log("Sentiment: " + JSON.stringify(r_));

  analisiCompletata = true;
  sentiment = r_.sentiment.score;

  if (analisiCompletata) {
    // Se l'analisi è completata allora mappi il sentiment
    sentimentColor = map(sentiment, -1, 1, 0, 180);

    analisi(racconto); // E invii l'analisi della frase con il racconto
  }
}

function analisi(racconto) {
  // Parte l'analisi x le entità del racconto
  let url =
    "https://api.dandelion.eu/datatxt/nex/v1/?lang=" +
    lang +
    "&min_confidence=0.2&text=" +
    racconto +
    "&token=" +
    token;
  loadJSON(url, visualizzaRisposta); // Callback visualizzaRisposta
}

// Immagini da unsplash
function visualizzaRisposta(risposta) {
  console.log(
    "Risposta con il JSON con le entità: " + JSON.stringify(risposta)
  );

  // Se non ci sono entità allora scrivi solo la frase
  if (risposta.annotations.length == 0) {
    console.log("Non sono state trovate entità");
    fill(sentimentColor, 100, 100);
    text(racconto, 40, 90);
    return;
  }

  variabile = risposta;

  var i = risposta.annotations[contatoreEntita]; // chiamo visualizzarisposta e passo la singola risposta

  var str = i.spot; // Salvo l'entità in una variabile locale
  // Con spot pesco l'entità

  var string = str.toLowerCase(); // Metto in minuscolo

  //console.log("HEY:" + string);
  // Carico l'immagine
  loadImage(
    "https://source.unsplash.com/" +
      imgsResolution +
      "/?" +
      string +
      "&" +
      random(200),
    salvaimmagine
  );

  contatoreEntita += 1; // Incremento il contatore delle entità
}

function salvaimmagine(img) {
  immagini.push(img);
  console.log("Contatore entità: " + contatoreEntita);
  console.log("Contatore immagini: " + immagini.length);

  if (contatoreEntita == variabile.annotations.length) {
    console.log("Ho caricato tutte le foto");

    contatoreEntita = 0;

    scriviFraseTradotta(variabile); // mando la funzione che mi disegna e scrive il testo della frase pronunciata
  } else {
    visualizzaRisposta(variabile);
  }
}

function scriviFraseTradotta(variabile) {
  // Nella variabile c'è il json con le entità
  let entita = [];

  for (let conta = 0; conta < variabile.annotations.length; conta++) {
    entita.push(variabile.annotations[conta].spot); // Pusho dentro le entita
    console.log("entita " + conta + ": " + variabile.annotations[conta].spot);
  }

  console.log("numero img:" + immagini.length);
  console.log("numero entita:" + entita.length);

  // Colore per il testo
  fill(sentimentColor, 100, 100);

  let x = 40;
  let y = 40;

  // Altezza e Larghezza delle img
  let hImg = 100;
  let wImg = 150;

  let larghezza = []; // Array per i valori di ogni lunghezza delle singole parole

  for (let f = 0; f < raccontoSplittato.length; f++) {
    larghezza.push(textWidth(raccontoSplittato[f])); // Pusho nell'array ogni valore della lunghezza delle singole parole
  }

  let spazio = textWidth(" "); // Larghezza spazio

  let id_currentImage = 0;

  for (let f = 0; f < raccontoSplittato.length; f++) {
    // Vado a capo ogni 9 parole
    if (f % 9 == 0 && f != 0) {
      y += 120;
      x = 40;
    }

    if (raccontoSplittato[f] == entita[id_currentImage]) {
      console.log(
        "inserita immagine di entita: " +
          id_currentImage +
          ": " +
          JSON.stringify(entita[id_currentImage])
      );
      image(immagini[id_currentImage], x, y, wImg, hImg);
      id_currentImage += 1;

      text(
        raccontoSplittato[f],
        x + wImg / 2 - textWidth(raccontoSplittato[f]) / 2,
        y + 50
      );

      x += wImg + spazio;
    } else {
      text(raccontoSplittato[f], x, y + 50);
      x += larghezza[f] + spazio;
    }
  }
}

// Premi "s", screen
function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(canvas, "Myimg", "jpg");
}
