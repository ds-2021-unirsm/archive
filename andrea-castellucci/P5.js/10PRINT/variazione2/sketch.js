//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// 10-print-3d-sphere by Andrea [sphere, 3d, planets]
// 2021 © Andrea @AndrCastellucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/andrea-castellucci
// Educational purposes, MIT License, 2021, San Marino
// —
//
// Help:
// [mouse] muovi il cursore per orientare il punto luce sulle sfere
//
// —

var quanti = 30;
var modulo;
var x;
var y;

function setup() {
  createCanvas((w = windowWidth), (h = windowHeight), WEBGL);
  background(10);
  
  modulo = w / quanti;
  x = modulo;
  y = modulo;
}

function draw() {
  //orbitControl();
  translate(-w / 2, -h / 2);
  noStroke();

  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;

  ambientLight(100);
  pointLight(0, 100, 255, locX, locY, 10);
  specularMaterial(85);
  shininess(0);

  push();
  translate(x - modulo / 2, y - modulo / 2, 0);
  sphere(random(modulo/1.5));
  pop();

  if (x < w-0.5) {
    x += modulo;
  } else if (y > h-0.5) {
    noLoop();
  } else {
    x = 0;
    y += modulo;
  }
}
