// Variazione di 10print: una foresta
// by emanuelepizzuti

let t = 0;
let tz = 0;

let w = 800;
let h = 800;

let x = 0;
let y = -800;
let incr = 40;

let dim = 10;

function setup() {
  createCanvas(w, h, WEBGL);
  angleMode(DEGREES);
  background(0);
  noStroke();

  //strokeWeight(10);
}

function draw() {

  lights();
  rotateX(60);

  var r = 255 * noise(0.004 * x, 0.004 * y + 10);
  var g = 255 * noise(0.004 * x, 0.004 * y + 15);
  var b = 25 * noise(0.004 * x, 0.004 * y + 20);

  if (random(1) < 0.2) { // probabilità con cui scegliere quale delle due linee disegnare
    translate(x - w, y - h, noise(t, tz) * 60);
    fill(r, g, b);
    // line(x, y, x + incr, y + incr);
    sphere(noise(t) * 25);
    // sphere(dim);
  } else if (random(1) < 0.4) {
    translate(x - w, y - h, noise(t, tz) * 60);
    fill(r, g, b);
    // line(x + incr, y, x, y + incr);
    sphere(noise(t) * 25);
    // sphere(dim);
  } else if (random(1) < 0.9) {
    translate(x - w, y - h, noise(t, tz) * 60);
    fill(r, g, b);
    // line(x, y, x + incr, y);
    sphere(noise(t) * 25);
    // sphere(dim);
  } else {
    translate(x - w, y - h, noise(t, tz) * 60);
    fill(r, g, b);
    // line(x, y, x, y + incr);
    sphere(noise(t) * 25);
    // sphere(dim);
  }

  x = x + incr;
  t += 0.1;
  tz += 0.5;

  if (x > width*2) {
    x = 0;
    y = y + incr;
  }

  if (y > height*2) {
    background(0);
    x = 0;
    y = -800;
  }
}
