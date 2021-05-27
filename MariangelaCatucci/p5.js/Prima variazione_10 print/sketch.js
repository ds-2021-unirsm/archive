// Prima variazione_10 print 0.1 by Mariangela Catucci [10print, color]
// 2021 © Mariangela @MariangelaCatucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —

let x = 0;
let y = 0;
let space = 30;
let stroke_val = 1;
let maxDist = 0;
let print = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noFill();
  maxDist = dist(0, 0, width / 2, height / 2);
  t = 0;
  strokeCap(ROUND);
}

function draw() {
  if (print) {
    disegna_forme();
  }
  t = t + 0.03;
}

function disegna_forme() {
  let r = 255 * noise(t + 10);
  let g = 255 * noise(t);
  let b = 255 * noise(t + 20);

  let d = dist(x, y, width / 2, height / 2);
  let stroke_val = map(d, 0, maxDist, 0.5, space / 3);

  strokeWeight(t * 0.2);

  stroke(r, g, b);
  translate(x, y);

  if (random(1) > 0.5) {
    if (random(1) > 0.8) {
      noFill();
      if (random(1) > 0.2) {
        triangle(space / 2, 0, 0, space, space, space);
      } else {
        triangle(0, 0, space / 2, space, space, 0);
      }
    } else {
      fill(r, g, b, t + 1.5);
      noStroke();
      let diametro = space * (2 - t/2);
      ellipse(0, 0, diametro);
    }
  } else {
    if (random(1) < 0.5) {
      line(0, 0, space, space);
    } else {
      line(space, 0, 0, space);
    }
  }

  x += space;
  if (x > width) {
    x = 0;
    y += space;
    if (y > height) {
      print = false;
    }
  }
}
