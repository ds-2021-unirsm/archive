//cerchi di Sébastien Truchet

var x = 0;
var y = 0;
var trama = 25; // dimensione

function setup() {
  createCanvas(500, 500);
  stroke(0);
  strokeWeight(4);
  noFill();
}
// disegna il pattern con dei mezzi cerchi e gli archi
function drawPattern() {
  arc(x, y + trama, trama, trama, PI + HALF_PI, 0); //x, y, altezza, larghezza, start, stop 
  arc(x + trama, y, trama, trama, HALF_PI, PI);
}
// rotazione degli archi
function drawEditPattern() {
  push();
  rotate(HALF_PI); //rotazione degli elementi
  translate(0, -trama); //sposto il centro da 0 a -25
  drawPattern(); //disegna l'arco
  pop();
}

function draw() {
  background(255);
  for (var x = 0; x < width; x = x + trama) { //disegno la "griglia"
    for (var y = 0; y < height; y = y + trama) {
      push();
      translate(x, y);
      if (random(1) > 0.5) {
        drawPattern(); //disegna elementi
      } else {
        drawEditPattern(); //ruota gli elementi
      }
      pop();
    }
  }
  noLoop();
}