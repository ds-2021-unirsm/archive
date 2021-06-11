// -
// Camminatore suono 0.1 by GaiaAndruccioli [Camminatore, suono]
// 2021 © GaiaAndruccioli, Daniele @Fupete, Irene @iretrtr and the course DS-2021 at DESIGN.unirsm,
// github.com/ds-2021-unirsm — github.com/fupete - github.com/Graphein0707
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: P5 Reference sound
// https://p5js.org/reference/#/libraries/p5.sound
//

let x, y;
let t;
let T;
let walkers = [];
let suono = false;

//load audio 
function preload() {
  song = loadSound('song.mp3');
}


function setup() {
  song.loop();
  colorMode(HSB, 200, 10, 40, 250);
  createCanvas(windowWidth, windowHeight);
  background(0);

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
    this.y = noise(this.T) * height;
    this.t += 0.001;
  }

  this.display = function() {
    //map dell'audio in proporzione alle dimensioni dei cerchi
    this.size = map(this.level, 0, 1, 0.1, 50);
    //colore
    this.col = map(this.x, 0, width, 0, 360);
    fill(this.col, 100, 80, 30);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }

}
