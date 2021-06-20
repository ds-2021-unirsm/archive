// -
// Earthquake 0.1 by Alessia Valgimigli [walkers, random]
// 2021 © Alessia Valgimigli, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
//
// Help:
// [mouse] pressed : earthquake
//
// —


let walkers = [];
let num = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  
  for (let a = 0; a < num; a++) {
    walkers.push(new Walker(a));
  }
}

function draw() {
  background(255);

  for (let b = 0; b < walkers.length; b++) {
    walkers[b].display();
    walkers[b].move();
  }
}

function Walker(_id) {
  this.id = _id;
  this.x = 0;
  this.y = 0;
  //t è un numero casuale perchè se no i camminatori partirebbero tutti dallo stesso punto
  this.t = random(100);
  //creo un incremento per variare la direzione dei camminatori e renderli indipendenti
  this.tInc = random(1, 5) * 0.001;

  //genero in maniera casuale il colore dello stroke
  this.r = random(255);
  this.g = random(255);
  this.b = random(255);
  this.trasp = random(80, 100);

  this.move = function () {
    this.x = noise(this.t) * width;
    this.y = noise(this.t + 5) * height;
    this.t += this.tInc;

    if (mouseIsPressed) {
      this.x += random() * 20;
      this.y += random() * 20;
    }
  }

  this.display = function () {
    this.size = 100 * noise(this.t * 3);
    stroke(this.r, this.g, this.b, this.trasp);
    strokeWeight(15);
    noFill();
    ellipse(this.x, this.y, this.size);
  };
}
