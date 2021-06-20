// -
// Camminatori_Indipendeti 0.1 by Lucrezia Nediani [Camminatori, Indipendeti]
// 2021 © Lucrezia Nediani, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/Lucrezia604 — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —


let Palline = []; // < array di linee
let n = 20; // < numero linee iniziali
let xoff1 = 30;
let xoff2 = 100;

function preload() {
//
}

function setup() {
  createCanvas(windowWidth, windowHeight, P2D); // WEBGL-->3D  P2D--> 2D
  background(30);

  // gruppo iniziale di Linee
  for (let i=0; i<n; i++) {
    Palline.push(new Astronave(i));
  }
}

function draw() {
  background(30);

  //orbitControl(); // < attiva controllo orbita 3d col mouse...

  push(); // < equivalente di pushMatrix in Processing
  translate(0,0); //0);
  
  // mostra gruppo di Linee
  for (var i=0; i<Palline.length; i++) {
    Palline[i].spostati();
    Palline[i].mostrati();
    
    }
  pop();
}

// aggiungi camminatori se premi il mouse
function mousePressed() {
  Palline.push(new Astronave(Palline.length));
}

// togli ultimo camminatore se premi un tasto
function keyPressed() {
  Palline.pop();
}

// definizione della classe Linea
function Astronave(_id) {

  // dati e costruttore
  this.id = _id;
  let x = width/2 + random (-width/5,width/5);
  let y = height/2 + random (-height/5,height/5);
  
  

  // funzionalità

  this.mostrati = function() {
    strokeWeight(15);
    stroke(random(55), random(1000), 100);
    noFill();
    rect(this.x,this.y, 70, 100);
  }

  this.spostati = function() {
    let vel = random(0, 0.0003);
    
    this.x =  map(noise(x + xoff1), 0, 1, 0, width);
    this.y =  map(noise(y + xoff2), 0, 1, 0, height);
  
    xoff1 += vel;
    xoff2 += vel;
  }
}

//da inserire sempre utilizzando windoWidth
// se ridimensiona la finestra ricalcola width e height canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
