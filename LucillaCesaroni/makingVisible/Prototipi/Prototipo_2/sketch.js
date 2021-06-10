//         ___       ________
//        |\  \     |\   ____\
//        \ \  \    \ \  \___|
//         \ \  \    \ \  \
//          \ \  \____\ \  \____
//           \ \_______\ \_______\
//            \|_______|\|_______|

// -
//
// metamorfosi by Lucilla Cesaroni [comunicare, parole, icone, emozioni, inclusione]
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
// Sentiment Analysis
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
//
// Simple GUI interface
// Daniele @Fupete & Luigi @MrJ4ckpot
// https://editor.p5js.org/fupete/sketches/WUY1jA4jn for original code
//
// —
//
// Help:
// [webcam] expression
// [speech] traduction
// [click] buttons for activate start, pause, stop, new
//
// —

let faceapi;
let video;
let detections;

// per posizionare video al centro
let origineX = 0;
let origineY = 0;

let val = []; // per il sentiment

// Settings
let lang = "it";
let token = "436c5baef9e54af1a0de6a370e4ade38";
//  let token = "36f142c6e1824fabad5c1a76670c69c8";

// Immagini
let immagini = []; // array immagini da visualizzare
var imgsResolution = "640x480"; // risoluzione immagini
let wImg = 90;
let hImg = 60;

// Per posizionare le img a fianco e non sopra i punti chiave
let randomDist = 80;
let randomX = [];
let randomY = [];

// Speech Object
let speechRec;
let recordingAvviato = false;

// Speech racconto
let racconto = "";

// Variabile che mi serve per registrare la "risposta" che mi viene da Dandelion
let variabile;

// Quante entità ho
let contatoreEntita = 0;

// Bottoni
let speakbutton;
let pausebutton;
let stopspeakbutton;
let cancellaspeakbutton;

// Utili per il draw
let tuttoProntoNoEntita = false;
let tuttoPronto = false;

// Font
let myFont;
let myFont2;

// Per la sentiment analysis
let sentiment;
let saturation;
let brightness;
let valoreMassimo;

let canvas;

// per interfaccia GUI, per cambiare colore emozioni
let parametri = {
  felicita: 151, // Slider: valore all'avvio dello sketch
  tristezza: 206,
  arrabbiato: 0,
  timoroso: 234,
  disgustato: 55,
  sorpreso: 272,
};

window.onload = function () {
  var gui = new dat.GUI();

  var f0 = gui.addFolder("Scegli colori emozioni");
  f0.add(parametri, "felicita", 0, 360);
  f0.add(parametri, "tristezza", 0, 360);
  f0.add(parametri, "arrabbiato", 0, 360);
  f0.add(parametri, "timoroso", 0, 360);
  f0.add(parametri, "disgustato", 0, 360);
  f0.add(parametri, "sorpreso", 0, 360);
};

function preload() {
  // Font per il testo
  myFont = loadFont("Inter-Regular.ttf");
  myFont2 = loadFont("Inter-SemiBold.ttf");
}

// by default all options are set to true
const detection_options = {
  withLandmarks: true,
  withDescriptors: false,
};

function setup() {
  canvas = createCanvas(windowWidth - 20, windowHeight - 20); // guarda https://github.com/processing/p5.js-web-editor/issues/680 || per i bottoni

  textFont(myFont, 15);

  background(255);

  colorMode(HSB, 360, 100, 100);

  // load up your video
  video = createCapture(VIDEO);

  video.hide(); // Hide the video element, and just show the canvas

  origineX = windowWidth / 2 - video.width - 35;
  origineY = windowHeight / 2 - video.height - 90; // - altezza del rettangolo sottotitoli

  faceapi = ml5.faceApi(video, detection_options, modelReady);

  disegnapulsanti();
}

function modelReady() {
  console.log("ready!");
  console.log(faceapi);
  faceapi.detect(gotResults);
}

function pauseRec() {
  console.log("Hai cliccato pausa");

  recordingAvviato = false;
}

function stopRec() {
  console.log("Hai cliccato stop rec");

  contatoreEntita = 0;

  recordingAvviato = false;

  // Se hai stoppato la registrazione parte l'analisi del sentiment
  if (recordingAvviato == false) {
    // Parte l'analisi x le entità del racconto
    let url =
      "https://api.dandelion.eu/datatxt/nex/v1/?lang=" +
      lang +
      "&min_confidence=0.4&text=" +
      racconto +
      "&token=" +
      token;
    loadJSON(url, visualizzaRisposta); // Callback visualizzaRisposta
  }
}

