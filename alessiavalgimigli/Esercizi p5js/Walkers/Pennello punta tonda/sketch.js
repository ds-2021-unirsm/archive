 // -
// Pennello punta tonda 0.1 by Alessia Valgimigli [walkers, noise]
// 2021 © Alessia Valgimigli, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// — 

var t;
 var t2;
 var camminatori = [];
 var totaleCamminatori = 10

 function setup() {
   background (0);
   createCanvas(400, 400);
   colorMode(HSB, 360, 100, 100);
   t = 0;
   t2 = 1000;
   for (var i = 0; i < totaleCamminatori; i++) {
     camminatori.push(new Camminatore());
   }
 }

 function draw() {
   for (var i = 0; i < totaleCamminatori; i++) {
     camminatori[i].move();
     camminatori[i].display();
   }
 }

 function Camminatore() {

   this.move = function() {
     this.x = map(noise(t), 0, 1, 0, width);
     this.y = map(noise(t2), 0, 1, 0, width);
     this.h=360*noise(t);
     this.s=100*noise(t);
     this.b=100*noise(t+5);
     //diametro
     this.d=50*noise(t+10);

     //incremento la variabile
     t += 0.001;
     t2 += 0.001;
   }

   this.display = function() {
     fill(this.h, this.s, this.b);
     noStroke();
     ellipse(this.x, this.y, this.d);
   }
 }
