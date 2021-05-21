//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// Camminatori-mondi by Andrea [world, color, motion]
// 2021 © Andrea @AndrCastellucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm — github.com/fupete — github.com/andrea-castellucci
// Educational purposes, MIT License, 2021, San Marino
// —
//
// Help:
// [mouse.click] change sphape ellipse/rect
//
// —

var numeroCamminatori = 15;
var c = []; // archivio camminatori
var t = 0;
var r; // red
var g; // green
var b; // blue

var boolean;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noFill();
  rectMode(CENTER);

  boolean = true;

  for (let i = 0; i < numeroCamminatori; i++) {
    c.push(new Camminatore());
  }
}

function draw() {
  for (var i = 0; i < numeroCamminatori; i++) {
    c[i].move();
    c[i].display();
  }
}

// classe Camminatore
function Camminatore() {
  this.x = 0;
  this.y = 0;
  this.x2 = 0;
  this.y2 = 0;
  this.t = random(100);
  this.opacity = random(5, 40);

  // metodo move
  this.move = function () {
    this.x = random(5, 15) + noise(this.t + 40) * width;
    this.y = random(0, 10) + noise(this.t + 5) * height;
    this.t += 0.0019; // incremento per noise
  };

  // metodo display
  this.display = function () {
    if (boolean == true) {
      stroke(r, g, b, 70);
      strokeWeight(2);
      ellipse(this.x, this.y, this.t);
      r = 255 * noise(this.t + 5);
      g = 255 * noise(this.t + 20);
      b = 255 * noise(this.t + 10);
    } else if (boolean == false) {
      stroke(r, g, b, 70);
      rect(this.x, this.y, this.t);
      r = 255 * noise(this.t + 5);
      g = 255 * noise(this.t + 20);
      b = 255 * noise(this.t + 10);
    }
  };
}

function mousePressed() {
  if (boolean == true) {
    boolean = false;
    background(0, 30);
  } else {
    boolean = true;
    background(0, 30);
  }
}
