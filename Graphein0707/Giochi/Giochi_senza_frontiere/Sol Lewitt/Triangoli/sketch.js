// -
// Triangoli di Sol Lewitt 0.1 by Gaia Andruccioli [random, numbers]
// 2021 © Gaia Andruccioli, Daniele @Fupete, Irene @iretrtr and the course DS-2021 at DESIGN.unirsm,
// github.com/ds-2021-unirsm — github.com/fupete - github.com/Graphein0707
// Educational purposes, MIT License, 2021, San Marino
// —
//

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 400, 200, 200);
}

function draw() {
  background(350);
  noStroke();
  translate(width / 2, height / 2);
  rotate(PI); //rovescia il triangolo

  for (var i = 0; i < 40; i++) {
    push();
    scale(16 / i);
    fill(random(400), 200, 200);
    triangle(0, -100, -100, 100, 100, 100);
    pop();
  }
  noLoop();
}
