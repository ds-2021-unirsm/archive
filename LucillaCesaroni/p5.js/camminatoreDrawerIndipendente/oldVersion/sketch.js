//         ___       ________     
//        |\  \     |\   ____\    
//        \ \  \    \ \  \___|    
//         \ \  \    \ \  \       
//          \ \  \____\ \  \____  
//           \ \_______\ \_______\
//            \|_______|\|_______|
                                  
// -
//
// Camminatore indipendente che disegna 0.1 by Lucilla Cesaroni [click, draw]
// 2021 Lucilla @LucillaCesaroni, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm - github.com/fupete - github.com/LucillaCesaroni 
// Educational purposes, MIT License, 2021, San Marino
//
// —
//
// Credits/Thanks to: 
// @Koło Imago for https://openprocessing.org/sketch/94545
//
// —
//
// Help:
// [mouse] add drawer
//
// —

var w, h;
var d = 20; // diametro ellisse
var quanti = 1; // numero pallini
var c = []; // array vuoto che contiene gli oggetti che sono i camminatori
var speedMax = 0.4; // velocità movimento

var d2 = 1; // diametro ellisse piccolo

function setup() {
  createCanvas(w = windowWidth, h = windowHeight);
}

//Al click del mouse aggiungo dei camminatori che avranno velocità indipendente
function mousePressed() {
  quanti += 1;
}

function draw() {

  // crea n oggetti di classe Camminatore
  for (var i = 0; i < quanti; i++) {
    c.push(new Camminatore(i));
  }

  for (var i = 0; i < quanti; i++) {
    c[i].move();
    c[i].display();
  }

  // cancello i camminatori 
  if (quanti == 11) {
    quanti = 1;
    c = [];
  }
}

function Camminatore(_id) {

  this.id = _id;

  console.log(_id);

  this.x = random(w); // x inizio
  this.y = random(h); // y inizio

  this.xcontenitore = [];
  this.ycontenitore = [];
  this.conta = 0;
  this.speed = random(0, speedMax);

  this.noiseX = random(1000);
  this.noiseY = random(2000);

  // metodo move
  this.move = function() {
    var a = this.x = w * noise(this.noiseX);
    var b = this.y = h * noise(this.noiseY);

    this.noiseX += 0.01 * this.speed;
    this.noiseY += 0.02 * this.speed;

    // mi serve per creare un array con tutte le vecchie posizioni
    this.xcontenitore.push(a);
    this.ycontenitore.push(b);
    this.conta += 1; // quanto è lungo questo array?

    // la lunghezza del conta è max 250 
    if (this.conta == 250) {
      this.conta = 0;
      this.xcontenitore = [];
      this.ycontenitore = [];
    }
  }

  background(255);

  // metodo display
  this.display = function() {
    stroke(0);
    fill(255);

    ellipse(this.x, this.y, d);

    for (var i = 0; i < this.conta; i++) {
      ellipse(this.xcontenitore[i], this.ycontenitore[i], d2); // disegna ogni volta tutte le ellissi
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
