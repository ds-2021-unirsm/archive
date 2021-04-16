// CAMMINATORI CHE GENERANO MONDI
// perlinNoise PER IL MOVIMENTO DEI CAMMINATORI
// ogni 40 secondi la tavola si resetta
// sketch by emanuelepizzuti

var w, h;
var quanti = 2;
var d = 50;
var c = [];
var speedMax = 0.2;

var t = 0;

function setup() {
  createCanvas(w = windowWidth, h = windowHeight);
  background(0);
  // crea n oggetti di classe Camminatore
  for (var i = 0; i < quanti; i++) {
    c.push(new Camminatore(i));
  }
}

function draw() {
  // per tutti i camminatori chiama i diversi metodi utili 
  for (var i = 0; i < quanti; i++) {
    c[i].move();
    c[i].display();
  }
  if (frameCount%2400==0){
    background(0);
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
    this.x = noise(this.noiseX) * w
    this.y = noise(this.noiseY) * h
    this.noiseX += 0.02 * this.speedX;
    this.noiseY += 0.02 * this.speedY;
  }

  // metodo display
  this.display = function() {
    noFill();
    t += 0.01;
    strokeWeight(0.1);
    stroke(map(this.y, 0, h / 2, 0, 255), map(this.x, 0, w / 2, 50, 255), map(this.y, 0, h / 2, 200, 255));
    ellipseMode(CENTER);
    ellipse(this.x, this.y, frameCount % 120);
  }
}