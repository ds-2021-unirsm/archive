// -
//
// XXX by Lucilla Cesaroni [translations, images, words]
// 2021 Lucilla @LucillaCesaroni, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm - github.com/fupete - github.com/LucillaCesaroni 
// Educational purposes, MIT License, 2021, San Marino
//
// -
//
// Credits/Thanks to:
// p5.speech.js Speech Recognition, Speech synthesis, R.Luke DuBois
// The ABILITY lab, New York University for
// http://ability.nyu.edu/p5.js-speech/
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

let val = []; // per il sentiment

// Settings
let lang = "it";
let token = "436c5baef9e54af1a0de6a370e4ade38";
//  let token = "36f142c6e1824fabad5c1a76670c69c8";

// Immagini
let immagini = []; // array immagini da visualizzare
var imgsResolution = "640x480"; // risoluzione immagini

// Speech Object
let speechRec;
let recordingAvviato = false;

// Speech racconto
let racconto = "";

// per mettere testo sopra img
let variabile;
let contatoreEntita = 0;

// bottoni
let speakbutton;
let pausebutton;
let stopspeakbutton;
let cancellaspeakbutton;

// Utili per il draw
let tuttoProntoNoEntita = false;
let tuttoPronto = false;

// font
let myFont;

//let sentimentColor;
let sentiment;
let valoreMassimo;

function preload() {
  // Font per il testo
  myFont = loadFont("Inter-Regular.ttf");
}

// by default all options are set to true
const detection_options = {
  withLandmarks: true,
  withDescriptors: false,
};

function setup() {
  createCanvas(360 * 2, 270 * 2);

  textFont(myFont, 20);

  colorMode(HSB, 360, 100, 100);

  // Elementi utili per sentiment analysis volto
  paragraph = createP(); // Creates a <p></p> element
  paragraph.style("font-size", 100 + "px");

  // load up your video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); // Hide the video element, and just show the canvas
  faceapi = ml5.faceApi(video, detection_options, modelReady);
}

function modelReady() {
  console.log("ready!");
  console.log(faceapi);
  faceapi.detect(gotResults);

  // bottoni
  speakbutton = createButton("▶️");
  speakbutton.mousePressed(startRec);
  speakbutton.position(10, 600);

  pausebutton = createButton("⏸️");
  pausebutton.mousePressed(pauseRec);
  pausebutton.position(50, 600);

  stopspeakbutton = createButton("⏹️");
  stopspeakbutton.mousePressed(stopRec);
  stopspeakbutton.position(90, 600);

  cancellaspeakbutton = createButton("🆕");
  cancellaspeakbutton.mousePressed(newRec);
  cancellaspeakbutton.position(130, 600);
}

function startRec() {
  recordingAvviato = true;
  console.log("Hai cliccato raccontami");
  console.log("Sono qua, inizia a raccontare...");

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

function pauseRec() {
  console.log("Hai cliccato pausa");

  recordingAvviato = false;
}

function stopRec() {
  console.log("Hai cliccato stop rec");

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

function newRec(){
    console.log("Hai cliccato cancella tutto");

    recordingAvviato = false;
    racconto = "";
    immagini = [];
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

    noStroke();
    fill(0);
    text(racconto, 40, 500, 620);
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

function draw() {}

function gotResults(err, result) {
  if (err) {
    console.log(err);
    return;
  }

  detections = result;
  //console.log("detections: "+JSON.stringify(detections))

  background(255);

  image(video, 0, 0, width, height);

  filter(GRAY);

  if (detections) {
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
      textSize(20);
      text(`${item}`, 40, idx * 20 + 20);

      // funzione che prende il valore
      val[idx] = expressions[item];
      let valore = map(expressions[item], 0, 1, 0, width / 2);
      fill(0);
      noStroke();
      rect(160, idx * 20 + 14, valore, 6);
      stroke(0);
      strokeWeight(1);
      noFill();
      rect(160, idx * 20 + 14, width / 2, 6);
    });

    valoreMassimo = max(val);

    // per il colore prende il numero piu alto nell'array
    if (valoreMassimo == val[0]) sentiment = 180;
    else if (valoreMassimo == val[1]) sentiment = 60;
    else if (valoreMassimo == val[2]) sentiment = 240;
    else if (valoreMassimo == val[3]) sentiment = 0;
    else if (valoreMassimo == val[4]) sentiment = 130;
    else if (valoreMassimo == val[5]) sentiment = 270;
    else if (valoreMassimo == val[6]) sentiment = 300;

    val[0] = floor(map(val[0], 0, 1, 40, 38));
    val[1] = floor(map(val[1], 0, 1, 200, 402));
    val[2] = floor(map(val[2], 0, 1, 800, 650));
    val[3] = floor(map(val[3], 0, 1, 30, 4));
    val[4] = floor(map(val[4], 0, 1, 18, 48));
    val[5] = floor(map(val[5], 0, 1, 55, 500));
    val[6] = floor(map(val[6], 0, 1, 88, 150));

    //var padding = width / (paragraph.length + 1);

    //weightControl = sin(frameCount / 10.0) * 100 + 150;
    // elt.style = Underlying
    //paragraph.elt.style[
    //  "font-variation-settings"
    //] = ` "wght" ${val[0]}, "wdth" ${val[1]},"GRAD" ${val[6]},"XOPQ" ${val[5]},"YTUC" ${val[2]} `;
    //paragraph.elt.style.color = "#ffffff";
    //paragraph.elt.style.position = "CENTER";
    //console.log(val);

    if (detections.length > 0) {
      // console.log(detections)
      drawBox(detections);
      drawLandmarks(detections);
    }
  }
  faceapi.detect(gotResults);
}

function drawBox(detections) {
  for (let i = 0; i < detections.length; i++) {
    const alignedRect = detections[i].alignedRect;
    const x = alignedRect._box._x;
    const y = alignedRect._box._y;
    const boxWidth = alignedRect._box._width;
    const boxHeight = alignedRect._box._height;

    noFill();
    stroke(161, 95, 251);
    strokeWeight(2);
    rect(x, y, boxWidth, boxHeight);
  }
}

function drawLandmarks(detections) {
  noFill();
  stroke(161, 95, 251);
  strokeWeight(2);

  let x = -75;
  let y = 0;

  for (let i = 0; i < detections.length; i++) {
    const mouth = detections[i].parts.mouth;
    const nose = detections[i].parts.nose;
    const leftEye = detections[i].parts.leftEye;
    const rightEye = detections[i].parts.rightEye;
    const rightEyeBrow = detections[i].parts.rightEyeBrow;
    const leftEyeBrow = detections[i].parts.leftEyeBrow;

    drawPart(mouth, true);
    drawPart(nose, false);
    drawPart(leftEye, true);
    drawPart(leftEyeBrow, false);
    drawPart(rightEye, true);
    drawPart(rightEyeBrow, false);

    if (tuttoProntoNoEntita == true) {
      //console.log("eccomi");
      noStroke();
      fill(sentiment, 100, 100);
      text(racconto, 40, 500, 620);
    } else if (tuttoPronto == true) {
      noStroke();
      fill(sentiment, 100, 100);
      text(racconto, 40, 500, 620);

      for (let i = 0; i < immagini.length; i++) {
        image(immagini[i], mouth[3]._x + x, mouth[3]._y + y, 150, 100);
        y += 100;
      }
    }
  }

  function drawPart(feature, closed) {
    ellipse(feature[3]._x, feature[3]._y, 10, 10);
  }
}
/*
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}*/
