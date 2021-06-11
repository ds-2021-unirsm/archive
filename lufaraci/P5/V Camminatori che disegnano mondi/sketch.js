// —
// V - Camminatori che creano mondi .1 by lufaraci [walker, color,dist]
// 2021 © Lucrezia Faraci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/lufaraci
// Educational purposes, MIT License, 2021, San Marino
// —
//
// —

var t;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  t = 0;
}

function draw() {
  // fade the background by giving it a low opacity
  //background(0, 5);

  var x = width * noise(t);
  var y = height * noise(t+5);
  var r = 255 * noise(t+10);
  var g = 255 * noise(t+15);
  var b = 255 * noise(t+20);
  
  scale(0.5);
  translate(width, height);
  for (var i=0; i < 8; i++){
    push();
    rotate(TWO_PI * i / 8);
    translate(120,0);
  noStroke();
    
  fill(r, g, b);
  ellipse(x, y, 100, 100);
  
  fill(255);
  ellipse(x, y, 70, 70);
    
  for (var j = 0; j < 5; j++){
   push();
      rotate(TWO_PI * j/5 );
  noStroke();
    
  fill(r, g, b);
  ellipse(x, y, 20, 20);
  
  fill(255);
  ellipse(x, y, 7, 7);
      pop();
    }
  pop(); 
  }

  t = t + 0.005;
}
function keyPressed() {
  saveCanvas('Poster', 'jpg');
}