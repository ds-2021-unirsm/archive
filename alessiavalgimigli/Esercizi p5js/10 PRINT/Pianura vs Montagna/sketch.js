// -
// 10Print_Map 0.1 by Alessia Valgimigli [10Print, gui]
// 2021 © Alessia Valgimigli, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to:
// @emanuelepizzuti (github.com/emanuelepizzuti) for https://github.com/emanuelepizzuti/archive/tree/main/emanuelepizzuti/p5.js/variazioni_10print/unaForesta_10print
// —
// @MrJ4ckpot & @Fupete (github.com/fupete) for // https://editor.p5js.org/fupete/sketches/WUY1jA4jn for original code
// —

let x = 600;
let y = 50;
let altitudine = 100;
let w = 1000;
let h = 1000;
let t = 0;
let tIncr = 25;

//parametri interfaccia
let parametri = {
  variazioneAltitudine: false
};

window.onload = function() {
  var gui = new dat.GUI();
  gui.add(parametri, 'variazioneAltitudine');
}

function setup() {
  createCanvas(w, h, WEBGL);
  pixelDensity(displayDensity());
  background(240);
  angleMode(DEGREES);
}

function draw() {
  lights();

  if (parametri.variazioneAltitudine == true) {
    altitudine = 100 * noise(t);
  }
  
  //inclinazione del piano
  rotateX(60);
  noStroke();
  if (random(1) > 0.5) {
    translate(x - w, y - h, altitudine);
    fill(0, 255, 0, random(60,90));
    sphere(noise(t) * 30);
  } else {
    translate(x - w, y - h, altitudine);
    fill(random(200), random(200), random(200));
    box(noise(t) * 30, noise(t) * 50, noise(t) * 20);
  }

  x += 30;
  t += tIncr;

  //se esce dalla larghezza della pagina rinizia una nuova linea
  if (x > width) {
    x = 600;
    y += 20;
  }

  //se esce dalla lunghezza della pagina azzera e ricomincia dall'inizio
  if (y > height) {
    background(240);
    x = 600;
    y = 50;
  }
}
