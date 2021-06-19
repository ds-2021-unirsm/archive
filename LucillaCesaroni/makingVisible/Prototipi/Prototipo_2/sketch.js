//         ___       ________
//        |\  \     |\   ____\
//        \ \  \    \ \  \___|
//         \ \  \    \ \  \
//          \ \  \____\ \  \____
//           \ \_______\ \_______\
//            \|_______|\|_______|

// -
//
// Metamorfosi 0.2 by Lucilla Cesaroni [comunicare, parole, icone, emozioni, inclusione]
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
// Entity Extraction, Dandelion API for
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
// [GUI] change colors
//
// —

let faceapi;
let video;
let detections;

// Per posizionare video al centro
let origineX;
let origineY;

let scala; // Scala per video

// Altezza e larghezza canvas
let w, h;

let canvas;

let val = []; // Array per il sentiment

// Settings
let lang = "it";
let token = "436c5baef9e54af1a0de6a370e4ade38";
//  let token = "36f142c6e1824fabad5c1a76670c69c8";

// Immagini
let immagini = []; // Array immagini da visualizzare
var imgsResolution = "640x480"; // Risoluzione immagini da Unsplash
let wImg = 90; // Larghezza immagine Unsplash
let hImg = 60; // Altezza immagine Unsplash

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

// Fonts
let myFont, myFont2;

// Per la sentiment analysis
let sentiment;
let saturation;
let brightness;
let valoreMassimo;

// Per interfaccia GUI, per cambiare colore emozioni
let parametri = {
  // Slider: valore all'avvio dello sketch
  felice: 41,
  triste: 229,
  arrabbiato: 8,
  impaurito: 276,
  disgustato: 36,
  sorpreso: 168,
};

window.onload = function () {
  // Al caricamento della pagina
  var gui = new dat.GUI();

  var f0 = gui.addFolder("Scegli colori emozioni");
  f0.add(parametri, "felice", 0, 360);
  f0.add(parametri, "triste", 0, 360);
  f0.add(parametri, "arrabbiato", 0, 360);
  f0.add(parametri, "impaurito", 0, 360);
  f0.add(parametri, "disgustato", 0, 360);
  f0.add(parametri, "sorpreso", 0, 360);
};

function preload() {
  // Fonts per il testo
  myFont = loadFont("GTAmerica-Thin.otf");
  myFont2 = loadFont("GTAmerica-Regular.otf");
}

// By default all options are set to true
const detection_options = {
  withLandmarks: true,
  withDescriptors: false,
};

function setup() {
  canvas = createCanvas((w = windowWidth), (h = windowHeight - 20)); // Guarda https://github.com/processing/p5.js-web-editor/issues/680 || per i bottoni

  background(255);

  colorMode(HSB, 360, 100, 100);

  // Load up your video
  video = createCapture(VIDEO);

  // Se la larghezza è maggiore dell'altezza allora
  if (w >= h) {
    // Desktop
    // console.log("caso1");
    let scala = 2;

    video.size((h * 1.3) / scala, h / scala);
  } else {
    // Smartphone
    // console.log("caso2");
    let scala = 1.4;

    video.size(w / scala, w / 1.3 / scala);
  }

  // Video al centro della canvas
  origineX = w / 2 - video.width / 2;
  origineY = h / 2 - video.height / 2;

  video.hide(); // Hide the video element, and just show the canvas

  faceapi = ml5.faceApi(video, detection_options, modelReady);

  // Funzione per disegnare i bottoni
  disegnapulsanti();
}

