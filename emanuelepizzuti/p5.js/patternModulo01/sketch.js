// LED WALL
// Pattern con modulo + perlinNoise
// sketch by emanuelepizzuti

// Guida:
// [mouse] cambia la definizione del pattern

let w, h;
let tx, ty;
let mx, my;

function setup() {
  createCanvas(w = windowWidth, h = windowHeight);
  background(10);
  rectMode(CENTER);
  ellipseMode(CENTER);
  // noFill();
  strokeWeight(2);
}

function draw() {

  for (var x = 15; x < w; x += 15) {
    for (var y = 15; y < h; y += 15) {
      mx = map(mouseX, 0, w, 0, 0.02);
      my = map(mouseY, 0, h, 0, 0.02);
      tx = x * mx;
      ty = y * my;
      // d = frameCount % 100;
      if (x % 14 == 0 || y % 14 == 0) {
        noStroke();
        noFill();
        rect(x, y, 15);
      } else {
        noStroke();
        fill(255 * noise(tx, ty) + 50, 255 * noise(tx, ty) + 100, 255 * noise(tx, ty) + 150);
        rect(x, y, 15);
      }
    }
  }
}