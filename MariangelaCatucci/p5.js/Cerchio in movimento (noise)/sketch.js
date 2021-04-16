var t;

function setup() {
  createCanvas(w=windowWidth, h=windowHeight);
  background(0);
  t = 0;
}

function draw() {
  // fade the background by giving it a low opacity
  background(t*5, 20);

  var x = width * noise(t);
  var y = height * noise(t + 2);
  var r = 255 * noise(t+5);
  var g = 255 * noise(t+20);
  var b = 255 * noise(t+100);
  
  noStroke();
  fill(r, g, b);
  ellipse(x , y, t * 5, t * 5);
  
  t = t + 0.03;

}

