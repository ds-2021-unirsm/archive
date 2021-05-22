//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// Camminatori-indipendenti by Andrea [camminatori, indipendenza, scia]
// 2021 © Andrea @AndrCastellucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/andrea-castellucci
// Educational purposes, MIT License, 2021, San Marino
// —

var numeroCamminatori = 60;
var c = []; // archivio camminatori
var t = 0;
var r; // red
var g; // green
var b; // blue

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  for (let i = 0; i < numeroCamminatori; i++) {
    c.push(new Camminatore());
  }
}

function draw() {
  background(0, 30);
  for (var i = 0; i < numeroCamminatori; i++) {
    c[i].move();
    c[i].display();
  }
}

// classe Camminatore
function Camminatore() {
  this.x = 0;
  this.y = 0;
  this.t = random(100);
  this.stroke = random(3, 5);

  // metodo move
  this.move = function() {
    this.x = noise(this.t) * width;
    this.y = noise(this.t + 10) * height;
    this.t += 0.001; // incremento per noise
  }

  // metodo display
  this.display = function() {
    stroke(r, g, b);
    strokeWeight(this.stroke);
    point(this.x, this.y);

    r = 255 * noise(this.t);
    g = 255 * noise(this.t + 5);
    b = 255 * noise(this.t + 10);
  }
}
