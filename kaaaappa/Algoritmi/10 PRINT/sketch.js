function setup() {
  createCanvas(1020, 600);
  noStroke();
  background(0);
}

function draw() {

var linee = int(pow(2, int(random(1, 6))));
var u = height / (linee + 4);
var spessore = int(pow(2, int(random(1, 4))));
var uth1 = u / spessore;
var uth2 = u / uth1 ;
var startX = int(-u * 0.75);
var startY = height/2 - linee/2 * u;
var endX = width+u;
var endY = height/2 + linee/2 * u;
for (var x = startX; x < endX; x += u) {
 for (var y = startY; y < endY; y += u) {
 if (random(1) > 0.5) {
 fill(255, 0, 255);
 quad(x, y, x+u, y+u, x+uth2, y+u, x+uth1, y);
 }
 else {
 fill(0, 255, 0);
 quad(x, y+u, x+u, y, x+uth2, y, x+uth1, y+u);
 }
 }
}
  noLoop();
}
