//  ____ ____
// | ___|  _ |
// | ___|  __|
// |____|_|
// ___________
//
// Camminatori Indipendenti by emanuelepizzuti [walkers, perlin noise, OOP]
// 2021 © emanuelepizzuti, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// ___________

var w, h;
var quanti = 50;
var d = 6;
var c = [];
var speedMax = 0.2;

function setup() {
  createCanvas(w = windowWidth, h = windowHeight);
  // crea n oggetti di classe Camminatore
  for (var i = 0; i < quanti; i++) {
    c.push(new Camminatore(i));
  }
}

function draw() {
  background(0, 40);
  // per tutti i camminatori chiama i diversi metodi utili 
  for (var i = 0; i < quanti; i++) {
    c[i].move();
    c[i].display();
  }
}

// classe
function Camminatore(_id) {
  // costruttore
  this.id = _id;
  this.x = 0;
  this.y = 0;
  this.speedX = random(0, speedMax);
  this.speedY = random(0, speedMax);
  this.noiseX = random(50);
  this.noiseY = random(50);

  // metodo move
  this.move = function() {
    // if (random(1) >= 0.5) this.dirX *= -1;
    // if (random(1) >= 0.5) this.dirY *= -1;
    this.x = noise(this.noiseX) * w
    this.y = noise(this.noiseY) * h
    this.noiseX += 0.005 * this.speedX;
    this.noiseY += 0.005 * this.speedY;
  }
  
  // metodo display
  this.display = function() {
    fill(255 * noise(this.noiseX), 255 * noise(this.noiseX + 10), 255 * noise(this.noiseX + 30));
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, d);

  }
}
