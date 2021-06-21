// Seconda variazione_10 print 0.1 by Mariangela Catucci [maze, ellipse]
// 2021 © Mariangela @MariangelaCatucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —

var x = 0;
var y = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
}

function draw() {
  var r = random(255);
  var g = random(100, 200);
  var b = random(200);
  
  if (random(1) > 0.5) {
    line(x, y, x+20, y+20);
    fill(r, g, b);
    ellipse(x+10, y+10, 8, 8);   
  } else {
    line(x, y+20, x+20, y);
  }

  x += 20;
  if (x > width) {
    x = 0;
    y += 20;
  }

  if (y > height) {
    background(255);
    x = 0;
    y = 0;
  }
}
