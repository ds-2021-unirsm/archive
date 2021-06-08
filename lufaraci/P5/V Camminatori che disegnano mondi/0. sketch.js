// —
// V - Camminatori che creano mondi .2 by lufaraci [keyCode, color,keyboard, snake]
// 2021 © Lucrezia Faraci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/lufaraci
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// Daniel Schiftman
// https://www.youtube.com/watch?v=nMUMZ5YRxHI&t=673s
// — 

var x;
var y;

var r;
var g;
var b;
var n = 3;
let img1;
let start = true;
let c;


function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  x = width/2;
  y = height/2;

  print("1. Disegna muovendo le frecce della tastiera.");
  print("2. Blocca con la barra spaziatrice.");

  img1= createImage(width, height);

  img1.loadPixels();
  for (let i = 0; i < img1.width; i++) {
  for (let j = 0; j < img1.height; j++) {
    img1.set(i, j, color(255, 255, 255));
  }
}

img1.updatePixels();
image(img1, width, height);
}

function mouseClicked() {
  start = false;
}

function draw() {
    
   c =img1.get(x,y);
  //console.log(i);
   r = map(x, 0, width, 0, 255);
   g = map(y, 0, height, 0, 255);
   b = 220;
    console.log("c = "+c);
  
  if (keyCode === 37) {
    x = x-n;
  } 
  if (keyCode === 38) {
    y = y-n;
  }
  if (keyCode === 39) {
    x = x+n;
  }
  if (keyCode === 40) {
    y = y+n;
  }
  if (keyCode === 32) {
   y = y;
   x = x;
  }
  
  d =img1.get(x,y);
  console.log("d = "+d);
  if (d !== c){
  noStroke();
  fill(r,g,b);
  ellipse(x,y,20,20);
  }
  else{
    fill(255);
    rect(0,0,400,400);
  }

}

