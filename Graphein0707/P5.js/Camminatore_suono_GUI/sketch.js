// -
// simple UI interface example [GUI]
// 2019 © Luigi @MrJ4ckpot & Daniele @Fupete 
// github.com/dsii-2019-unirsm + github.com/fupete
// Educational purposes, MIT License, 2019, Crespina IT
// —
// Credits/Thanks to: 
// https://editor.p5js.org/fupete/sketches/WUY1jA4jn for original code
// —

let x, y;
let t;
let T;
let walkers = [];
let suono = false;
let weirdStroke = 0;
let weirdColor = [0, 0, 0];

// OGGETTO PARAMETRI
let parametri = {
  colore: 100,
  diametro: 30,
  getInfo: function() {
    alert("🎵 You are listening and design 'Neither do I' by Stwo 🎵");
  },

  stroke: function() {
    weirdStroke = random(0.001, 0.1);
    weirdColor = [random(255)];
  }
};

// FUNZIONE GUI
// Inserire i parametri e il loro range se presente.
// Si possono aggiungere sezioni nascoste dichiarandole con il metodo .addFolder();
window.onload = function() {
  var gui = new dat.GUI();

  gui.add(parametri, 'colore', 0, 500);
  gui.add(parametri, 'diametro', 0.001, 50);
  gui.add(parametri, 'stroke');
  gui.add(parametri, 'getInfo');

}

//load audio 
function preload() {
  song = loadSound('song.mp3');
}


function setup() {
  song.loop();
  colorMode(HSB, 200, 10, 40, 2000);
  createCanvas(windowWidth, windowHeight);
  background(0);
  //blendMode(ADD);

  //caricamento audio
  audio = new p5.AudioIn();
  audio.start();
  amplitude = new p5.Amplitude();
  amplitude.setInput(song);
}


function draw() {
  let level = amplitude.getLevel();
  if (level > 0.01 && !suono) {
    var pallino = new Walkers();
    walkers.push(pallino);
  }
  if (level < 0.05) {
    suono = false;
  }

  for (var i = 0; i < walkers.length; i++) {
    walkers[i].move();
    walkers[i].display();
  }
}

function Walkers(_id) {

  this.id = _id;
  this.x = 0;
  this.y = 0;

  this.T = random(0, 100);
  this.t = random(0, 100);
  this.level = amplitude.getLevel();

  this.move = function() {
    this.x = noise(this.t) * width;
    //parametri.colore + 100;
    this.y = noise(this.T) * height;
    this.t += 0.001;
  }

  this.display = function() {
    //map dell'audio in proporzione alle dimensioni dei cerchi
    //this.size = map(this.level, 0, 1, 0.1, 5);
    this.sizes = (parametri.diametro);
    //colore
    this.col = map(parametri.colore, 0, width, 0, 360);
    fill(this.col, 100, 80, 30);
    strokeWeight(weirdStroke);
    stroke(weirdColor);
    ellipse(this.x, this.y, this.sizes);
  }

}