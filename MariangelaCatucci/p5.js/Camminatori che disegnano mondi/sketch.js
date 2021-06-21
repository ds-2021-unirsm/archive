// Camminatori che generano mondi 0.1 by Mariangela Catucci [camminatori, click, colors]
// 2021 © Mariangela @MariangelaCatucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
//
// —
//
// Help:
// [mousePressed] pulisce la canvas
//
// —


var num = 10;
var walkers = [];

function setup() {
  background(255);
  createCanvas(windowWidth, windowHeight);

  for (var i = 0; i < num; i++) {
     walkers.push(new mondo());
   }
}

function draw() {
    for (var i = 0; i < num; i++) {
      walkers[i].move();
      walkers[i].display();
    }
}

function mondo() {
  
  this.x = 50;
  this.y = 50;
  this.t = random(10);
  this.tIncr = random(0.05, 1) * 0.05;
  this.r = 255 * noise(this.t*100);
  this.g = 255 * noise(this.t*40);
  this.b = 255 * noise(this.t*2);
  
  this.move = function() {
     this.x = noise(this.t) * width;
     this.y = noise(this.t + 20) * height;
     this.t += this.tIncr;
   }
   
  this.display = function() {
    fill(this.r, this.g, this.b);
    stroke(this.r, this.g, this.b);
    ellipse(this.x, this.y, 15, 15);
    triangle(this.x, this.y, this.x*2, this.y*2,this.x*4, this.y*4)
   }
 }

function mousePressed () {
 clear();
}
