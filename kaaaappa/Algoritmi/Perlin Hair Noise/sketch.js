var t;

function setup() {
  createCanvas(800, 400);
  background(255);
  noFill();
  t = 0;
}

function draw() {
  translate(width/2, height/2);
  beginShape();
  stroke(80, 20, 0, 25);
  for (var i = 0; i < 100; i++) {
    //aggiunta random
    var ang = map(random(100, 500), 0, 100, 0, 100);
    var rad = 300 * noise(i * 0.01, t * 0.005);
    var x = rad * cos(ang);
    var y = rad * sin(ang);
    curveVertex(x, y);
  }
  endShape(CLOSE);
  
  beginShape();
  stroke(255, 50);
  for (var a = 0; a < 100; a++) {
    var angx = map(random(100, 600), 0, 100, 0, 100);
    var radx = 300 * noise(a * 0.01, t * 0.005);
    var x1 = radx * cos(angx);
    var y1 = radx * sin(angx);
    curveVertex(x1, y1);
  }
  endShape(CLOSE);

  t += 1;

}
