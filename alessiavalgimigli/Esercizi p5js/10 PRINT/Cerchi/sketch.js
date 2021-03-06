// -
// 10Print con cerchi 0.1 by Alessia Valgimigli [10Print, cerchi]
// 2021 © Alessia Valgimigli, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —

var x = 0;
var y = 0;

function setup() {
  createCanvas(400, 400);
  background(0);
  colorMode(HSB, 360, 100, 100)
  noStroke();
}

function draw() {

  fill(random(360), 100, 100);
  if (random(1) > 0.5) {
    ellipse(x+10, y+10, 10, 10);
  }
  else {
    ellipse(x+10, y+10, 3, 3);
  }

  x += 20;
  //se esce dalla larghezza della pagina rinizia una nuova linea
  if (x > width) {
    x = 0;
    y += 20;
  }

  //se esce dalla lunghezza della pagina azzera e ricomincia dall'inizio
  if (y > height) {
    background (0);
    x = 0;
    y = 0;
  }
}