function modelReady() {
  console.log("ready!");
  console.log(faceapi);
  faceapi.detect(gotResults);
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
    // console.log(speechRec);

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
  console.log("Hai cliccato stop");

  contatoreEntita = 0;

  recordingAvviato = false;

  // Se hai stoppato la registrazione parte l'analisi del sentiment
  if (recordingAvviato == false) {
    // Parte l'analisi per le entità del racconto
    let url =
      "https://api.dandelion.eu/datatxt/nex/v1/?lang=" +
      lang +
      "&min_confidence=0.1&text=" +
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

// Immagini da Unsplash
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

  var i = risposta.annotations[contatoreEntita];

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

  // Crea un numero random per positions tra -randomDist e randomDist
  randomX.push(random() * 2 * randomDist - randomDist);
  randomY.push(random() * 2 * randomDist - randomDist - 10); // origineY - 10 perchè l'ho spostato al centro

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

  // Video
  // console.log("larghezza video: " + video.width);
  image(video, origineX, origineY, video.width, video.height);
  filter(GRAY);

  // Titolo
  fill(245, 62, 81);
  noStroke();
  textAlign(LEFT, TOP);
  let titolo = "Metamorfosi";
  textFont(myFont2, 36);
  text(titolo, origineX, (origineY * 0.5) / 5);

  // Istruzioni
  textAlign(LEFT, TOP);
  textFont(myFont, 16);
  text(
    "Premi il pulsante start e inizia a raccontare qualcosa. Premi il pulsante stop quando vuoi analizzare quello che hai detto. Premi il pulsante pausa quando devi pensare. Premi il pulsante new quando vuoi analizzare una nuova frase.",
    origineX,
    (origineY * 2.2) / 5,
    video.width
  );

  // Rettangolo sotto per sottotitolazione
  fill(255);
  strokeWeight(1);
  stroke(245, 62, 81);
  rect(
    origineX,
    origineY + video.height + video.height / 60,
    video.width,
    video.height / 4,
    2
  );

  if (detections) {
    if (detections.length > 0) {
      const { expressions } = detections[0];

      // console.log(expressions);

      // console.log("val" + val);

      let keys = Object.keys(expressions); // Restituisce un array di nomi di proprietà
      // enumerabili di un dato oggetto, ripetuti
      // nello stesso ordine che farebbe un normale ciclo
      // console.log(keys);
      keys.forEach((item, idx) => {
        // Nomi emozioni
        fill(245, 62, 81);
        noStroke();
        textFont(myFont2, 15);
        textAlign(LEFT, TOP);

        // console.log(item);

        let emozioneTesto = ""; // Variabile locale per tradurre le emozioni in italiano

        if (item == "neutral") {
          emozioneTesto = "neutrale";
        } else if (item == "happy") {
          emozioneTesto = "felice";
        } else if (item == "sad") {
          emozioneTesto = "triste";
        } else if (item == "angry") {
          emozioneTesto = "arrabbiato";
        } else if (item == "fearful") {
          emozioneTesto = "impaurito";
        } else if (item == "disgusted") {
          emozioneTesto = "disgustato";
        } else if (item == "surprised") {
          emozioneTesto = "sorpreso";
        }

        text(emozioneTesto, origineX + 10, idx * 18 + origineY + 9.5);

        // Funzione che prende il valore
        val[idx] = expressions[item];

        // Mappo valore
        let valore = map(expressions[item], 0, 1, 0, video.width / 3);

        // Rettangoli emozioni
        fill(245, 62, 81);
        noStroke();
        rect(origineX + 100, idx * 18 + origineY + 16, valore, 6, 2); // x y w h

        stroke(245, 62, 81);
        strokeWeight(1);
        noFill();
        rect(origineX + 100, idx * 18 + origineY + 16, video.width / 3, 6, 2);
      });

      valoreMassimo = max(val);

      // Per il colore prende il numero piu alto nell'array
      if (valoreMassimo == val[0]) {
        sentiment = 0; // NERO
        saturation = 0;
        brightness = 0;
      } else if (valoreMassimo == val[1]) {
        sentiment = parametri.felice; // VERDE
        saturation = 100;
        brightness = 100;
      } else if (valoreMassimo == val[2]) {
        sentiment = parametri.triste; // AZZURRO
        saturation = 100;
        brightness = 100;
      } else if (valoreMassimo == val[3]) {
        sentiment = parametri.arrabbiato; // ROSSO
        saturation = 100;
        brightness = 100;
      } else if (valoreMassimo == val[4]) {
        sentiment = parametri.impaurito; // BLU
        saturation = 100;
        brightness = 100;
      } else if (valoreMassimo == val[5]) {
        sentiment = parametri.disgustato; // VERDE BRUTTO
        saturation = 0;
        brightness = 36;
      } else if (valoreMassimo == val[6]) {
        sentiment = parametri.sorpreso; // VIOLA
        saturation = 84;
        brightness = 90;
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
  // Bottoni
  speakbutton = createButton("start");
  speakbutton.style("background-color", "#ffffff");
  speakbutton.style("width", "100px");
  speakbutton.style("color", "#5a4fcf");
  speakbutton.style("border", "1px solid #5a4fcf");
  speakbutton.style("font-family", "GTAmerica-Thin");
  speakbutton.style("font-size", "16px");
  speakbutton.style("padding-top", "6px");
  speakbutton.style("padding-bottom", "6px");
  speakbutton.style("border-radius", "50px 50px");
  speakbutton.mouseOver(inside0).mouseOut(outside0);
  speakbutton.mousePressed(startRec);
  speakbutton.position(
    origineX,
    h -
      ((origineY + video.height + video.height / 60 + video.height / 4) *
        0.45) /
        5
  );

  pausebutton = createButton("pause");
  pausebutton.style("background-color", "#ffffff");
  pausebutton.style("width", "100px");
  pausebutton.style("color", "#5a4fcf");
  pausebutton.style("border", "1px solid #5a4fcf");
  pausebutton.style("font-family", "GTAmerica-Thin");
  pausebutton.style("font-size", "16px");
  pausebutton.style("padding-top", "6px");
  pausebutton.style("padding-bottom", "6px");
  pausebutton.style("border-radius", "50px 50px");
  pausebutton.mouseOver(inside1).mouseOut(outside1);
  pausebutton.mousePressed(pauseRec);
  pausebutton.position(
    w / 2 -
      video.width / 4 +
      (video.width / 4 - pausebutton.width) / 2 -
      (video.width / 4 - pausebutton.width) / 9.2,
    h -
      ((origineY + video.height + video.height / 60 + video.height / 4) *
        0.45) /
        5
  );

  stopspeakbutton = createButton("stop");
  stopspeakbutton.style("background-color", "#ffffff");
  stopspeakbutton.style("width", "100px");
  stopspeakbutton.style("color", "#5a4fcf");
  stopspeakbutton.style("border", "1px solid #5a4fcf");
  stopspeakbutton.style("font-family", "GTAmerica-Thin");
  stopspeakbutton.style("font-size", "16px");
  stopspeakbutton.style("padding-top", "6px");
  stopspeakbutton.style("padding-bottom", "6px");
  stopspeakbutton.style("border-radius", "50px 50px");
  stopspeakbutton.mouseOver(inside2).mouseOut(outside2);
  stopspeakbutton.mousePressed(stopRec);
  stopspeakbutton.position(
    w / 2 +
      (video.width / 4 - stopspeakbutton.width) / 2 +
      (video.width / 4 - pausebutton.width) / 9.2,
    h -
      ((origineY + video.height + video.height / 60 + video.height / 4) *
        0.45) /
        5
  );

  cancellaspeakbutton = createButton("new");
  cancellaspeakbutton.style("background-color", "#ffffff");
  cancellaspeakbutton.style("width", "100px");
  cancellaspeakbutton.style("color", "#5a4fcf");
  cancellaspeakbutton.style("border", "1px solid #5a4fcf");
  cancellaspeakbutton.style("font-family", "GTAmerica-Thin");
  cancellaspeakbutton.style("font-size", "16px");
  cancellaspeakbutton.style("padding-top", "6px");
  cancellaspeakbutton.style("padding-bottom", "6px");
  cancellaspeakbutton.style("border-radius", "50px 50px");
  cancellaspeakbutton.mouseOver(inside3).mouseOut(outside3);
  cancellaspeakbutton.mousePressed(newRec);
  cancellaspeakbutton.position(
    origineX + video.width - cancellaspeakbutton.width - 2,
    h -
      ((origineY + video.height + video.height / 60 + video.height / 4) *
        0.45) /
        5
  );

  function inside0() {
    speakbutton.style("transition-duration", "0.4s");
    speakbutton.style("background-color", "#5a4fcf");
    speakbutton.style("color", "#ffffff");
  }
  function outside0() {
    speakbutton.style("transition-duration", "0.4s");
    speakbutton.style("background-color", "#ffffff");
    speakbutton.style("color", "#5a4fcf");
  }

  function inside1() {
    pausebutton.style("transition-duration", "0.4s");
    pausebutton.style("background-color", "#5a4fcf");
    pausebutton.style("color", "#ffffff");
  }
  function outside1() {
    pausebutton.style("transition-duration", "0.4s");
    pausebutton.style("background-color", "#ffffff");
    pausebutton.style("color", "#5a4fcf");
  }

  function inside2() {
    stopspeakbutton.style("transition-duration", "0.4s");
    stopspeakbutton.style("background-color", "#5a4fcf");
    stopspeakbutton.style("color", "#ffffff");
  }
  function outside2() {
    stopspeakbutton.style("transition-duration", "0.4s");
    stopspeakbutton.style("background-color", "#ffffff");
    stopspeakbutton.style("color", "#5a4fcf");
  }

  function inside3() {
    cancellaspeakbutton.style("transition-duration", "0.4s");
    cancellaspeakbutton.style("background-color", "#5a4fcf");
    cancellaspeakbutton.style("color", "#ffffff");
  }
  function outside3() {
    cancellaspeakbutton.style("transition-duration", "0.4s");
    cancellaspeakbutton.style("background-color", "#ffffff");
    cancellaspeakbutton.style("color", "#5a4fcf");
  }
}

function drawLandmarks(detections) {
  // console.log("detections: "+ JSON.stringify(detections))

  for (let i = 0; i < detections.length; i++) {
    // Me lo continuerà a mandare all'infinito
    // Simile ad un draw

    let positions = []; // Creo un'array per le posizioni dei 6 punti

    positions[0] = detections[i].parts.leftEyeBrow;
    positions[1] = detections[i].parts.rightEyeBrow;
    positions[2] = detections[i].parts.mouth;
    // positions[3] = detections[i].parts.nose;
    // positions[4] = detections[i].parts.leftEye;
    // positions[5] = detections[i].parts.rightEye;

    if (tuttoProntoNoEntita == true) {
      // console.log("eccomi");
      noStroke();
      fill(sentiment, saturation, brightness);
      textAlign(CENTER, CENTER);
      textFont(myFont2, 16);
      text(
        racconto,
        w / 2 - (video.width - 100) / 2,
        origineY + video.height, // Centro verticalmente rispetto rettangolo
        video.width - 100,
        video.height / 4
      );
    } else if (tuttoPronto == true) {
      // console.log ("sto disegnando le img");
      noStroke();
      fill(sentiment, saturation, brightness);
      textAlign(CENTER, CENTER);
      textFont(myFont2, 16);
      text(
        racconto,
        w / 2 - (video.width - 100) / 2,
        origineY + video.height,
        video.width - 100,
        video.height / 4
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

// Per il resize della canvas
function windowResized() {
  canvas = resizeCanvas((w = windowWidth), (h = windowHeight - 20));

  video = createCapture(VIDEO);

  // Se la larghezza è maggiore dell'altezza allora
  if (w >= h) {
    // Desktop
    // console.log("caso1");
    let scala = 2;

    video.size((h * 1.3) / scala, h / scala);
  } else {
    // Smartphone
    // console.log("caso2");
    let scala = 1.4;

    video.size(w / scala, w / 1.3 / scala);
  }

  origineX = w / 2 - video.width / 2;
  origineY = h / 2 - video.height / 2;

  // console.log("windowWidth");
  // console.log(w);

  // console.log("origineX");
  // console.log(origineX);

  // console.log("video.width");
  // console.log(video.width);

  background(255);

  // Bottoni
  speakbutton.position(
    origineX,
    h -
      ((origineY + video.height + video.height / 60 + video.height / 4) *
        0.45) /
        5
  );
  pausebutton.position(
    w / 2 -
      video.width / 4 +
      (video.width / 4 - pausebutton.width) / 2 -
      (video.width / 4 - pausebutton.width) / 9.2,
    h -
      ((origineY + video.height + video.height / 60 + video.height / 4) *
        0.45) /
        5
  );
  stopspeakbutton.position(
    w / 2 +
      (video.width / 4 - stopspeakbutton.width) / 2 +
      (video.width / 4 - pausebutton.width) / 9.2,
    h -
      ((origineY + video.height + video.height / 60 + video.height / 4) *
        0.45) /
        5
  );
  cancellaspeakbutton.position(
    origineX + video.width - cancellaspeakbutton.width - 2,
    h -
      ((origineY + video.height + video.height / 60 + video.height / 4) *
        0.45) /
        5
  );

  video.hide(); // Hide the video element, and just show the canvas
}

// Premi "s", screen
function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(canvas, "Myimg", "jpg");
}
