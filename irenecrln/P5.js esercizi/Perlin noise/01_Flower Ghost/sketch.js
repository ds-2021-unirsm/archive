t = 0;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0, 5);
  fill(0, 10);
  stroke(0, 160);
  var tx = 200 * noise(t + 0, 1 * frameCount / 100);
  translate(tx*3, 200);
  for (var i = 0; i < 20; i++) {
    fill(255, 255, 255, 50);
    noStroke();
    push();
    rotate(i + radians(t + frameCount));
    scale(i / 8.0);
    triangle(0, 1, -10, 100, 10, 100);
    pop();
  }
  t = t + 0,01;
}