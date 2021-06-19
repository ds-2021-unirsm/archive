
var x = 0;
var y = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
}

function draw() {
  var r = random(255);
  var g = random(100, 200);
  var b = random(200);
  
  if (random(1) > 0.5) {
    line(x, y, x+20, y+20);
    fill(r, g, b);
    ellipse(x+10, y+10, 8, 8);
    
  } 
  else {
    line(x, y+20, x+20, y);
  }

  x += 20;
  if (x > width) {
    x = 0;
    y += 20;
  }

  if (y > height) {
    background(255);
    x = 0;
    y = 0;
  }
}