// Cerchio in movimento con perlin noise 0.1 by Mariangela Catucci [forme, perlin noise, colori]
// 2021 © Mariangela @MariangelaCatucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
//
// —

var t;

function setup() {
  createCanvas(w=windowWidth, h=windowHeight);
  background(0);
  t = 0;
}

function draw() {
  background(t*5, 20);
  var x = width * noise(t);
  var y = height * noise(t + 2);
  var r = 255 * noise(t+5);
  var g = 255 * noise(t+20);
  var b = 255 * noise(t+100);
  
  noStroke();
  fill(r, g, b);
  ellipse(x , y, t * 5, t * 5);
  
  t = t + 0.03;
}

