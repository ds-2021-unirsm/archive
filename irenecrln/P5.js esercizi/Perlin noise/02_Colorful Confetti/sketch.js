function setup() {
  createCanvas(500, 500);
  background(0);
}

function draw() {
    background(0, 0, 0, 90);
    //translate(width/2, height/2);
    for (var i = 0; i < 5; i++) {
      //fill(random(255), random(255), random(255));
      var r = 255 * noise(tx + 10);
      var g = 255 * noise(tx + 15);
      var b = 255 * noise(tx + 20);
      noStroke();
      fill(r, g, b,90);
      push();
      var tx = 30 * noise(0.01 * frameCount);
      translate(width/2, tx+80);
      rotate(radians(frameCount));
      var rx = 60 * noise(0.01 * frameCount + 10);
      star(rx, 0, 80, 100, 40);
    }

}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2 * noise(0.01 * frameCount + 500);
    let sy = y + sin(a) * radius2 * noise(0.01 * frameCount + 500);
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}