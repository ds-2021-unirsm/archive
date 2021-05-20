//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// Circular-squares-pattern by Andrea [circle, module, pattern]
// 2021 © Andrea @AndrCastellucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/andrea-castellucci
// Educational purposes, MIT License, 2021, San Marino
// —

var quanti = 60;
var modulo;
var d = 8; // diametro cerchi

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  modulo = width / quanti;
  
  noStroke();
}

function draw() {
  background(0);

ellipseMode(CENTER);
  for (var x = 0; x < width; x += modulo) {
    for (var y = 0; y < height; y += modulo) {

      fill(x % 120);
      ellipse(x, y, d);

    }
  }
  
ellipseMode(CORNER);
  for (var x = 0; x < height; x += modulo) {
    for (var y = 0; y < width; y += modulo) {

      fill(x % 120);
      ellipse(y+5, x+5, d);
      
    }
  }
}
