//  ______  ____  ___  _______  __________ ______ ____ ______________
//  __/ _ \/ __ \/ _ )/ __/ _ \/_  __/ __ \ _/ _ |_/ /__/ __/ __/  _/
//  _/ , _/ /_/ / _  / _// , _/ / / / /_/ / / __ |/ /__/ _/_\ \_/ /
//  /_/|_|\____/____/___/_/|_| /_/  \____/ /_/ |_/____/___/___/___/
//
// -
// Obj_test 0.1 by Roberto [obj, c4d, test, import]
// 2021 © Roberto @ciunart, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/RobertoAlesi
// Educational purposes, MIT License, 2021, San Marino
// —

var sculpture;
var r = 0;
var c = 0;
var cnv;

function preload() {
  sculpture = loadModel('/models/ra.obj', true);
}

function setup() {
  createCanvas(w = windowWidth, h = windowHeight, WEBGL);
  }

function draw() {
  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  directionalLight(0+mouseX/2, 127-mouseY/3, 150-mouseX/2, -dirX * 3, dirY * 3, 2);

  lights(50);
  background(143, 0, 255);
  orbitControl();
  rotateY(-r);
  rotateX(PI);

  fill(c*2, 150+c, 255-c);
  push()
  rotateY(-2*r);
  stroke(c*2+10, 150+c+10, 255-c+10)
  sphere(800);
  pop()
  noStroke();
  push()
  scale(2)
  specularMaterial(121, 0, 150);
  model(sculpture);
  pop()

  r += 0.01;
}

function mousePressed() {
  c = random(0,155);
}
