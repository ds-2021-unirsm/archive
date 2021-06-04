//  ____ ____
// | ___|  _ |
// | ___|  __|
// |____|_|
// ___________
//
// STAR by emanuelepizzuti [patterns, mouse position]
// 2021 © emanuelepizzuti, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// Generative Gestaltung – Creative Coding im Web (twitter.com/nome) for http://www.generative-gestaltung.de
// original license: Apache License, Version 2.0 (the "License")
// —
//
// Help:
// [mouse] change mouse position to change the direction of triangles' growth
// ___________

let distancePoint;
let shapeAngle = 0;
let w, h;
let t, s;

function setup() {
  createCanvas(w = windowWidth, h = windowHeight);
  noStroke();
  distancePoint = dist(120, 120, width, height);
  // colorMode(HSB);
}

function draw() {
  blendMode(BLEND);
  background(25);
  blendMode(ADD);
  
  t=0;
  s=0;

  for (var posX = w / 2 - 400; posX < w / 2 + 400; posX += 60) {
    for (var posY = h / 2 - 400; posY < h / 2 + 400; posY += 60) {
      
      fill(noise(t, s)*posX/2, noise(t, s)*50, noise(t, s)*posY/2);

      // calculate angle between mouse position and actual position of the shape
      var angle = atan2(mouseY - posY, mouseX - posX) + (shapeAngle * (PI / 180));
      let size = dist(mouseX, mouseY, posX, posY);
      size = size / distancePoint * 40;

      push();
      translate(posX, posY);
      rotate(angle);
      
      triangle(-10, -15, -10, 15, frameCount % 360, 0)
      pop();
      
      t+=0.5
      s+=0.5
    }
  }
}
