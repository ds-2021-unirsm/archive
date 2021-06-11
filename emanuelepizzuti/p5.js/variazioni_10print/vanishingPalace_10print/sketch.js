//  ____ ____
// | ___|  _ |
// | ___|  __|
// |____|_|
// ___________
//
// vanishingPalace by emanuelepizzuti [10print, WEBGL]
// 2021 © emanuelepizzuti, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
// Help:
// [mouseClicked] add a sphere to the composition
// ___________

let t = 0;

let w;
let h;

let x = 0;
let y = 0;
let z = 0;

let incr = 50;

let molRaggio = 70;

function setup() {
  createCanvas((w = windowWidth), (h = windowHeight), WEBGL);
  angleMode(DEGREES);
  background(25);
  //noStroke();
}

function draw() {
  lights();
  //orbitControl();
  rotateX(90);
  rotateZ(20);

  // COLOR //////////////////////////////////////
  var r = 55 * noise(0.004 * x, 0.004 * y + 10);
  var g = 235 * noise(0.004 * x, 0.004 * y + 15);
  var b = 255 * noise(0.004 * x, 0.004 * y + 20);
  
  translate(x-200, y-200, z-400);
  stroke(r, g, b);
  strokeWeight(0.8);
  noFill();

  if (random(1) < 0.2) {
    box(noise(t) * molRaggio);
  } else if (random(1) < 0.4) {
    box(noise(t) * molRaggio);
  } else if (random(1) < 0.9) {
    box(noise(t) * molRaggio);
  } else {
    box(noise(t) * molRaggio);
  }

  x = x + incr;
  t += 0.01;

  if (x > 400) {
    x = 0;
    y = y + incr;
  }

  if (y > 400) {
    x = 0;
    y = 0;
    z += 50;
    molRaggio-=5;
    
  }
  
  if (molRaggio < 0)
    molRaggio=0;
}

function mouseClicked() {
  var r = 255 * noise(0.004 * x, 0.004 * y + 10);
  var g = 25 * noise(0.004 * x, 0.004 * y + 15);
  var b = 225 * noise(0.004 * x, 0.004 * y + 20);

  rotateX(90);
  rotateZ(frameCount);
  fill(r, g, b);
  stroke(r, g, b);
  sphere(noise(t) * 100);
  // prevent default
  return false;
}
