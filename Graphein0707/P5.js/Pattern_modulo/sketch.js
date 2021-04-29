let d = 35;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  frameRate(20);
}

function draw() {
  background(255);
  for (var x = 0; x < 800; x = x + 50) {
    for (var y = 0; y < 800; y = y + 50) {
      push();
      translate(x, y);
      drawcircle();
      pop();
    }
  }
}

function drawcircle() {
  stroke(random(255), 0, 120);
  strokeWeight(1 + (frameCount % 38));
  ellipse(0, 0, d);
}