// -
// Isole di walkers 0.1 by Alessia Valgimigli [walkers, random]
// 2021 © Alessia Valgimigli, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —

let g;
let isola_a = [];
let grandezza_isola_a = 5;
let isola_d = [];
let grandezza_isola_d = 5;

function setup() {
  createCanvas(400, 400);
    for (let a=0; a<grandezza_isola_a; a++){
    isola_a.push(new Isola_a(a));
  }  
  
  for (let d=0; d<grandezza_isola_d; d++) {
    isola_d.push(new Isola_d(d));
  }
  
  //direzione verso cui si muove
  g = new goccia(width/2, height/2);

}

function draw() {
  background(0);
  g.seek(createVector(width, height));
  g.update();
  g.fdisplay();

  for (let b=0; b<isola_a.length; b++){
    isola_a[b].move(); 
    isola_a[b].show();       
  }
  
  for (let e=0; e<isola_a.length; e++){
    isola_d[e].move(); 
    isola_d[e].show();       
  } 
}
