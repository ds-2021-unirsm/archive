// Generatore di pattern
// Sketch di Andrea Castellucci

var quanti = 60;
var modulo;
var d = 8; // diametro cerchi

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  modulo = width / quanti;
  
  noStroke();
}

function draw() {
  background(0);

ellipseMode(CENTER);
  for (var x = 0; x < width; x += modulo) {
    for (var y = 0; y < height; y += modulo) {

      fill(x % 120);
      ellipse(x, y, d);

    }
  }
  
ellipseMode(CORNER);
  for (var x = 0; x < height; x += modulo) {
    for (var y = 0; y < width; y += modulo) {

      fill(x % 120);
      ellipse(y+5, x+5, d);
      
    }
  }
}
