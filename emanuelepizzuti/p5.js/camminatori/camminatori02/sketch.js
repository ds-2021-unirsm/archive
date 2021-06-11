//  ____ ____
// | ___|  _ |
// | ___|  __|
// |____|_|
// ___________
//
// walkingLines by emanuelepizzuti [walkers, perlin noise, OOP]
// 2021 © emanuelepizzuti, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// ___________

var w, h;
var quanti = 100; // vertici
var c = [];
var speedMax = 0.2;

function setup() {
  createCanvas(w = windowWidth, h = windowHeight);
  textSize(18);
  strokeWeight(2);
  strokeCap(ROUND); // estremità tonde
  // crea n oggetti di classe Camminatore
  for (var i = 0; i < quanti; i++) {
    c.push(new Camminatore(i));
    background(0);
  }
}

function draw() {
  // per tutti i camminatori chiama i diversi metodi utili 
  for (var i = 0; i < quanti; i++) {
    c[i].move();
    c[i].display();
  }

  if (frameCount % 500 == 0) {
    background(20);
  }
}

// classe
function Camminatore(_id) {

  // costruttore
  this.id = _id;
  this.x = random(w);
  this.y = random(h);
  this.speedX = random(1, speedMax);
  this.speedY = random(1, speedMax);
  this.noiseX = random(10);
  this.noiseY = random(10);
  this.qualeAltro = 0; // la linea dopo

  // metodo move
  this.move = function() {
    // if (random(1) >= 0.5) this.dirX *= -1;
    // if (random(1) >= 0.5) this.dirY *= -1;
    this.x = noise(this.noiseX) * w
    this.y = noise(this.noiseY) * h
    this.noiseX += 0.001 * this.speedX;
    this.noiseY += 0.001 * this.speedY;
  }

  // metodo display
  this.display = function() {
    strokeWeight(0.2);
    //stroke(0);
    noFill();
    if (this.id == quanti - 1) { // controllo se l'oggetto in questione è l'ultimo elemento generato 
      this.qualeAltro = 0;
    } else this.qualeAltro = this.id + 1; //quale altro è l'oggetto successivo all'oggetto in questione
    (this.x, this.y, c[this.qualeAltro].x, c[this.qualeAltro].y);
    stroke(map(this.x, 0, w, 0, 255), map(this.y, 0, h, 0, 255), map(this.y, 0, h, 100, 255));
    rectMode(CORNERS);
    line(this.x, this.y, c[this.qualeAltro].x, c[this.qualeAltro].y);

  }
}
