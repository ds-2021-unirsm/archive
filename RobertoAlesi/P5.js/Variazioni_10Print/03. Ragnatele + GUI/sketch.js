//  ______  ____  ___  _______  __________ ______ ____ ______________
//  __/ _ \/ __ \/ _ )/ __/ _ \/_  __/ __ \ _/ _ |_/ /__/ __/ __/  _/
//  _/ , _/ /_/ / _  / _// , _/ / / / /_/ / / __ |/ /__/ _/_\ \_/ /
//  /_/|_|\____/____/___/_/|_| /_/  \____/ /_/ |_/____/___/___/___/
//
// -
// Ragnatele+GUI 0.1 by Roberto [generatore, ragnatele, gui, 10print]
// 2021 © Roberto @ciunart, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm — github.com/fupete — github.com/RobertoAlesi
// Educational purposes, MIT License, 2021, San Marino
// —

//colori rgb
var colsfr = 0;
var colsfg = 0;
var colsfb = 0;

//rotazione sull'asse y
var ry;

//tipo di rotazione selezionato sulla gui
var parametri = {
  rotazione: "---01---",
};

var w, h;
var x = 0;
var y = 0;
var z = 0;
var size = 20;

var sferaCubo;
var rot;
var t = 0;

//impostazioni della GUI
function setupGui() {}
window.onload = function () {
  var gui = new dat.GUI();

  //sono state aggiunte delle varianti di rotazione per generare ragnatele differenti
  gui.add(parametri, "rotazione", [
    "---01---",
    "---02---",
    "---03---",
    "---04---",
    "---05---",
    "---06---",
  ]);
};

function setup() {
  createCanvas((w = 1000), (h = 800), WEBGL);
  background(0);
  setupGui();
}

function draw() {
  lights();

  //viene selezionato il tipo di rotazione scelto nella GUI
  if (parametri.rotazione == "---01---") {ry = PI * 2;} 
  else if (parametri.rotazione == "---02---") {ry = PI / 3;} 
  else if (parametri.rotazione == "---03---") {ry = PI / 4;} 
  else if (parametri.rotazione == "---04---") {ry = PI / 5;} 
  else if (parametri.rotazione == "---05---") {ry = (PI * 7) / 4;} 
  else if (parametri.rotazione == "---06---") {ry = (PI * 7) / 5;}

  //rotazione di ogni singola linea
  rotateX(-PI / 2);
  rotateY(map(frameCount, 0, 60, 0, ry));

  //in base al valore restituito dal random viene disegnata una sfera, se il valore è minore di 0.5, o un cubo, se il valore è maggiore di 0.5
  push();
  noStroke();
  translate(0, -h / 2, -h / 2 - 20);
  
  //rotazione di ogni singolo modulo
  rotateY((7 / 4) * PI);
  sferaCubo = random(1);
  if (sferaCubo < 0.5) {
    colsfr += random(-5, 5);
    colsfb += random(-5, 5);
    push();
    ambientMaterial(200 + colsfr, 255 - colsfr / 2, 200 - colsfb);
    translate(x, y, 0);
    sphere(5);
    pop();
  } else if (sferaCubo > 0.5) {
    push();
    fill(150 + colsfr, 0 + colsfb / 2, 230 - colsfb);
    translate(x, y, 0);
    rotateX(t++);
    rotateY(t++);
    box(20, 20, 20);
    pop();
  }
  pop();

  x += size;

  //quando la linea raggiunge una lunghezza pari alla metà della schermata
  //viene creata una nuova linea
  if (x > w / 2) {
    x = 0;
    y += size;
    z += size;
  }
}
