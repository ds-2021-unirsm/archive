// -
// 10 PRINT 0.1 by Gaia Andruccioli [10 PRINT, movimento, pattern]
// 2021 © Gaia Andruccioli, Daniele @Fupete, Irene @iretrtr and the course DS-2021 at DESIGN.unirsm,
// github.com/ds-2021-unirsm — github.com/fupete - github.com/Graphein0707
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to:
// @BenjaminHabert for
// https://github.com/BenjaminHabert
// 

let num = 12;
let pattern;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pattern = new Pattern();
}

function draw() {
  background(0);

  for (let x = num; x < width; x += num) {
    for (let y = num; y < height; y += num) {
      push();
      translate(x, y);
      let mov = pattern.trama(x, y);
      disegno(mov);
      pop();
    }
  }
    pattern.movimento();
}

function disegno(mov) {
  if (mov < 0.5) {
    strokeWeight(1);
    stroke(0, 0, 255);
    line(0, 0, num, num);
  
  } else {
    strokeWeight(3);
    stroke(220, 20, 60);
    line(num, 0, -num, 0);
  }
}