//         ___       ___  ___     
//        |\  \     |\  \|\  \    
//        \ \  \    \ \  \\\  \   
//         \ \  \    \ \  \\\  \  
//          \ \  \____\ \  \\\  \ 
//           \ \_______\ \_______\
//            \|_______|\|_______|
                                  
// -
//
// Synth 10PRINT by Lucilla Cesaroni [sound, mouseX, mouseY, click]
// 2021 Lucilla @LucillaCesaroni, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm - github.com/fupete - github.com/LucillaCesaroni 
// Educational purposes, MIT License, 2021, San Marino
//
// —
//
// Credits/Thanks to: 
// @Yiting Liu yitingliu.com for https://openprocessing.org/sketch/926914
//
// —
//
// Help:
// [c] save canvas
// [mouseX, mouseY] stroke, color
// [mouse] attiva/disattiva suono
//
// —

let w, h;
let x = 0;
let y = 0;
let inizio = false;

//per regolatori sotto
let spacing;
let speed;
let polySynth;

function setup() {
  c = createCanvas(w = windowWidth, h = windowHeight);

  rectMode(CENTER);
  ellipseMode(CENTER);

  //slider per la velocità
  speed = createSlider(1, 200, 30, 2);
  createDiv('speed').child(speed);

  //slider per la tonalità
  transposeS = createSlider(0, 3, 1, 0.2); //createSlider(min, max, [value], [step])
  createDiv('transpose').child(transposeS);

  //slider per la dimensione
  spacing = createSlider(10, 300, 20, 5);
  createDiv('spacing').child(spacing);

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
  let transpose = transposeS.value();

  note = pow(2, (octave + transpose - 49) / 12) * 440;

  if (inizio == true) { // se ho cliccato
    //genera tre suoni con valori diversi
    //polySynth.play(note, vol, time, dur);
    polySynth.play(note / 3, vel, time += 1 / 3, dur / 2);
    polySynth.play(note / 6, vel, time, dur / 8);
    polySynth.play(note / 9, vel, time -= 1 / 3, dur / 4);
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

  frameRate(speed.value());

  // Fonde i pixel nella finestra di visualizzazione in base alla modalità definita. screen opposite multiply, uses inverse values of the colors
  blendMode(ADD);
  let r = map(mouseX, 0, w, 0, 255);
  let g = map(mouseY, 0, h, 0, 255);
  let b = random(0, 255);

  // assegno a d la grandezza dello spacing.value()
  let dim = spacing.value();

  if (random(1) > 0.5) {
    strokeWeight(map(mouseY, 0, h, 0.5, 2));
    stroke(r, g, b);
    noFill();
    ellipse(x, y, spacing.value());
    ellipse(x, y, random(dim));
    playSynth(440 * x / spacing.value());
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
    playSynth(440 * y / spacing.value());
    if (x % 8 == 0) {
      stroke(r, g, b);
      strokeWeight(map(mouseX, 0, w, 0.5, 2));
      line(x, y, x + dim, y + dim);
    }
  }

  x += spacing.value();

  // Se fuoriesce dalla larghezza, nuova linea
  if (x > w) {
    x = 0;
    y += spacing.value();
  }

  // Se esce dall'altezza, ricomincia
  if (y > h) {
    y = 0;
    x = 0;
    clear();
    background(mouseX, mouseY, 200);
  }
}

//premi tasto, screen del poster
function keyPressed() {
  saveCanvas(c, 'Poster', 'jpg');
}
