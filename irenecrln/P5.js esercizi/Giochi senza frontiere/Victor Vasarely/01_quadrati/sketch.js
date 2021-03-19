function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  for (var i = 0; i < 20; i++) {
    push();
    rotate(4 / i);
    scale(4 / i);
    //stroke(6, 255);
    if (i % 3 == 1) {
      fill(0)
    }
    rect(100, 100, 900);

    pop();
  }
}