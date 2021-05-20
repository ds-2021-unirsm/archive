//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//

// 10Print variazione 2
// Andrea Castellucci

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
