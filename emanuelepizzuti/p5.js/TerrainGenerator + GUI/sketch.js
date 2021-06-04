//  ____ ____
// | ___|  _ |
// | ___|  __|
// |____|_|
// ___________
//
// terrainGenerator + GUI by emanuelepizzuti [terrain, GUI]
// 2021 © emanuelepizzuti, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// 2019 © Luigi @MrJ4ckpot & Daniele @Fupete for https://github.com/dsii-2019-unirsm + github.com/fupete
// original license: Educational purposes, MIT License, 2019, Crespina IT
// 
// Daniel Shiffman @shiffman for https://www.youtube.com/watch?v=IKB1hWWedMk
//
// ___________

// OGGETTO PARAMETRI
let parametri = {

  coloreSfondo: 0, // Slider: inserire valore all'avvio dello sketch 
  spessTraccia: 4,
  coloreTraccia: [0, 255, 206],

  // densità e altezza
  altezza: 100,
  scale: 20,

  // weird: function() { // Pulsante chiama funzione: scrivere la funzione che si intende richiamare
  // weirdStroke = random(10);
  // weirdColor = [random(255), random(255), random(255)];
  // console.log("print!!!!!!!! " + weirdStroke + " " + weirdColor);
  // }

};

// FUNZIONE GUI
window.onload = function() {

  var gui = new dat.GUI();
  gui.add(parametri, 'coloreSfondo', 0, 255); // Slider: inserire valore inferiore e maggiore
  gui.add(parametri, 'spessTraccia', 1, 10); // EVENTO: Viene chiamata una funzione al variare del parametro
  gui.addColor(parametri, 'coloreTraccia'); // color picker

  var f1 = gui.addFolder('changeTerrain'); // Crea una tendina che nasconde i prossimi parametri
  f1.add(parametri, 'altezza', 100, 500);
  f1.add(parametri, 'scale', 10, 20);

  /////////////////////////////////////////////////////
  /// TO DO: COME CAMBIARE LA TIPOLOGIA DI 'SHAPE'? ///
  /////////////////////////////////////////////////////

  // var f2 = gui.addFolder('changeType');
  // f2.add(parametri, 'type', [POINTS, TRIANGLE_STRIP, TRIANGLE_FAN]); // Tendina: inserire array di valori

  /////////////////////////////////////////////////////
  /// TO DO: WEIRD ////////////////////////////////////
  /////////////////////////////////////////////////////

  //gui.add(parametri, 'weird'); // Pulsante chiama funzione: non aggiungere nulla
}

// orbitControl();

let cols, rows;
let scale = 20;
let w = 800;
let h = 800;

let terrain = [];
let flying = 0;

let altezza = 100;

// let weirdStroke = 0;
// let weirdColor = [0, 0, 0];

// let tipologia = parametri.type;


function setup() {
  createCanvas(800, 800, WEBGL);
}

function draw() {
  scale = parametri.scale;

  cols = w / scale;
  rows = h / scale;

  background(parametri.coloreSfondo);
  noFill();
  // fill(parametri.coloreSfondo);

  altezza = parametri.altezza;

  flying -= 0.01; // per noise per altezza delle creste
  let yoff = -flying;
  for (let y = 0; y < rows; y++) {
    terrain[y] = [];
    let xoff = flying;
    for (let x = 0; x < cols; x++) {
      terrain[y][x] = map(noise(xoff, yoff), 0, 1, -altezza, altezza);
      xoff += 0.05; // variazione altezza delle creste
    }
    yoff += 0.05;
  }

  // centro la composizione
  translate(-w / 2, -h / 4);
  rotateX(PI / 3);

  for (y = 0; y < rows; y++) {
    beginShape(POINTS);
    for (let x = 0; x < cols; x++) {

      // strokeWeight(weirdStroke);
      // stroke(weirdColor);
      // strokeWeight(0.1);
      // stroke(255);

      // il terzo valore definisce l'altezza di ogni punto
      vertex(x * scale, y * scale, terrain[x][y]);
      vertex(x * scale, (y + 1) * scale, terrain[x][y + 1]);

      strokeWeight(parametri.spessTraccia);
      stroke(parametri.coloreTraccia);
    }
    endShape();
  }
}
