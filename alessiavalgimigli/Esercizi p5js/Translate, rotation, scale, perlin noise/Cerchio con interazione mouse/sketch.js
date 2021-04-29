var t;

function setup(){
  createCanvas(400, 400);
  background(0);
  t=0;
}

function draw(){
  //il secondo valore è l'opacità
  background (0, 5);
  
  var x = mouseX * noise(t);
  var y = mouseY * noise(t+5);
  var r = 255 * noise(t+6);
  var g = 255 * noise(t+7);
  var b = 255 * noise(t+8);
  
  noStroke();
  fill(r, g, b);
  ellipse(x, y, 120, 120);
  
  t = t + 0.003;
}
