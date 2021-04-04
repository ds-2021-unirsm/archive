// random walker OOP

var w, h;
var d = 300;
var quanti = 10; //creo la var quanti perchè se la prossima volta voglio solo 2 sfere non dovrò cambiarlo in tutti i for ma solo dentro quanti 
var c = [];
var speedMax = 8;
var t; // t è un valore che si incrementa e serve per far cambiare sempre valore al noise della y, sennò il noise darà sempre lo stesso valore e il pallino si muoverà in maniera rettilinea
var t_increment; //misura l'incremento che farà variare t, e questo incremento si basa su mouseX 

function setup() {
  createCanvas(w = windowWidth, h = windowHeight);
  textSize(50);
  t = 0;
  t_increment = 0;
  // il for crea n oggetti di classe Camminatore 
  for (var i = 0; i < quanti; i++) {
    c.push(new Camminatore(i)); //dentro c pusho 10 elementi di tipo Camminatore 

  }

}


function draw() {
  background(230, 230, 250);
  t_increment = map(mouseX, 0, width, 0, 0.2); //lo mappo perchè altrimenti la variazione delle palline è troppo veloce
  t += t_increment;
  for (var i = 0; i < quanti; i++) {
    c[i].move();
    c[i].display();

  }

}


// classe
function Camminatore(_id) {
  // costruttore
  this.id = _id;
  this.x = 0;
  this.y = 0;
  this.speed = random(1, speedMax);

  // metodo move
  this.move = function() {
    this.y = noise(this.speed + t * 0.1) * width; //si muovono nella larghezza del foglio in maniera casuale e organica
    this.x = this.speed * t;

  }

  // metodo display
  this.display = function() {
    //colorMode(HSB, 360, 100, 100);
    var h = 360 * noise(t) -100 ; 
    var s = 100; //saturazione
    var b = 200 ;
    fill(h, s, b)
    star(this.x, this.y, 80, 100, 40);
    fill(0);
    //text(this.id, this.x, this.y);
  }

  function star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2 * noise(0.01 * frameCount + 500);
      let sy = y + sin(a) * radius2 * noise(0.01 * frameCount + 500);
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

}