// -
// Nomefile 0.1 by Nomestudente [keyword1, keyword2]
// 2021 © Nomestudente, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// @nome (twitter.com/nome) for https://www.indirizzolinkvarioogithub.pippo/gino/mino
// original license: Tipo licenza
// 
// @nome2 (github.com/nome2) for https://www.altro indirizzolinkvarioogithub.pippo/gino/mino
// original license: Tipo licenza
// —
//
// Help:
// [key] action
// [key] action
// [mouse] action
//
// —

let w = 16;
let h = 16;
let index = 0;
let actRandomSeed = 0;
let t = 0;
let spazio;

let rnd = 2;

// SETUP
function setup() {
  createCanvas(640, 384);
  
  background(100, 250, 255);
  frameRate(250);
  strokeWeight(2);
  
}

// DRAW
function draw() {
  
  strokeWeight(mouseX / 40); //MOUSEX
   randomSeed(actRandomSeed);
  
  let x1 = w*index;
  let x2 = x1 + w;
  let y1 = h*23;
  let y2 = h*24;
  
  if (random(2) < 1) {
    line (x2, y1, x1, y2);
  } else {
    line (x1, y1, x2, y2);
  }
  
  index++;
  if (index == width/w) {
    p = get(0, h, width, h*23); 
    background(100, 250, 255);
    set(0, 0, p);
    index=0;
  }
  
// PREMI MOUSE
function mousePressed() {             
  stroke(0); 
  
// LINE VERSE 
function keyReleased() {
  if (key == '1') {
   rnd = 5; 
  }
  if (key == '2') {
   rnd = 1;
  }  
}
  
}
}