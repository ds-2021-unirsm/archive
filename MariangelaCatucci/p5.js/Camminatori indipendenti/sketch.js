// Generatore di pattern 0.1 by Mariangela Catucci [pattern, color, click, square, circle]
// 2021 © Mariangela @MariangelaCatucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
//
// —
//
// Credits/Thanks to: 
// @LouisHoebregts (twitter.com/mamboleoo) for https://www.generativehut.com
// original license: MIT License 2020
//
// —
//
// Help:
// [mouseClicked] rigenerazione colore e direzione camminatori
//
// —

let walkers = [];

function setup () {
  createCanvas(windowWidth, windowHeight);
  let x = width / 2;
  let y = height / 2;
  for (let i = 0; i < 30; i++) {
    walkers.push(new Walker(x, y));
  }
}

function draw () {
  walkers.forEach(walker => {
      walker.velocity();
      walker.move();
      walker.draw();
  });
}

function mouseClicked () {
  clear();
  walkers = [];
  for (let i = 0; i < 30; i++) {
    stroke(random(0,255), random(0,255), random(0,255), 100);
    walkers.push(new Walker(mouseX, mouseY));
  }
}

class Walker {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
    this.velocityX = random(-10, 10);
    this.velocityY = random(-5, 5);
    this.draw();
  }
  
  velocity () {
    this.velocityX += map(noise(this.x * 0.03, this.y * 0.03), 0, 1, -1, 1);
    this.velocityY += map(noise(this.y * 0.05, this.x * 0.05), 0, 1, -5, 5);
  }
  
  move () {  
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
  
  draw () {
    line(this.x, this.y, this.px, this.py);
    this.px = this.x;
    this.py = this.y;
  }
}

