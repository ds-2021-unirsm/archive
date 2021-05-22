//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// Walker-perlin-noise1 by Andrea [noise, abstract]
// 2021 © Andrea @AndrCastellucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/andrea-castellucci
// Educational purposes, MIT License, 2021, San Marino
// —

var w, h;
var quanti = 40;
var c = [];
var speedMax = 0.5;

function setup() {
  createCanvas(w = windowWidth, h = windowHeight);
  background(230);
  noFill();
  rectMode(CENTER);

  // crea n oggetti di classe Camminatore
  for (var i = 0; i < quanti; i++) {
    c.push(new Camminatore(i));
  }
}

function draw() {
  background(230, 80);
  // chiamata dei metodi per ogni camminatore
  for (var i = 0; i < quanti; i++) {
    c[i].move();
    c[i].display();
  }
}

// CLASSE CAMMINATORE
function Camminatore(_id) {

  // COSTRUTTORE
  this.id = _id;
  this.x = random(w);
  this.y = random(h);
  this.speed = random(0, speedMax);
  this.randomX = random(100);
  this.randomY = random(100);
  this.randomZ = random(100);
  this.randomW = random(100);

  // METODO MOVE
  this.move = function() {
    this.x = map(noise(this.randomX), 0, 1, 0, width);
    this.y = map(noise(this.randomY), 0, 1, 0, height);

    this.randomX += 0.01 * this.speed;
    this.randomY += 0.015 * this.speed;
  }

  // METODO DISPLAY
  this.display = function() {
    stroke(50);
    strokeWeight(2);

    if (this.x > w / 3 && this.x < (w - w / 3)) {
      ellipse(this.x, this.y, this.randomZ, this.randomW);
    } else {
      rect(this.x, this.y, this.randomZ, this.randomW);
    }
  }
}
