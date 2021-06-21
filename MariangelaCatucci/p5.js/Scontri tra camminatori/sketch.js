// Camminatori che si scontrano 0.1 by Mariangela Catucci [camminatori, triangolo, forma, colore, cerchi]
// 2021 © Mariangela @MariangelaCatucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
//
// —

var num = 15;
var triangles = [];
var position;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (var i = 0; i < num; i++) {
     triangles[i] = new Walker(random(width),random(height));
   }
}

function draw() {
    background(255);
    for (var i = 0; i < triangles.length; i++) {
      triangles[i].move();
    triangles[i].display();
      
      for (var j = 0; j < triangles.length; j++) {
        if (i != j && triangles[i].scontro(triangles[j])) {
        triangles[i].modifica();
      }
    }
  }
}

function Walker(x, y) {
  this.position = createVector(150, 150);
  this.position.x = x;
  this.position.y = y;
  this.t = random(10);
  this.raggio = random(10, 30);
  this.shape = triangle(this.position.x, this.position.y+70, this.position.x+50, this.position.y-40,this.position.x+50, this.position.y+70)
  this.tIncr = random(0.02, 2) * 0.005;
  this.r = 255 * noise(this.t*100);
  this.g = 255 * noise(this.t*40);
  this.b = 255 * noise(this.t*2);
  
  this.move = function() {
     this.position.x = noise(this.t) * width;
     this.position.y = noise(this.t + 20) * height;
     this.t += this.tIncr;
   }
   
  this.modifica = function(){
    fill(this.r, this.g, this.b);
    noStroke();
    this.shape = ellipse(this.position.x, this.position.y, this.raggio, this.raggio);    
  }
  
  this.scontro = function(other){
    this.d = dist(this.position.x, this.position.y, other.position.x, other.position.y);

    if (this.d < this.raggio + other.raggio) {
      return true;
    } else {
      return false;
    }
  }

  this.display = function() {
    stroke(this.r, this.g, this.b);
    noFill();
    triangle(this.position.x, this.position.y+70, this.position.x+50, this.position.y-40,this.position.x+50, this.position.y+70);
   }
 }

