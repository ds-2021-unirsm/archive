// -
// Curva di Sol Lewitt 0.1 by Gaia Andruccioli [random, numbers]
// 2021 © Gaia Andruccioli, Daniele @Fupete, Irene @iretrtr and the course DS-2021 at DESIGN.unirsm,
// github.com/ds-2021-unirsm — github.com/fupete - github.com/Graphein0707
// Educational purposes, MIT License, 2021, San Marino
// —
//

function setup() {
  createCanvas(400, 400);
  background(0, 0, 255); //sfondo blu parte alta

}

function draw() {
  stroke(255, 0, 0); //stroke rosso parte bassa

  beginShape(); //inizia a disegnare i vertici di una forma
  for (var x = 0; x < width; x++) {
    var nx = map(x, 0, width, 0, 0.5);
    var y = height * noise(nx);
    vertex(x, y); //utilizzato per specificare le coordinate del vertice
    vertex(x, 400);
  }
  endShape(); //finisce di disegnare la forma 
}
