// -
// Metaball 0.1 by Alessia Valgimigli [metaball, walkers]
// 2021 © Alessia Valgimigli, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// @jlfwong (https://github.com/jlfwong) for http://jamie-wong.com/2014/08/19/metaballs-and-marching-squares/
// 
// @Processor (https://openprocessing.org/user/141528?view=sketches&o=108) for https://openprocessing.org/sketch/750142
// —
//
// Help:
// [mouse] click: add a ball into the array
// —

const metaballs = [],
 scapes = [],
  sum = (arr) => arr.reduce((a, b) => a + b, 0);

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(3);
  strokeCap(SQUARE);
  noFill();

  for (let i = 0; i < 3; i++) metaballs.push(new MetaBall());

 scapes.push(new Scape(10, metaballs));
}

function draw() {
  background(0);
  for (let metaball of metaballs) metaball.update();
  for (const scape of scapes) scape.update();
}

function mousePressed() {
  //quando clicco crea una ball nuova
  metaballs.push(new MetaBall(metaballs.length));
}
