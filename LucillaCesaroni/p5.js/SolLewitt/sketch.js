// Sol Lewitt
// Lucilla Cesaroni

var w, h;

function setup() {
  createCanvas(w = windowWidth, h = windowHeight);
  background(0);
}

function draw() {

  background(0);
  translate(w / 2 - 340, h / 2 - 100);

  // primo quadro
  fill(160, 0, 0);
  noStroke();
  rect(20, 20, 200, 200); // quadrato di sfondo  

  // shape
  stroke(0, 130, 40); // colore linea
  noFill();

  beginShape();
  for (var i = 0; i < 200; i++) {
    var n_i = map(i, 0, 200, 0, 1); // per ogni altezza definisce un valore i
    var y = 200 * noise(n_i + 5);

    vertex(y, i + 20);
    vertex(220, i + 20);
  }
  endShape();

  // secondo quadro
  fill(20, 100, 255);
  noStroke();
  rect(240, 20, 200, 200); // quadrato di sfondo  

  // shape
  stroke(235, 0, 0); // colore linea
  noFill();

  beginShape();
  for (var i2 = 0; i2 < 200; i2++) {
    var n_i2 = map(i2, 0, 200, 0, 1); // per ogni altezza definisce un valore i
    var y2 = 200 * noise(n_i2 + 10);

    vertex(i2 + 240, y2);
    vertex(i2 + 240, 220);
  }
  endShape();

  // terzo quadro
  fill(255, 224, 0);
  noStroke();
  rect(460, 20, 200, 200); // quadrato di sfondo  

  // shape
  stroke(120, 20, 180); // colore linea
  noFill();

  beginShape();
  for (var i3 = 0; i3 < 200; i3++) {
    var n_i3 = map(i3, 0, 200, 0, 1); // per ogni altezza definisce un valore i
    var y3 = 200 * noise(n_i3 + 20);
    vertex(y3 + 420, i3 + 20);
    vertex(660, i3 + 20);
  }
  endShape();
}
