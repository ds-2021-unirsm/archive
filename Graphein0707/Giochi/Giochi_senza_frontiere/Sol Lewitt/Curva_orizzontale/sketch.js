//curva di Sol Lewitt

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