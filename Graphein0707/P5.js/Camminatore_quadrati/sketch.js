// -
// Camminatore quadrati noise 0.2 by GaiaAndruccioli [Camminatore, noise, quadrai]
// 2021 © GaiaAndruccioli, Daniele @Fupete, Irene @iretrtr and the course DS-2021 at DESIGN.unirsm,
// github.com/ds-2021-unirsm — github.com/fupete - github.com/Graphein0707
// Educational purposes, MIT License, 2021, San Marino
// —

let w, h;
let l = 10;
let quadrati = 200;
let camminatori = [];
let speedMax = 4;


function setup() {
  createCanvas(w=windowWidth, h=windowHeight);
  noStroke();
  //textSize(18);
  
  // crea n oggetti di classe Camminatore
  for (var i=0; i<quadrati; i++){
  	camminatori.push(new Camminatore(i)); 
  }
}


function draw() {
 background(0);
 
 // per tutti i camminatori chiama i diversi metodi utili 
 for (var i=0; i<quadrati; i++){
	camminatori[i].move();
	camminatori[i].display();
 }
}


// classe Camminatore
function Camminatore(_id) {

  // costruttore
  this.id = _id;
  this.x = 0;
  this.y = 0;
  this.t = random(15); //ogni quadrato 15 quadrati
  this.speed = random(0.03); //speed > numero di pixel che salta in modo casuale
  
  
  // metodo move
  this.move = function() {
    this.x= noise (this.t + 1) * w;
    this.y= noise (this.t) * h;
    this.t += this.speed; //somma velocità e quadrati
  }
  
  // metodo display
  this.display = function() {
    fill(random(255), random(200), 255, 80); 
    rect(this.x, this.y, l);
    //fill(0);
	//text(this.id, this.x, this.y);
  }

}
