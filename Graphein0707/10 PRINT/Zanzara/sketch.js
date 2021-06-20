// -
// 10 PRINT funny 0.1 by Gaia Andruccioli [10 PRINT, pattern, funny]
// 2021 © Gaia Andruccioli, Daniele @Fupete, Irene @iretrtr and the course DS-2021 at DESIGN.unirsm,
// github.com/ds-2021-unirsm — github.com/fupete - github.com/Graphein0707
// Educational purposes, MIT License, 2021, San Marino
// —

let x = 0;
let y = 0;
let spacing = 30;

function preload(){
  space = loadImage("spazio.png");
  zanzi = loadImage("zanzara.png");
  back = loadImage('back.png');
  occhi = loadImage('occhi.png');
  chiusi = loadImage('chiusi.png');
}

function setup() {
  createCanvas(600, 600);
  background(back);
  frameRate(5);
}

function draw() {
  if (random (2) < 0.5){
 image(zanzi,x,y+150,spacing,spacing);
 image(occhi,270,62,64,25);
  }else{
 image(space,x,y,spacing,spacing);
 image(chiusi,270,62,64,25);
}

x = x + spacing;
if (x > width){
  x = width - x;
  y = y + spacing;
}
  
if (y > height){
  x = x + spacing;
  y = height - y;
}
}
