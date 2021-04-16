var w, h;
var d = 1; //diametro figura
var k = 0;
var quanti = 1;
var c = [];


function setup() {
  background(0);
  //tonalità, saturazione, luminosità
  //colorMode(HSB); non funziona opacità background con questo colorMode
  
  createCanvas(w=500, h=500);
  for (var i=0; i<quanti; i++){
  	c.push(new Camminatore()); 
  }
}

function draw() {
  background(255, 0, 255, 20);

 for (var i=0; i<quanti; i++){
	c[i].move();
	c[i].display();
 }
  
   d= d + 0.1; //incremento diamentro
   k = k + 0.01;
}

// classe
function Camminatore() {

  
  //direzione camminatore
  this.dirX = 1;
  this.dirY = 1;
  //this.speed = 6;


  this.move = function() {
	this.x = width * noise (k);
	this.y = this.x * noise (k + 3);
  }
  
  this.display = function() {
    var r =10 * noise(k+10);
    var g = 10 * noise(k+15);
    var b = 10 * noise(k+20); 
	fill(r, g, b);
    stroke(0,255, 0);
    strokeWeight(2);
    square(this.x, this.y, d, k);
  }

}
