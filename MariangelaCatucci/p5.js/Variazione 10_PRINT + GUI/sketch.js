// Variazione 10print + GUI 0.1 by Mariangela Catucci [10print, color, GUI, shapes]
// 2021 © Mariangela @MariangelaCatucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —


//Parametri necessari per la creazione della GUI
let parametri = {
  
  dimEllipse: 50,
  dimTriangle: 30,
  dimLine: 20,
  
  rotazioneLine: 45,
  
  stroke: 0.5,
  
  trasparenzaEllipse: 20,
  
  azzera: function() {
    background(0);
    x = 0;
    y = 0;
  } 
}

let salvataggio = {
    
  salvaImg: function(){
    saveCanvas('10print');
  }
}
  
// FUNZIONE GUI

window.onload = function() {

  var gui = new dat.GUI();

  //EVENTO: varia la dimensione del cerchio
  var evento1 = gui.add(parametri, 'dimEllipse', 30, 100); 

  //EVENTO: varia la dimensione del triangolo  
  var evento1 = gui.add(parametri, 'dimTriangle', 20, 50);

  //EVENTO: varia la dimensione della linea
  var evento1 = gui.add(parametri, 'dimLine', 10, 30);

  //EVENTO: varia la rotazione della linea  
  var evento1 = gui.add(parametri, 'rotazioneLine', 0, 360);

  //EVENTO: varia lo stroke di tutte le forme
  var evento1 = gui.add(parametri, 'stroke', 0, 3);

  //EVENTO: varia la trasparenza del cechio
  var evento1 = gui.add(parametri, 'trasparenzaEllipse', 0, 100); 

  //Aggiunge una gui per pulire lo sketch e farlo ripartire
  gui.add(parametri, 'azzera');

  //Aggiunge una gui per salvare l'immagine creata 
  gui.add(salvataggio, 'salvaImg');  
  
}

let x = 0;
let y = 0;
let space = 30;
let stroke_val = 1;
let maxDist = 0;
let print = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noFill();
  maxDist = dist(0, 0, width / 2, height / 2);
  t = 0;
  strokeCap(ROUND);
}

function draw() {
    disegna_forme();
    t = t + 0.03;
}

//funzione che disegna in maniera casuale trangoli, cerchi e linee
function disegna_forme() {
  let r = 255 * noise(t + 10);
  let g = 255 * noise(t);
  let b = 255 * noise(t + 20);

  let d = dist(x, y, width / 2, height / 2);
  let stroke_val = map(d, 0, maxDist, 0.5, space / 3);

  strokeWeight(parametri.stroke);

  stroke(r, g, b);
  translate(x, y);
  frameRate(40);
  
  if (random(1) > 0.5){
    if (random(1) > 0.8) {
      //noFill();
      if (random(1) > 0.2) {
        triangle(space/2, parametri.dimTriangle/2, space, space*2, parametri.dimTriangle, space);
      } else {
        triangle(space, space/2, parametri.dimTriangle, space, space/2, parametri.dimTriangle/2);
      }
    } else {
      fill(r, g, b, parametri.trasparenzaEllipse);
      noStroke();
      ellipse(0, 0, parametri.dimEllipse);
    }
  } else {
    if (random(1) < 0.5) {
      rotate(parametri.rotazioneLine)
      line(0, parametri.dimLine, parametri.dimLine, 0);
    } else {
      line(parametri.dimLine, 0, 0, parametri.dimLine);
    }
  }

  x += space;
  if (x > windowWidth) {
    x = 0;
    y += space;
    if (y > windowHeight) {
      y += space/2;
    }
  }
}
