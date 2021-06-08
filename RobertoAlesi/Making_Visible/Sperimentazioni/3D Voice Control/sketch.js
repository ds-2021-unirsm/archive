//  ______  ____  ___  
//  __/ _ \/ __ \/ _ )
//  _/ , _/ /_/ / _  / 
//  /_/|_|\____/____/ 
//
// —
// Voice_Control 0.1 by Roberto [voice, control, cube, 3d, nointerface]
// 2021 © Roberto @ciunart, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm — github.com/fupete — github.com/RobertoAlesi
// Educational purposes, MIT License, 2021, San Marino
// —
//
// Credits/Thanks to:
// p5.speech.js Speech Recognition, Speech synthesis, R.Luke DuBois
// The ABILITY lab, New York University for
// https://github.com/IDMNYU/p5.js-speech/blob/master/LICENSE
// original license: MIT License 2017
//
// p5 speech example, piecesofuk for
// https://editor.p5js.org/piecesofuk/sketches/SyBpNOJTb
// —
//
// Comandi vocali:
// [sfera, cubo] -> cambia forma
// [su, giu, destra, sinistra] -> si muove verso l'alto/il basso/dx/sx
// [blu, rosso, viola, giallo] -> cambia colore
// [grande, base, piccolo] -> controlla la dimensione
// —

let speechRec;
let square;
let shape = "cubo";
let sposta = 10;
let l = 100;

function setup() {
  createCanvas((w = windowWidth), (h = windowHeight), WEBGL);

  //////comandi vocali///////
  var foo = new p5.Speech();
  speechRec = new p5.SpeechRec(gotSpeech);
  let continuous = true;
  let interimResults = true;
  speechRec.start(continuous, interimResults);
  function gotSpeech(speech) {
    if (speech.text.includes("sinistra")) square.muoviSinistra(speech.text);
    if (speech.text.includes("destra")) square.muoviDestra(speech.text);
    if (speech.text.includes("su")) square.muoviSu(speech.text);
    if (speech.text.includes("giù")) square.muoviGiu(speech.text);

    if (speech.text.includes("giallo")) square.coloreGiallo(speech.text);
    if (speech.text.includes("viola")) square.coloreViola(speech.text);
    if (speech.text.includes("rosso")) square.coloreRosso(speech.text);
    if (speech.text.includes("blu")) square.coloreBlu(speech.text);

    if (speech.text.includes("sfera")) square.draw(speech.text);
    if (speech.text.includes("cubo")) square.draw(speech.text);

    if (speech.text.includes("grande")) square.sizeGrande(speech.text);
    if (speech.text.includes("piccolo")) square.sizePiccolo(speech.text);
    if (speech.text.includes("base")) square.sizeBase(speech.text);
    print(speech.text);
  }
  square = new Square();
}

function draw() {
  background(0);

  rotateX(-PI / 3);
  pointLight(255, 255, 255, 0, -50, 0);
  square.draw();

  push();
  stroke(255);
  strokeWeight(30);
  ambientMaterial(250);
  translate(0, 0, -l / 2);
  plane(w, h);
  pop();
}

class Square {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.color = [0, 0, 255];
  }

  draw(forma) {
    ambientMaterial(this.color);
    //fill(this.color);
    noStroke();
    if (forma == "sfera") {
      shape = "sfera";
    } else if (forma == "cubo") {
      shape = "cubo";
    } //else rect(this.x, this.y, 50, 40);

    if (shape == "sfera") {
      push();
      translate(this.x, this.y);
      sphere(l / 2);
      pop();
    } else if (shape == "cubo") {
      push();
      translate(this.x, this.y);
      box(l);
      pop();
    }
  }

  muoviSinistra() {
    this.x -= sposta;
  }
  muoviDestra() {
    this.x += sposta;
  }
  muoviSu() {
    this.y -= sposta;
  }
  muoviGiu() {
    this.y += sposta;
  }
  coloreGiallo() {
    this.color = [255, 255, 0];
  }
  coloreViola() {
    this.color = [170, 0, 200];
  }
  coloreRosso() {
    this.color = [255, 0, 0];
  }
  coloreBlu() {
    this.color = [0, 0, 255];
  }
  sizeGrande() {
    l = 150;
  }
  sizePiccolo() {
    l = 50;
  }
  sizeBase() {
    l = 100;
  }
}
