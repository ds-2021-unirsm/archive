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
 background(255);

 // per tutti i camminatori chiama i diversi metodi utili 
 for (var i=0; i<quanti; i++){
	c[i].move();
	c[i].display();
 }
  t = t + 0.02
}


// classe
function Camminatore(_id) {

  // costruttore
  this.id = _id;
  this.x = width * noise(t + 3);
  this.y = height * noise(t + 10);
  this.dirX = noise(t);
  this.dirY = noise(t);
  this.speed = random(1, speedMax);

  // metodo move
  this.move = function() {
    if (noise(t*1) >= .5) this.dirX * noise(t-20);
	if (noise(t*2) >= .5) this.dirY * noise(t-10);
	this.x += this.speed * noise(t*25);
	this.y += this.speed * noise(t*10);
  }
  
  // metodo display
  this.display = function() {
	fill(map(this.speed,1,speedMax,0,255));
	ellipse(this.x * noise(t), this.y * noise(t), d);
	fill(0);
	text(this.id, this.x * noise(t), this.y * noise(t));
  }

}
