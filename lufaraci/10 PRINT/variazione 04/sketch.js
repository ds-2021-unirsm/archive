// —
// 10Print - variazione 4 blackout poetry by lufaraci [10print, random, color]
// 2021 © Lucrezia Faraci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/lufaraci
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// Daniel Shifftman
// Github: https://github.com/CodingTrain
// https://www.youtube.com/watch?v=bEyTZ5ZZxZs&ab_channel=TheCodingTrain
// —
let img1;
let img2;
let img3;
let img4;
let img5;
let img6;

let c;
let n;
let img = [];

let x = 0;
let y = 0;
let mod = 15;

function preload(){
  img1 = loadImage('poetry/poetry.jpg');
  img2 = loadImage('poetry/poetry1.jpg');
  img3 = loadImage('poetry/poetry2.jpg');
  img4 = loadImage('poetry/poetry3.jpg');
  img5 = loadImage('poetry/poetry4.jpg');
  img6 = loadImage('poetry/poetry5.jpg');

  img = [img1,img1,img2,img3,img4,img5,img6];
  }

function setup() {
  createCanvas(windowWidth, windowHeight);
  n = int(random(3));
  image(img[n],0,0,img1.width,img1.height);
  
}

function draw() {
  //background(220);

  noStroke();
  c = img[n].get(x, y);
  fill(c);
  rect(img[n].width, 0, 100, 100); // cosa vede la macchina
  stroke(255);
  
  push();
  translate(x,y);
  noStroke();
  fill(0,225);
  
  
  noStroke();
  //applicare una funzione di probabilità
  if(random(1)<0.5){
  if(c[0] < 100){  
    rect(0,0,mod,mod);
    
  }
  }else{
  if(c[0] < 100){
    rect(0,0,mod,mod);
  }
  }
  pop();

  x = x + mod;
  
  if(x>img[n].width){
  x = 0;
  y = y + mod;
  }
  if(y>img[n].height){
  x = 0;
  y = 0;
  n = int(random(3));
  image(img[n],0,0,img1.width,img1.height);
  c = img[n].get(x, y);
  fill(c);
  rect(img[n].width, 0, 100, 100);

  }

}