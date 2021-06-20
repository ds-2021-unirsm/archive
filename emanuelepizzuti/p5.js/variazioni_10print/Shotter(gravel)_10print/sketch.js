//  ____ ____
// | ___|  _ |
// | ___|  __|
// |____|_|
// ___________
//
// Schotter(Gravel)3D by emanuelepizzuti [10print, WEBGL]
// 2021 © emanuelepizzuti, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// -
//
// Simple GUI interface
// Daniele @Fupete & Luigi @MrJ4ckpot
// https://editor.p5js.org/fupete/sketches/WUY1jA4jn for original code
//
// -
//
// Help:
// [ENTER] reset sketch
// ___________

let value;

let t = 0;

let w;
let h;

let x = 0;
let y = 0;
let z = 0;

let incr = 50;

let i = 0;
let j = 0;

let semaforo = true;

//----------

let parametri = {
  lato: 45, // slider
  coloreCubo: [240, 240, 240], // color picker
};

window.onload = function () {
  var gui = new dat.GUI();
  gui.addColor(parametri, "coloreCubo");
  gui.add(parametri, "lato", 10, 60);
};

//------------

function setup() {
  createCanvas((w = windowWidth), (h = windowHeight), WEBGL);
  angleMode(DEGREES);
  background(240);

  sfondo = createDiv();
  sfondo.position(windowWidth / 2 - 200, windowHeight - 105);
  sfondo.size(400, 60);
  sfondo.style("background-color", "#000000");

  testo = createP("Inspired by: Schotter (Gravel), Georg Nees, 1968");
  testo.style("color", "#ffffff");
  testo.position(windowWidth / 2 - 176, windowHeight - 100);

  testo = createP("Press 'ENTER' to reset the sketch");
  testo.style("color", "#cdcdcd");
  testo.position(windowWidth / 2 - 120, windowHeight - 50);
}

function draw() {
  //lights();
  //orbitControl();
  rotateX(75);
  rotateZ(30);

  // COLOR //////////////////////////////////////
  var r = 55 * noise(0.004 * x, 0.004 * y + 10);
  var g = 235 * noise(0.004 * x, 0.004 * y + 15);
  var b = 255 * noise(0.004 * x, 0.004 * y + 20);

  translate(x - 200, y - 200, z - 200);
  stroke(r, g, b);
  strokeWeight(2);
  fill(parametri.coloreCubo);

  if (semaforo == true) {
    if (random(1) < 0.2) {
      push();
      translate(j * noise(i + 5), j * noise(i + 5), j * noise(i + 5));
      rotateX(j * noise(i + 5));
      rotateY(j * noise(i + 10));
      rotateZ(j * noise(i + 15));
      box(parametri.lato);
      pop();
    } else if (random(1) < 0.4) {
      push();
      translate(-j * noise(i + 20), j * noise(i + 25), -j * noise(i + 30));
      rotateX(-j * noise(i + 20));
      rotateY(j * noise(i + 25));
      rotateZ(-j * noise(i + 30));
      box(parametri.lato);
      pop();
    } else if (random(1) < 0.9) {
      push();
      translate(j * noise(i + 35), j * noise(i + 40), j * noise(i + 45));
      rotateX(j * noise(i + 35));
      rotateY(-j * noise(i + 40));
      rotateZ(j * noise(i + 45));
      box(parametri.lato);
      pop();
    } else {
      push();
      translate(-j * noise(i + 50), -j * noise(i + 55), -j * noise(i + 60));
      rotateX(-j * noise(i + 50));
      rotateY(-j * noise(i + 55));
      rotateZ(-j * noise(i + 60));
      box(parametri.lato);
      pop();
    }

    x = x + incr;
    t += 0.001;

    if (x > 400) {
      x = 0;
      y = y + incr;
    }

    if (y > 400) {
      x = 0;
      y = 0;
      z += 50;
    }

    if (z > 100) {
      i += 0.01;
      j += 0.1;
    }

    if (z > 450) {
      semaforo = false;
    }
  }
  console.log(x + " " + y + " " + z);
}

function keyPressed() {
  if (keyCode === ENTER) {
    background(240);
    t = 0;
    x = 0;
    y = 0;
    z = 0;
    i = 0;
    j = 0;
  }
}
