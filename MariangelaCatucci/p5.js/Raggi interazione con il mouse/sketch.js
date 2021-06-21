// Raggio e interazione mouse 0.1 by Mariangela Catucci [mouse, colors]
// 2021 © Mariangela @MariangelaC, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
//
// Help:
// [mouse movement] variazione numero di raggi, spessore e colore
//
// —

function setup() {
  createCanvas(w=windowWidth, h=windowHeight);
  t = 0;
}


function draw() {
  //background(255);
  translate(width/2, height/2);
  
  var circleResolution = map(mouseY, 0, height, 2, 80);
  var radius = mouseX - width/2 + 0.5;
  var angle = TWO_PI/circleResolution;
  var r = 255 * noise(t+10);
  var g = 255 * noise(t);
  var b = 255 * noise(t+20);
  
  strokeWeight(mouseY/50);
  stroke(r, g, b);
  
  beginShape();
  for (var i = 0; i <= circleResolution; i++){
    var x = cos(angle * i) * radius;
    var y = sin(angle * i) * radius;
    line(0, 0, x, y);
    //vertex(x,y);
  }
  endShape(CLOSE);
  t= t + 0.03;
  
  if (frameCount % 500 == 0){
    background(255);
  }
}
