//  ____ ____
// | ___|  _ |
// | ___|  __|
// |____|_|
// ___________
//
// ledWall 0.1 by emanuelepizzuti [keyword1, keyword2]
// 2021 © emanuelepizzuti, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// -
// Help:
// [mouse] change position to change the wall definition
// ___________

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
