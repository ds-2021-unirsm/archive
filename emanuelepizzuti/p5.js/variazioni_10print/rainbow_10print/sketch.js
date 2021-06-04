//  ____ ____
// | ___|  _ |
// | ___|  __|
// |____|_|
// ___________
//
// Rainbow by emanuelepizzuti [10print, perlin noise]
// 2021 © emanuelepizzuti, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// ___________

let bord = 400;
let bg = 0;

let x = bord;
let y = bord;
let incr = 15;

function setup() {
  let w = windowWidth;
  let h = windowHeight;
  createCanvas(w, h);
  background(bg);
  rectMode(CENTER);
  strokeWeight(3);
}

function draw() {
  var r = 255 * noise(0.004 * x, 0.004 * y + 10);
  var g = 255 * noise(0.004 * x, 0.004 * y + 15);
  var b = 255 * noise(0.004 * x, 0.004 * y + 20);

  if (x % 2 == 0) {
    r = 0;
    g = 0;
    b = 0;
  }

  // ---
  if (random(1) < 0.2) { // probabilità con cui scegliere quale delle due linee disegnare
    stroke(r, g, b);
    line(x, y, x + incr, y + incr);
  } else if (random(1) < 0.4) {
    stroke(r, g, b);
    line(x + incr, y, x, y + incr);
    // ---
  } else if (random(1) < 0.9) {
    stroke(r, g, b);
    line(x, y, x + incr, y);
  } else {
    stroke(r, g, b);
    line(x, y, x, y + incr);
  }

  y = y + incr;

  if (y > height - bord) {
    y = bord;
    x = x + incr;
  }

  if (x > width - bord) {
    background(0);
    x = bord;
    y = bord;
  }
}
