// -
// Camminatore mondi 0.2 by GaiaAndruccioli [Camminatori, mondi, update]
// 2021 © GaiaAndruccioli, Daniele @Fupete, Irene @iretrtr and the course DS-2021 at DESIGN.unirsm,
// github.com/ds-2021-unirsm — github.com/fupete - github.com/Graphein0707
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: Tim Sherbert
// https://editor.p5js.org/TimSherbert/sketches/By8lyFaJ7
//

let c = [];
let num = 1000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  for (var i = 0; i < num; i++) {
    c.push(new Walker(i));
  }
}

function draw() {
  for (var i = 0; i < num; i++) {
    c[i].move();
    c[i].display();
    c[i].edges();
  }

}

function Walker() {

  this.pos = createVector(random(width), random(height)); //coordinate posizione
  this.vel = createVector(width, 0); //coordinate velocità
  this.dir = createVector(random(0, 200), random(200, 0)); //coordinate movimento x e y 

  this.size = random(0.01, 2); 
  this.colour = 0;

  //move
  this.move = function() {
    //noise al movimento x e y
    this.mov = createVector(noise(this.dir.x), noise(this.dir.y));

    //map del movimento con noise 
    //movimento differenziato delle linee
    this.movnoise = createVector(map(this.mov.x, 0, 1, -3, 3.5), map(this.mov.y, 0, 1, -3, 3.5));
    //accellerazione che dipende dal movimento con noise 
    this.acc = createVector(this.movnoise.x, this.movnoise.y);

    //incrementi
    this.vel.add(this.acc); //la velocità aumenta con l'accellerazione
    this.pos.add(this.vel); //permette il movimento 
    //variazione del movimento casuale in x e y, se non ci fosse sarebbero linee
    this.dir.add(random(0, 0.06), random(0, 0.06));
    this.vel.set(0, 0.5); //velocità che varia da 0 a 0.01
    this.colour += 1

  }

  //display
  this.display = function() {
    noStroke();
    var col = map(this.colour, 0, width, 200, 60); //map del colore 
    fill(col, 40, 120, 50);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }
}