function newRec() {
  console.log("Hai cliccato cancella tutto");

  recordingAvviato = false;
  tuttoProntoNoEntita = false;
  tuttoPronto = false;
  racconto = "";
  immagini = [];
  contatoreEntita = 0;
}

// Immagini da unsplash
function visualizzaRisposta(risposta) {
  console.log(
    "Risposta con il JSON con le entità: " + JSON.stringify(risposta)
  );

  // Se non ci sono entità allora scrivi solo la frase
  if (risposta.annotations.length == 0) {
    console.log("Non sono state trovate entità");
    tuttoProntoNoEntita = true;

    return;
  }

  variabile = risposta;

  var i = risposta.annotations[contatoreEntita]; // chiamo visualizzarisposta e passo la singola risposta

  var str = i.spot; // Salvo l'entità in una variabile locale
  // Con spot pesco l'entità

  var string = str.toLowerCase(); // Metto in minuscolo

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
  // crea un numero random per positions
  // tra -randomDist e randomDist
  randomX.push(random() * 2 * randomDist - randomDist - 10); // origineX - 10 perchè l'ho spostato al centro
  randomY.push(random() * 2 * randomDist - randomDist - 10);

  console.log("Contatore entità: " + contatoreEntita);
  console.log("Contatore immagini: " + immagini.length);

  if (contatoreEntita == variabile.annotations.length) {
    console.log("Ho caricato tutte le foto");

    contatoreEntita = 0;

    tuttoPronto = true;
  } else {
    visualizzaRisposta(variabile);
  }
}

function gotResults(err, result) {
  if (err) {
    console.log(err);
    return;
  }

  detections = result;
  // console.log("detections: " + JSON.stringify(detections));

  background(255);

  // titolo
  fill(0);
  noStroke();
  textAlign(LEFT, TOP);
  let titolo = "metamorfosi";
  textFont(myFont2, 34);
  text(titolo, origineX, origineY - 180);

  // istruzioni
  textAlign(LEFT, TOP);
  textFont(myFont, 17);
  text(
    "Premi il pulsante start e inizia a raccontare qualcosa. Premi il pulsante stop quando vuoi analizzare quello che hai detto. Premi il pulsante pausa quando devi pensare. Premi il pulsante new quando vuoi analizzare una nuova frase.",
    origineX,
    origineY - 90,
    video.width
  );

  // rettangolo sotto per sottotitolazione
  fill(255);
  strokeWeight(1);
  stroke(0);
  rect(origineX, origineY + video.height + 4, video.width, 90);

  // video
  // console.log("larghezza video: " + video.width);
  image(video, origineX, origineY, video.width, video.height);
  filter(GRAY);

  if (detections) {
    if (detections.length > 0) {
      const { expressions } = detections[0];

      // console.log(expressions);

      // console.log("val" + val);

      let keys = Object.keys(expressions); // restituisce un array di nomi di proprietà enumerabili di un dato oggetto,
      // ripetuti nello stesso ordine che farebbe un normale ciclo
      //console.log(keys);
      keys.forEach((item, idx) => {
        // scritta
        fill(0);
        noStroke();
        textFont(myFont, 17);
        textAlign(LEFT, TOP);
        text(`${item}`, origineX + 30, idx * 23 + origineY + 30);

        // funzione che prende il valore
        val[idx] = expressions[item];
        let valore = map(expressions[item], 0, 1, 0, 200);
        fill(0);
        noStroke();
        rect(origineX + 150, idx * 23 + origineY + 38, valore, 6); // x y w h
        stroke(0);
        strokeWeight(1);
        noFill();
        rect(origineX + 150, idx * 23 + origineY + 38, 200, 6);
      });

      valoreMassimo = max(val);

      // per il colore prende il numero piu alto nell'array
      if (valoreMassimo == val[0]) {
        sentiment = 0; // NERO
        saturation = 0;
        brightness = 0;
      } else if (valoreMassimo == val[1]) {
        sentiment = parametri.felicita; // VERDE
        saturation = 100;
        brightness = 97;
      } else if (valoreMassimo == val[2]) {
        sentiment = parametri.tristezza; // AZZURRO
        saturation = 40;
        brightness = 100;
      } else if (valoreMassimo == val[3]) {
        sentiment = parametri.arrabbiato; // ROSSO
        saturation = 70;
        brightness = 100;
      } else if (valoreMassimo == val[4]) {
        sentiment = parametri.timoroso; // BLU
        saturation = 70;
        brightness = 100;
      } else if (valoreMassimo == val[5]) {
        sentiment = parametri.disgusto; // VERDE BRUTTO
        saturation = 57;
        brightness = 80;
      } else if (valoreMassimo == val[6]) {
        sentiment = parametri.sorpreso; // VIOLA
        saturation = 55;
        brightness = 100;
      }

      val[0] = floor(map(val[0], 0, 1, 40, 38));
      val[1] = floor(map(val[1], 0, 1, 200, 402)); // felicità
      val[2] = floor(map(val[2], 0, 1, 800, 650)); // tristezza
      val[3] = floor(map(val[3], 0, 1, 30, 4)); // rabbia
      val[4] = floor(map(val[4], 0, 1, 18, 48)); // paura
      val[5] = floor(map(val[5], 0, 1, 55, 500)); // disgusto
      val[6] = floor(map(val[6], 0, 1, 88, 150)); // sorpresa

      drawLandmarks(detections);
    }
  }
  faceapi.detect(gotResults);
}

