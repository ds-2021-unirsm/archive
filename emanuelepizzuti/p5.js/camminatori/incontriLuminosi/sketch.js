//  ____ ____
// | ___|  _ |
// | ___|  __|
// |____|_|
// ___________
//
// incontriLuminosi by emanuelepizzuti [walkers, perlin noise, OOP]
// 2021 © emanuelepizzuti, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// ___________

var w, h;
var quanti = 160;
// var d = 50;
var c = [];
var speedMax = 0.02;
var t = 0;

function setup() {
  createCanvas(w = windowWidth, h = windowHeight);
  drawingContext.shadowBlur = 20;
  // crea n oggetti di classe Camminatore
  for (var i = 0; i < quanti; i++) {
    c.push(new Camminatore(i));
  }
}

function draw() {
  blendMode(BLEND);
  background(10, 30, 55);
  blendMode(ADD);
  // per tutti i camminatori chiama i diversi metodi utili 
  for (var i = 0; i < quanti; i++) {
    c[i].move();
    c[i].display();

    for (var j = 0; j < c.length; j++) {
      if (i != j && c[i].interseca(c[j])) {
        c[i].nuovocolore();
        c[j].nuovocolore();
      }
    }
  }
}

// classe
function Camminatore(_id) {
  // costruttore
  this.id = _id;
  this.x = 0;
  this.y = 0;
  this.r = random(10);
  this.speedX = random(0, speedMax);
  this.speedY = random(0, speedMax);
  this.noiseX = random(50);
  this.noiseY = random(50);
  this.fill = color(100 * noise(t), 150 * noise(t + 25), 255 * noise(t + 50));
  this.glow = color(0);

  this.nuovocolore = function() {
    this.fill = color(100 * noise(t), 150 * noise(t + 25), 255 * noise(t + 50))
    this.glow = color(255);
    t += 0.01;
  }

  this.interseca = function(altra) {
    var d = dist(this.x, this.y, altra.x, altra.y);
    if (d < this.r + altra.r) {
      return true;
    } else {
      //return false;
      this.glow = color(0);
    }
  }

  // metodo move
  this.move = function() {
    this.x = noise(this.noiseX) * w
    this.y = noise(this.noiseY) * h
    this.noiseX += 0.1 * this.speedX;
    this.noiseY += 0.1 * this.speedY;
  }

  // metodo display
  this.display = function() {
    strokeWeight(2);
    fill(this.fill);
    drawingContext.shadowColor = this.glow;
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.r * 2);
  }
}
