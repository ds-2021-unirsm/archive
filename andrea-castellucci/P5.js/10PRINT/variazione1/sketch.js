//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// 10-print-geometric-landscapes by Andrea [landscapes, horizon]
// 2021 © Andrea @AndrCastellucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/andrea-castellucci
// Educational purposes, MIT License, 2021, San Marino
// —

let x = 0;
let y = 0;
let modulo = 50;
var y1 = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  translate(x,y);
  stroke(255);
  strokeWeight(2);
  fill(255, 255, 255, 50);
  
  beginShape();
  
  // definizione primo vertice della Shape
  noStroke();
  var rndm = random(1);
  if( rndm < 0.5){
    vertex(0,modulo);
  } else{
    vertex(0,0);
  }
  
  // generazione vertici della Shape
  // disegno punti che formano la curva bianca
  for(var i=0; i<=modulo; i++){
    noStroke();
    vertex(i,map(noise(y1), 0,1, 0,modulo));
    stroke(255);
    point(i,map(noise(y1), 0,1, 0,modulo));
    y1+=0.005;
  }
  
  // definizione ultimo vertice della Shape
  noStroke();
  if( rndm < 0.5){
    vertex(modulo,modulo);
  } else{
    vertex(modulo,0);
  }
  endShape();
  
  if(x<width){
    x+=modulo;
  } else{
    x=0;
    y+=modulo;
  }
  
  //y1+=0.5;
}