function disegnapulsanti() {
  // bottoni
  speakbutton = createButton("start");
  speakbutton.style("background-color", "#ffffff");
  speakbutton.style("color", "#000000");
  speakbutton.style("border", "1px solid #000000");
  speakbutton.style("font-family", "Inter-Regular");
  speakbutton.style("font-size", "1em");
  speakbutton.style("padding-top", "6px");
  speakbutton.style("padding-bottom", "6px");
  speakbutton.style("padding-left", "15px");
  speakbutton.style("padding-right", "15px");
  speakbutton.mouseOver(inside0).mouseOut(outside0);
  speakbutton.mousePressed(startRec);
  speakbutton.position(origineX + 7, origineY + video.height * 3.2 + 125);

  pausebutton = createButton("pause");
  pausebutton.style("background-color", "#ffffff");
  pausebutton.style("color", "#000000");
  pausebutton.style("border", "1px solid #000000");
  pausebutton.style("font-family", "Inter-Regular");
  pausebutton.style("font-size", "1em");
  pausebutton.style("padding-top", "6px");
  pausebutton.style("padding-bottom", "6px");
  pausebutton.style("padding-left", "15px");
  pausebutton.style("padding-right", "15px");
  pausebutton.mouseOver(inside1).mouseOut(outside1);
  pausebutton.mousePressed(pauseRec);
  pausebutton.position(origineX + 77, origineY + video.height * 3.2 + 125);

  stopspeakbutton = createButton("stop");
  stopspeakbutton.style("background-color", "#ffffff");
  stopspeakbutton.style("color", "#000000");
  stopspeakbutton.style("border", "1px solid #000000");
  stopspeakbutton.style("font-family", "Inter-Regular");
  stopspeakbutton.style("font-size", "1em");
  stopspeakbutton.style("padding-top", "6px");
  stopspeakbutton.style("padding-bottom", "6px");
  stopspeakbutton.style("padding-left", "15px");
  stopspeakbutton.style("padding-right", "15px");
  stopspeakbutton.mouseOver(inside2).mouseOut(outside2);
  stopspeakbutton.mousePressed(stopRec);
  stopspeakbutton.position(origineX + 157, origineY + video.height * 3.2 + 125);

  cancellaspeakbutton = createButton("new");
  cancellaspeakbutton.style("background-color", "#ffffff");
  cancellaspeakbutton.style("color", "#000000");
  cancellaspeakbutton.style("border", "1px solid #000000");
  cancellaspeakbutton.style("font-family", "Inter-Regular");
  cancellaspeakbutton.style("font-size", "1em");
  cancellaspeakbutton.style("padding-top", "6px");
  cancellaspeakbutton.style("padding-bottom", "6px");
  cancellaspeakbutton.style("padding-left", "15px");
  cancellaspeakbutton.style("padding-right", "15px");
  cancellaspeakbutton.mouseOver(inside3).mouseOut(outside3);
  cancellaspeakbutton.mousePressed(newRec);
  cancellaspeakbutton.position(
    origineX + 225,
    origineY + video.height * 3.2 + 125
  );

  function inside0() {
    speakbutton.style("background-color", "#000000");
    speakbutton.style("color", "#ffffff");
  }
  function outside0() {
    speakbutton.style("background-color", "#ffffff");
    speakbutton.style("color", "#000000");
  }

  function inside1() {
    pausebutton.style("background-color", "#000000");
    pausebutton.style("color", "#ffffff");
  }
  function outside1() {
    pausebutton.style("background-color", "#ffffff");
    pausebutton.style("color", "#000000");
  }

  function inside2() {
    stopspeakbutton.style("background-color", "#000000");
    stopspeakbutton.style("color", "#ffffff");
  }
  function outside2() {
    stopspeakbutton.style("background-color", "#ffffff");
    stopspeakbutton.style("color", "#000000");
  }

  function inside3() {
    cancellaspeakbutton.style("background-color", "#000000");
    cancellaspeakbutton.style("color", "#ffffff");
  }
  function outside3() {
    cancellaspeakbutton.style("background-color", "#ffffff");
    cancellaspeakbutton.style("color", "#000000");
  }
}

