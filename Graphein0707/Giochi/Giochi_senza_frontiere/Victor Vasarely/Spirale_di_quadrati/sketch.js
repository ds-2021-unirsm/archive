// -
// Quadrati di Victor Vasarely 0.1 by Gaia Andruccioli [quadrati, spirale]
// 2021 © Gaia Andruccioli, Daniele @Fupete, Irene @iretrtr and the course DS-2021 at DESIGN.unirsm,
// github.com/ds-2021-unirsm — github.com/fupete - github.com/Graphein0707
// Educational purposes, MIT License, 2021, San Marino
// —
//

function setup() {
    createCanvas(450, 450);
    rectMode(CENTER);
  }

  function draw() {
    background(0);
    noStroke();

    for (var i = 0; i < 24; i++) {
      push();
      translate(width/2, height/2);
      scale(6 / i);
      rotate(4 / i);
      if (i % 2 == 1) {
        fill(0)
      }
      rect(50, 50, 500);
      pop();
    }
    noLoop();
  }
