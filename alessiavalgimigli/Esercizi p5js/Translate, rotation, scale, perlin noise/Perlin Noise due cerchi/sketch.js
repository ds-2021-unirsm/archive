var t;
var t1;

function setup(){
  createCanvas(400, 400);
  background(0);
  t=0;
  t1=0;
}

function draw(){
  //il secondo valore è l'opacità
  background (0, 5);
  
  var x = width * noise(t);
  var y = height * noise(t+5);
  var r = 255 * noise(t+6);
  var g = 255 * noise(t+7);
  var b = 255 * noise(t+8);
  
  var x2 = width * noise(t1+11);
  var y2 = height * noise(t1+15);
  var r2 = 255 * noise(t1+19);
  var g2 = 255 * noise(t1+23);
  var b2 = 255 * noise(t1+27);
  
  
  noStroke();
  fill(r, g, b);
  ellipse(x, y, 120, 120);
  
  noStroke();
  fill (r2, g2, b2);
  ellipse(x2, y2, 60, 60);
  
  t = t + 0.003;
  t1 = t1 + 0.01;
}
