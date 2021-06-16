// —
// 10Print - variazione 1 by lufaraci [10print, random, color]
// 2021 © Lucrezia Faraci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/lufaraci
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// Daniel Shifftman
// Github: https://github.com/CodingTrain
// —
let x = 0;
let y = 0;
let mod = 50;
let stokecol = 255;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  
  stroke(255);

  push();
  translate(x,y);
  noStroke();
  fill(255,5);
  rect(0,0,width,height);
  strokeWeight(5);
  stroke(255);
  //applicare una funzione di probabilità
  if(random(1)<0.5){
  line(0,0,mod,mod);
  }else{
  line(0,mod,mod,0);
  }
  pop();

  x = x + mod;
  
  if(x>width){
  x = 0;
  y = y + mod;
  }
  if(y>height){
  background(random(255),random(255),random(255));
  
    x = 0;
    y = 0;
  }

}