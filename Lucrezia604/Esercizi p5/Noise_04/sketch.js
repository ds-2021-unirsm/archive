// -
// Noise_04 0.1 by Lucrezia Nediani [Generativo, Noise]
// 2021 © Lucrezia Nediani, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/Lucrezia604 — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// @ Gene Kogan (genekogan.com) for https://genekogan.com/code/p5js-perlin-noise/
// —


var t;

function setup() {
  createCanvas(600, 600);
  noFill();
  t = 0;
}

function draw() {
  var x1 = width * noise(t + 15);
  var x2 = width * noise(t + 30);
  var x3 = width * noise(t + 90);
  var x4 = width * noise(t + 0.5);
  var y1 = height * noise(t + 10);
  var y2 = height * noise(t + 65);
  var y3 = height * noise(t + 1000);
  var y4 = height * noise(t + 85);
  
  var r = 255 * noise(t+10);
  var g = 255 * noise(t+50);
  var b = 255 * noise(t+20);
  
  stroke(r, g, b);

  bezier(x1, y1, x2, y2, x3, y3, x4, y4);

  t += 0.01;

  // clear the background every 500 frames using mod (%) operator
  if (frameCount % 1000 == 0) {
	background(255);
  }
}
