//  ____ ____
// | ___|  _ |
// | ___|  __|
// |____|_|
// ___________
//
// Bubbles by emanuelepizzuti [walkers, perlin noise, OOP]
// 2021 © emanuelepizzuti, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// ___________

// random walker OOP
var w, h;
var quanti = 100; // vertici
var d = 2;
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
  background(0, 10);
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
    this.noiseX += 0.001 * this.speedX;
    this.noiseY += 0.005 * this.speedY;
  }

  // metodo display
  this.display = function() {
    noFill();
    strokeWeight(2);
    stroke(map(this.y, 0, h, 0, 255), map(this.y, 0, h, 50, 255), map(this.y, 0, h, 100, 255));
    ellipseMode(CENTER);
    ellipse(this.x, this.y, map(this.y, 0, h, 0.5, 50));

  }
}
