//quadrati di Victor Vasarely

function setup() {
    createCanvas(450, 450);
    rectMode(CENTER);
  }

  function draw() {
    background(0);
    noStroke();

    for (var i = 0; i < 24; i++) {
      push();
      translate(width/2, height/2);
      scale(6 / i);
      rotate(4 / i);
      if (i % 2 == 1) {
        fill(0)
      }
      rect(50, 50, 500);
      pop();
    }
    noLoop();
  }