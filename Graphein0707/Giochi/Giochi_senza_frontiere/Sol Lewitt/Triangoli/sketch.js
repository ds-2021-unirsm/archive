//triangoli di Sol Lewitt

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 400, 200, 200);
}

function draw() {
  background(350);
  noStroke();
  translate(width / 2, height / 2);
  rotate(PI); //rovescia il triangolo

  for (var i = 0; i < 40; i++) {
    push();
    scale(16 / i);
    fill(random(400), 200, 200);
    triangle(0, -100, -100, 100, 100, 100);
    pop();
  }
  noLoop();
}