//         ___       ________     
//        |\  \     |\   ____\    
//        \ \  \    \ \  \___|    
//         \ \  \    \ \  \       
//          \ \  \____\ \  \____  
//           \ \_______\ \_______\
//            \|_______|\|_______|
                                  
// -
//
// Camminatore nebulosa by Lucilla Cesaroni 
// 2021 Lucilla @LucillaCesaroni, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm - github.com/fupete - github.com/LucillaCesaroni 
// Educational purposes, MIT License, 2021, San Marino
//
// —

var w, h;
var d = 2; // diametro ellisse
var quanti = 1000 // numero pallini
var c = []; // array vuoto che contiene gli oggetti che sono i camminatori
var speedMax = 0.1; // velocità movimento

function setup() {
  createCanvas(w = windowWidth, h = windowHeight);
  noStroke(); // senza outline

  // crea n oggetti di classe Camminatore
  for (var i = 0; i < quanti; i++) {
    c.push(new Camminatore(i)); // pusho elementi "i" di classe Camminatore dentro l'array "c"
  }
}

function draw() {
  background(0, 10); // nero con opacità 40

  // per tutti i camminatori chiama i diversi metodi utili (metodo = funzione)
  for (var i = 0; i < quanti; i++) {
    c[i].move(); // esegue .move (= metodo) all'elemento "i" dell'array "c"
    c[i].display(); // esegue .display all'elemento "i" dell'array "c" 
  }
}

// Classe:
// La classe è un insieme di metodi (funzioni) e di variabili, 
// è un insieme di "caratteristiche" che si applicano all'oggetto
// CLASSE = camminatore 

// c = Array di oggetti di tipo camminatore

function Camminatore(_id) { // _id = variabile locale che definisce la singola particella
  background(0); // do sfondo nero altrimenti all'inizio vedi sfumatura dal bianco

  // costruttore = inizializza delle variabili, riferite all'elemento i che si trova in quel momento dentro camminatore
  this.id = _id; // con this mi riferisco solo a quella particella lì: ad esempio all'inizio sulla prima pallina

  this.x = random(w); // x inizio
  this.y = random(h); // y inizio

  this.speed = random(0, speedMax); // velocità = num casuale (da 0 a speedMax) 

  this.noiseX = random(1000); // attribuisco un noise ad ogni pallina 
  //non mettere un valore troppo basso altrimenti troppo raggruppati
  this.noiseY = random(2000); // valore diverso altrimenti vanno in diagonale

  // metodo move
  this.move = function() {
    this.x = w * noise(this.noiseX); // piu speed è alto piu la particella si muove per spazi piu ampi
    this.y = h * noise(this.noiseY);

    this.noiseX += 0.01 * this.speed;
    this.noiseY += 0.02 * this.speed;
  }

  // metodo display
  this.display = function() {
    fill(map(this.x, 0, w, 0, 255), map(this.y, 0, h, 0, 255), map(this.speed, 0, speedMax, 0, 255));
    ellipse(this.x, this.y, d);
  }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
