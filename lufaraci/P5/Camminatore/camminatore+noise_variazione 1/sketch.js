var w, h;
var d = 300;
var quanti = 10;
var c = [];
var speedMax = 4;

function setup() {
  createCanvas(w=windowWidth, h=windowHeight);
  textSize(18);
  
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
}


// classe
function Camminatore(_id) {

  // costruttore
  this.id = _id;
  this.x = random(w);
  this.y = random(h);
  this.dirX = 1;
  this.dirY = 1;
  this.speed = random(1, speedMax);

  // metodo move
  this.move = function() {
    if (noise(1) >= .5) this.dirX *= -1;
	if (noise(1) >= .5) this.dirY *= -1;
	this.x += this.speed * this.dirX;
	this.y += this.speed * this.dirY;
    if(this.x>=width+75){
      this.x = -75;
    }
    if(this.y>=height+75){
      this.y = -75;
    }
  }
  
  // metodo display
  this.display = function() {
    noStroke();
    var r = 200;
    var g = map(this.speed,1,speedMax,100,255);
    var b = map(this.speed,1,speedMax,100,255);
	fill(r,g,b);
	ellipse(this.x, this.y, d/2);
	fill(0);
	text(this.id, this.x, this.y);
  }

}