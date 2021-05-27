//  ______  ____  ___  _______  __________ ______ ____ ______________
//  __/ _ \/ __ \/ _ )/ __/ _ \/_  __/ __ \ _/ _ |_/ /__/ __/ __/  _/
//  _/ , _/ /_/ / _  / _// , _/ / / / /_/ / / __ |/ /__/ _/_\ \_/ /
//  /_/|_|\____/____/___/_/|_| /_/  \____/ /_/ |_/____/___/___/___/
//
// -
// Walkers01 0.1 by Roberto [camminatori, indipendenti]
// 2021 © Roberto @ciunart, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/RobertoAlesi
// Educational purposes, MIT License, 2021, San Marino
// —
//
// Help:
// [click] add walker
//
// —

// random walker OOP
var w, h;
var d = 10;
var quanti = 3;
var c = [];
t=0;


function setup() {
  createCanvas(w=windowWidth, h=windowHeight);
  textSize(18);
  
  // crea n oggetti di classe Camminatore
  for (var i=0; i<quanti; i++){
  	c.push(new Camminatore(i)); 
    background(0);
  }
}
function mouseClicked (){
  quanti++;
  c.push(new Camminatore(quanti+1));
}


function draw() {
 background(0,2);
 
 // per tutti i camminatori chiama i diversi metodi utili 
 for (var i=0; i<quanti; i++){
	c[i].move();
	c[i].display();
   }
  
}


// classe
function Camminatore(_id) {

  // costruttore
  this.id = _id;
  this.x=0;
  this.y=0;
  this.moltiplicatore=0;
  this.dirX = 0;
  this.dirY = 0;
  this.speed = random(1, 10);
  this.speed2 = random(1, 10);

  // metodo move
  this.move = function() {
    this.dirX = noise(this.speed*5);
    this.dirY = noise(this.speed2*5);
	this.x = this.dirX * w * this.moltiplicatore ;
	this.y = this.dirY * h * this.moltiplicatore;
    this.speed += random(0.001);
    this.speed2 += random(0.001);
    this.moltiplicatore += 0.003;
  }
  
  
  // metodo display
  this.display = function() {
    
    noStroke();
    //blendMode(DARKEST);
    var r = 255 * noise(t+2);
    var b = 255 * noise(t+2);

    t+=0.0001
     fill(255);
     ellipse(this.x, this.y, d);
    
  }

}
