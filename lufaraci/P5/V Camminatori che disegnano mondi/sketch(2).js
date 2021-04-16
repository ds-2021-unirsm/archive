var x;
var y;
var v = 100;
var r;
var g;
var b;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  x = width/2;
  y = height/2;
  
}

function draw() {
  
  var r = map(x, 0, width, 0, 255);
  var g = map(y, 0, height, 0, 255);
  var b = 220;
  
  if (keyCode === 37) {
    x = x-1;
  }
  if (keyCode === 38) {
    y = y-1;
  }
  if (keyCode === 39) {
    x = x+1;
  }
  if (keyCode === 40) {
    y = y+1;
  }
  if (keyCode === 32) {
   y = y;
   x = x;
  }
  x*v;
  y*v;
  
  noStroke();
  fill(r,g,b);
  ellipse(x,y,20,20);

}
/*
 function keyPressed() {
  background('yellow');
  text(`${key} ${keyCode}`, 10, 40);
  print(key, ' ', keyCode);
  
  x*v;
  y*v;
  
  if (keyCode === 37) {
    x = x-1;
  }
  if (keyCode === 38) {
    y = y-1;
  }
  if (keyCode === 39) {
    x = x+1;
  }
  if (keyCode === 40) {
    y = y+1;
  }
  if (keyCode === 32) {
   y = y;
   x = x;
  }
   
}*/

