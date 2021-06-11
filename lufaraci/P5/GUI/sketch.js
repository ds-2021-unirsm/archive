// —
// tshirt GUI [GUI, %]
// 2021 © Lucrezia Faraci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/lufaraci
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// 2019 © Luigi @MrJ4ckpot & Daniele @Fupete
// https://editor.p5js.org/fupete/sketches/WUY1jA4jn for original code
// —

// OGGETTO PARAMETRI
// Inserire i parametri che si vogliono modificare, e i loro valori iniziali
let parametri = {
  MAGLIETTACOLORE: [198, 160, 255],
  cotone: 24,
  lana: 24,
  canapa: 24,
  poliestere: 24,
  print: false,
  size: 10,
  salva: function () {
    saveCanvas("myTshirt", "png");
  },
};

window.onload = function () {
  var gui = new dat.GUI(); //Crea la GUI
  var evento1 = gui.addColor(parametri, "MAGLIETTACOLORE");
  var f1 = gui.addFolder("MATERIALI");
  f1.add(parametri, "cotone", 0, 100);
  f1.add(parametri, "lana", 0, 100);
  f1.add(parametri, "canapa", 0, 100);
  f1.add(parametri, "poliestere", 0, 100);
  gui.add(parametri, "print");
  gui.add(parametri, "size", 10, 100);
  gui.add(parametri, "salva");
  
  parametri.cotone = 24;
  parametri.lana = 24;
  parametri.poliestere = 24;
  parametri.microfibra = 24;
};

let vel = 25;
let img;
let img1;
let img2;
let evento1;
let inf;

function preload() {
  img = loadImage("img/tshirt1.png");
  img1 = loadImage("img/luna.png");
  img2 = loadImage("img/git.png");
}

function setup() {
  let c = createCanvas((w = 850), w);
  imageMode(CENTER);
}

let somma;
  if (parametri.cotone) {
  somma =
    parametri.cotone +
    parametri.lana +
    parametri.poliestere +
    parametri.microfibra;
  } else { somma = 0}

  if (parametri.lana) {
  somma =
    parametri.cotone +
    parametri.lana +
    parametri.poliestere +
    parametri.microfibra;
  } else { somma = 0}

if (parametri.poliestere) {
  somma =
    parametri.cotone +
    parametri.lana +
    parametri.poliestere +
    parametri.microfibra;
  } else { somma = 0}

if (parametri.microfibra) {
  somma =
    parametri.cotone +
    parametri.lana +
    parametri.poliestere +
    parametri.microfibra;
  } else { somma = 0}

function draw() {
  print("Frame: " + frameCount);
  print("Velocità: " + vel);

  let somma =
    parametri.cotone +
    parametri.lana +
    parametri.poliestere +
    parametri.microfibra;

  if (frameCount % vel == 0) {
    background(parametri.MAGLIETTACOLORE);

    //rect(100,100,w-200); margini maglietta

    if (somma <= 100) {
      for (var i = 0; i < parametri.cotone; i++) {
        //fill(random(255), random(255), random(255));
        noStroke();
        fill(0);
        fill(120, 255, 183);
        let x = random(100, w - 100);
        let y = random(100, w - 100);
        x1 = random(100, w - 100);
        y1 = random(100, w - 100);
        circle(x, y, parametri.size);
        circle(x1, y1, parametri.size);
        //inf = "il cotone ci mette dai 6 mesi a 1 anno per decomporsi";
      }

      for (var l = 0; l < parametri.lana; l++) {
        noStroke();
        fill(243, 254, 150);
        x = random(100, w - 100);
        y = random(100, w - 100);
        x1 = random(100, w - 100);
        y1 = random(100, w - 100);
        circle(x, y, parametri.size);
        circle(x1, y1, parametri.size);
        //inf = "anche la lana ci mette dai 6 mesi a 1 anno per decomporsi";
      }

      for (var m = 0; m < parametri.poliestere; m++) {
        noStroke();
        fill(78, 0, 33);
        x = random(100, w - 100);
        y = random(100, w - 100);
        x1 = random(100, w - 100);
        y1 = random(100, w - 100);
        circle(x, y, parametri.size);
        circle(x1, y1, parametri.size);
        //inf = "il poliestere ci mette dai 20 a 200 anni per decomporsi";
      }

      for (var n = 0; n < parametri.canapa; n++) {
        noStroke();
        fill(254, 198, 150);
        x = random(100, w - 100);
        y = random(100, w - 100);
        x1 = random(100, w - 100);
        y1 = random(100, w - 100);
        circle(x, y, parametri.size);
        circle(x1, y1, parametri.size);
        //inf = "la canapa è addirittura più sostenibile del cotone";
      }
    } else {
      alert("Controlla meglio la percentuale dei materiali");
      parametri.cotone = 24;
      parametri.lana = 24;
      parametri.poliestere = 24;
      parametri.microfibra = 24;
    }
    image(img, w / 2, w / 2);

    fill(136, 62, 215);
    textAlign(CENTER);
    textSize(20);
    text("usa le GUI per visualizzare", 0, 20, w);
    text("le % dei materiali della tua maglietta", 0, 45, w);
    //text(inf, 0, 810, w);
    textAlign(RIGHT);
    image(img2, w - 115, w - 32);
    fill("black");
    text("lufaraci", 0, w - 40, w - 20);

    if (parametri.print) {
      image(img1, w / 2, w / 2 - 100);
    }
  }
}
//RIDIMENSIONA.(mettere l'SVG IN POS ABS?)
