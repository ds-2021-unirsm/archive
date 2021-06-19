// Camminatori con perlin noise 0.1 by Mariangela Catucci [camminatori, perlin noise]
// 2021 © Mariangela @MariangelaCatucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
//
// —

var w, h;
var d = 300;
var quanti = 10;
var c = [];
var speedMax = 4;

function setup() {
  createCanvas(w=windowWidth, h=windowHeight);
  textSize(18);
  t = 0;
  
  // crea n oggetti di classe Camminatore
  for (var i=0; i<quanti; i++){
  	c.push(new Camminatore(i)); 
  }
}

function draw() {
 background(250);
 // per tutti i camminatori chiama i diversi metodi utili 
 for (var i=0; i<quanti; i++){
	c[i].move();
	c[i].display();
 }
  t = t + 0.05;
}

// classe
function Camminatore(_id) {

  // costruttore
  this.id = _id;
  this.x = random(w*50);
  this.y = random(h*10);
  this.dirX = 3;
  this.dirY = 2;
  this.speed = random(1, speedMax);
  this.r = 255 * noise(t + 50) * this.speed;
  this.g = 255 * noise (t + 15) * this.speed;
  this.b = 255 * noise(t + 20) * this.speed;

  // metodo move
  this.move = function() {
    if (random(1) >= .8) this.dirX += 30;
	if (random(1) >= .5) this.dirY += 5;
	this.x = this.speed * this.dirX;
	this.y = this.speed * this.dirY;
  }
  
  // metodo display
  this.display = function() {
	fill(this.r, this.g, this.b);
	ellipse(this.x, this.y, random(200, d));
	fill(0);
	text(this.id, this.x, this.y);
  }
}
