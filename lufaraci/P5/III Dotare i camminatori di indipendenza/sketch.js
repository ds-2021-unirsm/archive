// random walker OOP
var w, h;//larghezza altezza
var d = 100;//diametro
var quanti = 10;//numero cerchi
var c = [];//oggetto camminatore
var speedMax = 10;//velocità

function setup() {
  createCanvas(w=windowWidth, h=windowHeight);
  textSize(18);//dimensione testo
  
  // crea n oggetti di classe Camminatore
  for (var i=0; i<quanti; i++){
  	c.push(new Camminatore(i)); 
  }

}


function draw() {
 background(255,200,200);
 
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
  this.x = random(w-d/2)+d/2;
  this.y = random(h-d/2)+d/2;
  this.dirX = 1;
  this.dirY = 1;
  this.speed = random(1, speedMax);

  // metodo move
  this.move = function() {
    if (noise(1) >= 0.5) this.dirX *= 1;
	if (noise(1) >= 0.5) this.dirY *= 1;
	this.x += this.speed * this.dirX;
	this.y += this.speed * this.dirY;
    if(this.x>=w-d/2||this.x<=d/2){
    this.dirX*=-1;
    this.display = function() {
    noStroke();
	fill(200,map(this.speed,1,speedMax,0,255),200);
	ellipse(this.x, this.y, d);
	fill(255);
	text("^", this.x-25, this.y-2);
    text("^", this.x+12, this.y-2);
    text("L", this.x-5, this.y+8);
    text("U", this.x-5, this.y+28);
  }
    }
    if(this.y>=h-d/2||this.y<=d/2){
    this.dirY*=-1;
    this.display = function() {
    stroke(255);
    noFill();
    ellipse(this.x, this.y, d);
    text(">", this.x-25, this.y-2);
    text("<", this.x+12, this.y-2);
    text("L", this.x-5, this.y+8);
    text("O", this.x-5, this.y+28);}}
   }
  
  // metodo display
  this.display = function() {
    noStroke();
	fill(200,map(this.speed,1,speedMax,0,255),200);
	ellipse(this.x, this.y, d);
	fill(255);
	text("^", this.x-25, this.y-2);
    text("^", this.x+12, this.y-2);
    text("L", this.x-5, this.y+8);
    text("U", this.x-5, this.y+28);
  }

}