function startRec() {
  recordingAvviato = true;
  console.log("Hai cliccato raccontami, inizia a raccontare...");

  // Crea un'oggetto Speech Recognition con una callback
  speechRec = new p5.SpeechRec("it-IT", gotSpeech);

  // "Continuous recognition"
  let continuous = true;
  // Recognition parziale (più veloce, meno accurata)
  let interimResults = false;

  speechRec.start(continuous, interimResults);

  // Evento Speech recognized
  function gotSpeech() {
    //console.log(speechRec);

    if (speechRec.resultValue && recordingAvviato == true) {
      racconto = racconto + speechRec.resultString + " "; // Salvo il racconto in una variabile
      console.log("Racconto: " + racconto);
    }
  }
}
function drawLandmarks(detections) {
  //console.log("detections: "+ JSON.stringify(detections))

  for (let i = 0; i < detections.length; i++) {
    // me lo continuerà a mandare all'infinito

    let positions = []; // creo un'array per le posizioni dei 6 punti

    positions[0] = detections[i].parts.leftEyeBrow;
    positions[1] = detections[i].parts.rightEyeBrow;
    positions[2] = detections[i].parts.mouth;
    //positions[3] = detections[i].parts.nose;
    //positions[4] = detections[i].parts.leftEye;
    //positions[5] = detections[i].parts.rightEye;

    if (tuttoProntoNoEntita == true) {
      //console.log("eccomi");
      noStroke();
      fill(sentiment, saturation, brightness);
      textFont(myFont2, 17);
      textAlign(CENTER, CENTER);
      text(
        racconto,
        windowWidth / 2 - 250 - 15,
        origineY + video.height, // centro verticalmente rispetto rettangolo
        500,
        90
      );
    } else if (tuttoPronto == true) {
      // console.log ("sto disegnando le img");
      noStroke();
      fill(sentiment, saturation, brightness);
      textFont(myFont2, 17);
      textAlign(CENTER, CENTER);
      text(
        racconto,
        windowWidth / 2 - 250 - 10,
        origineY + video.height,
        500,
        90
      );

      for (let i = 0; i < immagini.length; i++) {
        // mi passo l'array delle immagini
        drawPart(positions[i % positions.length], i); // ogni 6 ricomincia il giro perche 0 modulo 6 fa 0 e 6 modulo 6 fa 0 di nuovo
      }
    }
  }

  function drawPart(feature, num) {
    // console.log("feature: " + JSON.stringify(feature));

    image(
      immagini[num],
      feature[3]._x + randomX[num] + origineX - wImg / 2,
      feature[3]._y + randomY[num] + origineY - hImg / 2,
      wImg,
      hImg
    );
  }
}

// per il resize della canvas
function windowResized() {
  resizeCanvas(windowWidth - 20, windowHeight - 20);
  origineX = windowWidth / 2 - video.width / 2 - 10;
  origineY = windowHeight / 2 - video.height / 2;
  background(255);

  speakbutton.position(origineX + 7, origineY + video.height + 125);
  pausebutton.position(origineX + 77, origineY + video.height + 125);
  stopspeakbutton.position(origineX + 157, origineY + video.height + 125);
  cancellaspeakbutton.position(origineX + 225, origineY + video.height + 125);
}

// premi "s", screen
function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(canvas, "MyImg", "jpg");
}
