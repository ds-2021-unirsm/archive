// -
// Linee di Sol Lewitt 0.1 by Gaia Andruccioli [random, numbers]
// 2021 © Gaia Andruccioli, Daniele @Fupete, Irene @iretrtr and the course DS-2021 at DESIGN.unirsm,
// github.com/ds-2021-unirsm — github.com/fupete - github.com/Graphein0707
// Educational purposes, MIT License, 2021, San Marino
// —
//

function setup() {
  createCanvas(600, 600);
  strokeWeight(10);
}

function draw() {
  background(255);

  stroke(0);
  // linee nere
  line(320, 20, 320, 180);
  line(340, 20, 340, 180);
  line(360, 20, 360, 180);
  line(380, 20, 380, 180);
  line(400, 20, 400, 180);

  stroke(225, 234, 21)
  // linee gialle
  line(420, 40, 540, 40);
  line(420, 60, 540, 60);
  line(420, 80, 540, 80);
  line(420, 100, 540, 100);
  line(420, 120, 540, 120);
  line(420, 140, 540, 140);
  line(420, 160, 540, 160);

  stroke(255, 0, 0);
  // linee rosse
  line(324, 180, 300, 212);
  line(348, 180, 300, 244);
  line(372, 180, 300, 276);
  line(396, 180, 300, 308);
  line(420, 180, 300, 340); // mezzeria
  line(420, 212, 324, 340);
  line(420, 244, 348, 340);
  line(420, 276, 372, 340);
  line(420, 308, 396, 340);

  stroke(0, 0, 255);
  // linee blu
  line(516, 180, 540, 212);
  line(492, 180, 540, 244);
  line(468, 180, 540, 276);
  line(444, 180, 540, 308);
  line(420, 180, 540, 340); // mezzeria
  line(420, 212, 516, 340);
  line(420, 244, 492, 340);
  line(420, 276, 468, 340);
  line(420, 308, 444, 340);

  stroke(0);
  //cornice nera
  line(300, 20, 540, 20); // top
  line(300, 20, 300, 340); // left
  line(300, 340, 540, 340); // bottom
  line(540, 20, 540, 340); // right
  line(420, 20, 420, 340); // vertical
  line(300, 180, 540, 180); // horizontal
}
