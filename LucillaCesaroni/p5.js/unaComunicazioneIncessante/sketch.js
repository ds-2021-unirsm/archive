//         ___       ________
//        |\  \     |\   ____\
//        \ \  \    \ \  \___|
//         \ \  \    \ \  \
//          \ \  \____\ \  \____
//           \ \_______\ \_______\
//            \|_______|\|_______|

// -
//
// Una comunicazione incessante (da Synth 10PRINT 0.2) by Lucilla Cesaroni [sound, mouseX, mouseY, click, speech]
// 2021 Lucilla @LucillaCesaroni, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm - github.com/fupete - github.com/LucillaCesaroni
// Educational purposes, MIT License, 2021, San Marino
//
// —
//
// Credits/Thanks to:
// @Yiting Liu yitingliu.com for https://openprocessing.org/sketch/926914
//
// Simple GUI interface
// Daniele @Fupete & Luigi @MrJ4ckpot
// https://editor.p5js.org/fupete/sketches/WUY1jA4jn for original code
//
// —
//
// Help:
// [keypressed] saveCanvas
// [mouseX, mouseY] stroke, color
// [mouse] attiva/disattiva suono
// [speech] avvia ferma 10PRINT
//
// —

let w, h;
let x = 0;
let y = 0;
let inizio = false;

//per regolatori sotto
let spacing;
let polySynth;

// Speech Object
let speechRec;
let speech = "";

let divCentrale;
let immagine;

// Per interfaccia GUI, per cambiare colore emozioni
let parametri = {
  // Slider: valore all'avvio dello sketch
  velocita: 50,
  tonosuoni: 2,
  grandezzacerchi: 20,
};

window.onload = function () {
  // Al caricamento della pagina
  var gui = new dat.GUI();

  var f0 = gui.addFolder("Scegli i parametri");
  f0.add(parametri, "velocita", 1, 200);
  f0.add(parametri, "tonosuoni", 0, 3);
  f0.add(parametri, "grandezzacerchi", 10, 100);
};

function setup() {
  c = createCanvas((w = windowWidth - 10), (h = windowHeight));

  rectMode(CENTER);
  ellipseMode(CENTER);

  divCentrale = createDiv(
    "Pronuncia <b>inizia</b> per avviare / <b>fermati</b> per bloccare"
  )
    .addClass("avviso")
    .style("width", "100%")
    .style("position", "absolute")
    .style("text-align", "center")
    .style("animation", "shake 0.82s cubic-bezier(.36,.07,.19,.97) both")

    .position(w / 2, h / 2);

  immagine = createImg("speak.png", "comunicazione")
    .addClass("img")
    .style("position", "absolute")
    .position(w / 2, h / 1.6);

  // Crea un'oggetto Speech Recognition con una callback
  speechRec = new p5.SpeechRec("it-IT", gotSpeech);

  // "Continuous recognition"
  let continuous = true;
  // Recognition parziale (più veloce, meno accurata)
  let interimResults = false;

  speechRec.start(continuous, interimResults);

  // Evento Speech recognized
  function gotSpeech() {
    console.log(speechRec);

    if (speechRec.resultValue) {
      speech = speechRec.resultString; // Salvo lo speech in una variabile
      console.log("Speech: " + speech);
    }
  }

  // array suoni
  polySynth = new p5.PolySynth();

  background(mouseX + random(200), mouseY + random(200), 200);
}

function playSynth(freq) {
  //userStartAudio();

  // durata della nota
  let dur = 1;
  // quando il suono inizia
  let time = 0;
  // volume suono da 0 a 1
  let vel = 0.1;

  let octVal = 3;
  let octave = (freq % 25) + 24 * octVal;
  let transpose = parametri.tonosuoni;

  note = pow(2, (octave + transpose - 49) / 12) * 440;

  if (inizio == true) {
    // se ho cliccato
    //genera tre suoni con valori diversi
    //polySynth.play(note, vol, time, dur);
    polySynth.play(note / 3, vel, (time += 1 / 3), dur / 2);
    polySynth.play(note / 6, vel, time, dur / 8);
    polySynth.play(note / 9, vel, (time -= 1 / 3), dur / 4);
  }
}

function mousePressed() {
  if (inizio == false) {
    inizio = true;
  } else {
    inizio = false;
  }
}

function draw() {
  frameRate(parametri.velocita);

  // Fonde i pixel nella finestra di visualizzazione in base alla modalità definita. screen opposite multiply, uses inverse values of the colors
  blendMode(ADD);

  let r = map(mouseX, 0, w, 0, 255);
  let g = map(mouseY, 0, h, 0, 255);
  let b = random(0, 255);

  // assegno a d la grandezza della parametri.grandezzacerchi
  let dim = parametri.grandezzacerchi;

  if (speech == "Inizia" || speech == "inizia") {
    divCentrale.remove();
    immagine.remove();

    if (random(1) > 0.5) {
      strokeWeight(map(mouseY, 0, h, 0.5, 2));
      stroke(r, g, b);
      noFill();
      ellipse(x, y, parametri.grandezzacerchi);
      ellipse(x, y, random(dim));
      playSynth((440 * x) / parametri.grandezzacerchi);
      if (x % 13 == 0) {
        stroke(r, g, b);
        strokeWeight(map(mouseY, 0, h, 0.5, 2));
        line(x, y + dim, x + dim, y);
      }
    } else {
      strokeWeight(map(mouseX, 0, w, 0.5, 2));
      noFill();
      stroke(r, g, b);
      rect(x, y, random(1, dim));
      playSynth((440 * y) / parametri.grandezzacerchi);
      if (x % 8 == 0) {
        stroke(r, g, b);
        strokeWeight(map(mouseX, 0, w, 0.5, 2));
        line(x, y, x + dim, y + dim);
      }
    }
  } else if (speech == "fermati" || speech == "Fermati") {
    return;
  } else {
    return;
  }

  x += parametri.grandezzacerchi;

  // Se fuoriesce dalla larghezza, nuova linea
  if (x > w) {
    x = 0;
    y += parametri.grandezzacerchi;
  }

  // Se esce dall'altezza, ricomincia
  if (y > h) {
    console.log("sono fuori");
    y = 0;
    x = 0;
    clear();
    background(mouseX, mouseY, 200);
  }
}

//premi tasto, screen del poster
function keyPressed() {
  saveCanvas(c, "Poster", "jpg");
}
